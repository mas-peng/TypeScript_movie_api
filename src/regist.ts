import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, PutCommandInput } from '@aws-sdk/lib-dynamodb';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

const dynamodbClient = new DynamoDBClient({
    region: 'ap-northeast-1',
});

const docClient = DynamoDBDocumentClient.from(dynamodbClient);
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    //
    //エラーメッセージ
    type Error = {
        code: string;
        message: string;
        namespace: string;
    }
    //警告メッセージ
    type Warn = {
        code: string;
        namespace: string;
    }

    //動画データ
    type Videometadata = {
        movie_id: string;
        movie_height: number;
        movie_width: number;
        status: string;
        upload_service: string;
        uploaded_at: string;
        uploaded_by: string;
        visibility: string;
        visibility_changed_at: string;
        visibility_changed_by: string;
        error: Error;
        warning: Warn
    }


    //定義したデータに値を入れる
    const data: Videometadata = {
        error: {
            code: "",
            message: "",
            namespace: ""
        },
        warning: {
            code: "",
            namespace: ""
        },
        movie_id: "000002",
        movie_height: 1080,
        movie_width: 1920,
        status: "PROCESSING",
        upload_service: "001",
        uploaded_at: new Date().toString(),
        uploaded_by: `client-${Date.now()}`,
        visibility: "",
        visibility_changed_at: new Date().toString(),
        visibility_changed_by: `client-${Date.now()}`,

    }

    //動画データ登録
    const command = new PutCommand({
        TableName: "movie_files",
        Item: data
    });

    await docClient.send(command);
    return { statusCode: 200, body: "success" };
    //jソンでinsertする値を設定
    //json形式で返す処理
}
