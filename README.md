# Kintone for Raycast

Kintone アプリを Raycast から素早く検索して開くための拡張機能です。

## 機能

### Search Apps

キャッシュされた Kintone アプリを検索します。

- アプリ名、説明、コード、アプリ ID で検索可能
- アプリをブラウザで開く
- アプリ URL をクリップボードにコピー
- アプリ ID をクリップボードにコピー

### Fetch Apps

Kintone サーバーから最新のアプリ一覧を取得し、ローカルにキャッシュします。

- 初回利用時および定期的に実行してください
- 100 件ずつページネーションで全アプリを取得

## セットアップ

### 1. Raycast に拡張機能をインストール

```bash
git clone https://github.com/yumazak/raycast-kintone.git
cd raycast-kintone
pnpm install && pnpm dev
```

### 2. 拡張機能の設定

Raycast の設定画面で以下を入力してください:

| 設定項目 | 説明                                         | 例                 |
| -------- | -------------------------------------------- | ------------------ |
| Subdomain | Kintone のサブドメイン（.cybozu.com を除く） | `your-company`     |
| Username | Kintone のユーザー名                         | `user@example.com` |
| Password | Kintone のパスワード                         | -                  |

### 3. 初回データ取得

1. Raycast を開く
2. 「Fetch Apps」コマンドを実行
3. アプリ一覧がローカルにキャッシュされます

## 使い方

1. Raycast を開く
2. 「Search Apps」または「Kintone」で検索
3. アプリを検索
4. Enter キーでアプリを開く

## 開発

```bash
pnpm install && pnpm dev
```

## ライセンス

MIT License - 詳細は [LICENSE](./LICENSE) を参照してください。
