(() => {
  const toggle = document.querySelector('.share-toggle');
  const panel = document.getElementById('sharePanel');
  if (!toggle || !panel) return;

  const closeButton = panel.querySelector('.share-close');
  const status = panel.querySelector('.share-status');
  const saveButton = panel.querySelector('[data-action="save"]');
  const saveHelp = document.getElementById('saveHelp');
  const lang = document.documentElement.lang === 'ja' ? 'ja' : 'en';

  const shareData = {
    title: panel.dataset.shareTitle || 'LUMINA-30',
    text: (panel.dataset.shareText || '').replace(/\\n/g, '\n'),
    url: panel.dataset.shareUrl || location.href
  };
  const shareBody = [shareData.text, shareData.url].filter(Boolean).join('\n\n');

  const messages = {
    ja: {
      copied: '紹介文とURLをコピーしました。',
      copiedUrl: 'URLをコピーしました。',
      fallback: 'この端末では共有画面を開けなかったため、紹介文とURLをコピーしました。',
      copyFailed: 'コピーできませんでした。ブラウザの共有／メニューからURLをコピーしてください。'
    },
    en: {
      copied: 'Introduction and URL copied.',
      copiedUrl: 'URL copied.',
      fallback: 'The share sheet was unavailable, so the introduction and URL were copied instead.',
      copyFailed: 'Copy was unavailable. Please copy the URL from your browser share/menu controls.'
    }
  }[lang];

  function setStatus(message) {
    if (!status) return;
    status.textContent = message || '';
  }

  function setOpen(open) {
    panel.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    setStatus('');
    if (!open && saveHelp && saveButton) {
      saveHelp.hidden = true;
      saveButton.setAttribute('aria-expanded', 'false');
    }
  }

  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand('copy');
    area.remove();
    if (!ok) throw new Error('copy failed');
  }

  toggle.addEventListener('click', () => setOpen(panel.hidden));
  closeButton?.addEventListener('click', () => {
    setOpen(false);
    toggle.focus();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !panel.hidden) {
      setOpen(false);
      toggle.focus();
    }
  });

  panel.addEventListener('click', async (event) => {
    const button = event.target.closest('[data-action]');
    if (!button) return;
    const action = button.dataset.action;

    if (action === 'share') {
      try {
        if (navigator.share) {
          await navigator.share(shareData);
        } else {
          await copyText(shareBody);
          setStatus(messages.fallback);
        }
      } catch (error) {
        if (error && error.name === 'AbortError') return;
        try {
          await copyText(shareBody);
          setStatus(messages.fallback);
        } catch (_) {
          setStatus(messages.copyFailed);
        }
      }
      return;
    }

    if (action === 'x') {
      const url = 'https://x.com/intent/post?text=' + encodeURIComponent(shareBody);
      window.open(url, '_blank', 'noopener,noreferrer');
      return;
    }

    if (action === 'email') {
      location.href = 'mailto:?subject=' + encodeURIComponent(shareData.title) + '&body=' + encodeURIComponent(shareBody);
      return;
    }

    if (action === 'copy') {
      try {
        await copyText(shareBody);
        setStatus(messages.copied);
      } catch (_) {
        setStatus(messages.copyFailed);
      }
      return;
    }

    if (action === 'copy-url') {
      try {
        await copyText(shareData.url);
        setStatus(messages.copiedUrl);
      } catch (_) {
        setStatus(messages.copyFailed);
      }
      return;
    }

    if (action === 'save' && saveHelp && saveButton) {
      const willOpen = saveHelp.hidden;
      saveHelp.hidden = !willOpen;
      saveButton.setAttribute('aria-expanded', String(willOpen));
      if (willOpen) saveHelp.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  });
})();
