<!-- L30_LANG_LOCK: EN_JP_PAIRED -->
# Procurement and Vendor-Risk Prompt ｜ 調達・ベンダーリスク確認プロンプト

> **HTML reading route ｜ HTML閲覧導線**  
> [Open English HTML](https://lumina-30.github.io/Lumi30-Index/procurement-vendor-risk.html) ｜ [日本語HTMLを開く](https://lumina-30.github.io/Lumi30-Index/procurement-vendor-risk-ja.html)

## Purpose ｜ 目的

This page is for procurement, vendor-risk, security, audit, and AI governance teams that need to ask a vendor or internal product owner a small number of boundary questions before approving an AI-mediated service, agent, workflow, or tool.

It does not replace legal, regulatory, security, privacy, or safety review. It adds a narrow LUMINA-30 boundary prompt: whether effective human refusal, suspension, review, and rollback remain possible before an AI-mediated process becomes irreversible.

このページは、AI媒介サービス、AIエージェント、ワークフロー、ツールを承認する前に、ベンダーまたは内部プロダクト責任者へ少数の境界質問を投げる必要がある、調達、ベンダーリスク、セキュリティ、監査、AIガバナンス担当者向けです。

これは、法務、規制、セキュリティ、プライバシー、安全レビューの代替ではありません。LUMINA-30の狭い境界プロンプト――AI媒介プロセスが不可逆化する前に、実効的人間拒否、保留、検証、ロールバックがなお可能か――を追加するものです。

## Minimum vendor prompt ｜ 最小ベンダー確認

Use this as a lightweight request to a vendor, product owner, or internal deployment team:

> Before this AI-mediated process changes credentials, executes tools, modifies production state, removes recovery options, or creates irreversible commitments, who can refuse, stop, suspend, review, or roll it back, and what evidence will show that this authority existed before irreversibility?

ベンダー、プロダクト責任者、または内部導入チームへの軽量な確認として、次を使います。

> このAI媒介プロセスが、認証情報を変更し、ツールを実行し、本番状態を変更し、復旧手段を失わせ、または不可逆な確定を作る前に、誰が拒否・停止・保留・検証・ロールバックできるのか。そして、その権限が不可逆化前に存在したことを示す証拠は何か。

## Four fields to request ｜ 確認すべき4項目

| Field | Ask for |
|---|---|
| Actor | Which human, vendor team, internal owner, AI assistant, automation layer, or privileged system API can initiate or execute the action? |
| Authority | Who has the authority to refuse, suspend, approve, or roll back the action before irreversibility? |
| Evidence | What logs, approvals, alerts, tickets, or audit records show that the authority existed and was usable in time? |
| Irreversibility window | When does the process become difficult or impossible to reverse, recover, or meaningfully review? |

| 項目 | 確認すること |
|---|---|
| Actor | どの人間、ベンダーチーム、内部責任者、AIアシスタント、自動化層、特権システムAPIが、その行為を開始または実行できるのか。 |
| Authority | 不可逆化前に、その行為を拒否、保留、承認、ロールバックできる権限を持つのは誰か。 |
| Evidence | その権限が時間内に存在し、実際に使えたことを示すログ、承認、アラート、チケット、監査記録は何か。 |
| Irreversibility window | いつそのプロセスは、撤回、復旧、または意味ある再審査が困難または不可能になるのか。 |

## When to use this prompt ｜ 使う場面

Use this prompt when reviewing AI systems or AI-mediated workflows that can affect:

- account recovery, credential changes, identity verification, or access restoration;
- tool execution, workflow automation, privileged API calls, or agentic actions;
- production state, customer records, financial actions, public communication, safety-critical operations, or recovery options;
- vendor-hosted services where the organization cannot directly inspect internal logs or intervention windows.

このプロンプトは、次に影響し得るAIシステムまたはAI媒介ワークフローの確認に使います。

- アカウント復旧、認証情報変更、本人確認、アクセス復旧。
- ツール実行、ワークフロー自動化、特権API呼び出し、エージェント的行為。
- 本番状態、顧客記録、金融行為、公開コミュニケーション、安全重要運用、復旧手段。
- 組織が内部ログや介入可能時間を直接確認できない、ベンダー提供サービス。

## Safe use ｜ 安全な使い方

A vendor or internal team may answer this prompt without claiming LUMINA-30 certification, approval, compliance, or safety guarantee. The safer description is:

> This review refers to LUMINA-30 to check whether effective human refusal and rollback authority remain available before irreversible escalation.

ベンダーまたは内部チームは、このプロンプトに回答しても、LUMINA-30認証、承認、準拠、安全保証を主張することにはなりません。安全な説明は次です。

> このレビューは、不可逆化前に実効的人間拒否とロールバック権限が残っているかを確認するために、LUMINA-30を参照しています。

## Next routes ｜ 次に開く導線

- [One-Question Pilot for AI Adoption Review](./one-question-pilot.md) ｜ [1問パイロットHTML](https://lumina-30.github.io/Lumi30-Index/one-question-pilot-ja.html)
- [AI Governance / Adoption Review](./adoption-review.md) ｜ [AI導入・AIガバナンス審査HTML](https://lumina-30.github.io/Lumi30-Index/adoption-review-ja.html)
- [Public-Source Review Template](https://github.com/lumina-30/lumina30-incident-review/blob/main/reference/Public_Source_Review_Template.md) ｜ [公開情報レビュー・テンプレートHTML](https://lumina-30.github.io/lumina30-incident-review/reference/Public_Source_Review_Template_ja.html)
- [Incident Review Floor](https://github.com/lumina-30/lumina30-incident-review/blob/main/README.md) ｜ [インシデントレビュー・フロア](https://lumina-30.github.io/lumina30-incident-review/index-ja.html)
