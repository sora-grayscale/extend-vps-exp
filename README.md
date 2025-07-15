# Xserver VPS Auto Renewal

Xserver VPSの自動更新とGotify通知機能を提供するプロジェクトです。

## 機能

- **VPS自動更新**: Puppeteerを使用してXserver VPSの契約を自動更新
- **Gotify通知**: 処理結果をself-hosted Gotifyサーバーに通知
- **GitHub Actions**: スケジュール実行（7:00, 15:00, 23:00 毎日）
- **画面録画**: 処理過程をWebM形式で記録

## ファイル構成

- `main.mjs`: メインの自動化スクリプト（Puppeteer使用）
- `gotify.mjs`: Gotify通知モジュール
- `.github/workflows/main.yml`: GitHub Actionsワークフロー
- `_docs/`: 実装ログディレクトリ

## セットアップ

### 1. 依存関係のインストール
```bash
yarn add puppeteer
```

### 2. GitHub Secrets設定
リポジトリのSecretsに以下を設定：

- `EMAIL`: Xserverアカウントのメールアドレス
- `PASSWORD`: Xserverアカウントのパスワード
- `GOTIFY_URL`: Self-hosted GotifyサーバーのURL（例: https://gotify.example.com）
- `GOTIFY_TOKEN`: Gotifyアプリケーショントークン

### 3. ローカル実行（開発時）
```bash
# 環境変数を設定
export EMAIL="your-email@example.com"
export PASSWORD="your-password"
export GOTIFY_URL="https://gotify.example.com"
export GOTIFY_TOKEN="your-gotify-token"

# 実行
node main.mjs
```

## 通知内容

### 成功時
- タイトル: "VPS処理完了"
- メッセージ: "VPS処理が正常に完了しました"
- 優先度: 5（通常）

### エラー時
- タイトル: "VPS処理エラー"
- メッセージ: エラー詳細
- 優先度: 8（高）

## スケジュール実行

GitHub Actionsにより以下の時間に自動実行：
- 7:00 UTC
- 15:00 UTC
- 23:00 UTC

## マニュアル

詳細なセットアップガイド:
- 日本語: https://motoki-design.co.jp/wordpress/xserver-vps-auto-renew/
- English: https://motoki-design.co.jp/wordpress/xserver-vps-auto-renew/
- 中文: https://motoki-design.co.jp/wordpress/xserver-vps-auto-renew/