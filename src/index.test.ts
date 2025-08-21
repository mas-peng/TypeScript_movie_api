// テスト対象のLambda関数をインポート
import { handler } from './index.js';

// AWS SDKのモックライブラリをインポート
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';
import { mockClient } from 'aws-sdk-client-mock';
import 'aws-sdk-client-mock-vitest'; // Jest互換のマッチャーを有効化

const ddbMock = mockClient(DynamoDBDocumentClient);

// 各テストの前にモックをリセット
beforeEach(() => {
    ddbMock.reset();
});

// --- テストシナリオ ---

// 1. 正常系: 項目が正常に取得できる場合のテスト
describe("項目が取得できる場合", () => {
    test('IDが見つかった場合に項目データを返す', async () => {
        // 準備: モックの戻り値を設定
        const mockItem = { id: 1, name: 'test' };
        // mockでGetCommandが実行された場合に、返却される値をresolvesの引数に設定
        ddbMock.on(GetCommand).resolves({ Item: mockItem });

        // 実行: モックされたDynamoDBクライアントが使われる
        const result = await handler({
            queryStringParameters: { id: '1' },
        } as any);

        // 検証
        expect(result.statusCode).toBe(200);
        expect(result.body).toBe(JSON.stringify(mockItem));

    });
});

// 2. 異常系: 項目が取得できない場合のテスト
describe("項目が取得できない場合", () => {
    test('IDが見つからなかった場合に返す処理', async () => {
        // 準備: モックの戻り値を設定
        // 返却される値　resolvesには空を入れる
        ddbMock.on(GetCommand).resolves({});

        // 実行: モックされたDynamoDBクライアントが使われる
        const resultError = await handler({
            queryStringParameters: { id: '' },
        } as any);

        // 検証
        expect(resultError.statusCode).toBe(404);
        // 
        expect(JSON.parse(resultError.body)).toEqual({ "message": "Item not found" });

    });
});