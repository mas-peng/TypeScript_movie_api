# Docker環境構築手順

### コンテナ起動

```docker compose up -d```

### コンテナの中に入る

```docker compose exec node-dev bash```

### npmパッケージインストール

```npm install```

### TypeScript動作確認

```npx ts-node ./src/test.ts //コンソールに"test"が表示されればOK```

### TypeScriptコンパイル動作確認
```npx tsc //distディレクトリにjavascriptファイルが配置されればOK```