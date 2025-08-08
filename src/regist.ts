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

    //追加
    const queryStringParameters = event.queryStringParameters;
    const client_id = queryStringParameters?.client_id ?? '';


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
        movie_id: `movie-${Date.now()}`,
        movie_height: 1080,
        movie_width: 1920,
        status: "PROCESSING",
        upload_service: "001",
        uploaded_at: new Date().toString(),
        uploaded_by: client_id,
        visibility: "PRIVATE",
        visibility_changed_at: new Date().toString(),
        visibility_changed_by:  client_id,

    }


    //動画データ登録
    const command = new PutCommand({
        TableName: "movie_files",
        Item: data
    });

    //returnするresponseの値をセット
    const responseBody = {
        result_code: 0,

        data: [
            {
                movie_id: data.movie_id,
                movie_presigned_url: "https://s3-bucket-typescript-poc.s3.ap-northeast-1.amazonaws.com/sample_movie.mp4?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGUaDmFwLW5vcnRoZWFzdC0xIkgwRgIhAPnmVjL8R4HirMpnU8%2BDh4a0zIhEiGnS7A4D2Ow8Ru1nAiEA0xDwcd3jOy5REmuQwLsbT0TAnpRqYXByFiMdgLUAtIsq3wMInv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwyODc1ODQwNjAzMjYiDG571z64dDSriNNz0iqzA45jM9yzJrnBOy%2FM9I4HTqxKAO%2F3AT%2B2YEKTsPMlB8u4dqVfJ%2FjNjMp72geVg3Z%2FAH75IgOaZTjFAG6Pxw00JNaKO37rEttfW138%2BdZYkmmJwFN4Yh34LixqumbF1FndOAbXwWp%2BK%2BlzIw%2B4CAl8H7sPlupejySePEe%2BUkbgGI3zyz%2BUghF7j%2BFoRBhxSmqCbwln6EAJOqqcx%2Bbtkzwhss7JDQKoicIJ%2FPdq0IWY848EQN1JnH1fQmx2wCwjjaCCp65AAbQM%2Beg8gcn0Fe2xb%2Fh6lP4YfH74%2BE9hW0dJcQDX%2F3OHbzU7v9uWOwpbMRfoj7c4o8%2BRa8%2BcbYDU1jBwK5CBD616tGsskYs6%2Bw7i13XK69N4VllGaD9TkEN9BscWVvGcwNGz7Uz46i0d2M6mDbthTAleomFAAmPO%2BCfDtiJHQR25Iw%2B784LsYKd0VdZxOIuQ6%2F4ck2lOrS%2B07FvNKq%2Fx4mKENp6EApdj46erEZ0lgarr2nzyC90Z%2FTFfFyOnDG1yVTCGejN%2Bdd3eMJdbhgTwWodTc2%2FscOmm9iv9eN2RqbWCN0w8DhyHCnLqdvHxuoAfWTC6u9XEBjrdAkWAeuisybPJaFweTrabUvTFTv4t8DlrTxo1Lwb8BH%2FIPOetg78pErSBymnGev0vZ85z3u%2B0hzTfXnpiw%2FRkzR9QHVR4cBbkEtFdJg%2FzZ048q%2B9KTBPfIfFdxvwU1ILcUH8yhoeckLC4fZjmrypS0WNTsLtf5vRG%2BHxs%2B7SHoiDYITt%2B28j%2F0SPqt9INiosBlY%2BpNTVlX%2BzxvLGYVmHu%2BVgprDYmX3an1tCNXYyz3sHjFI0YjaNR40E%2B1LJVH32TeaBKqox2Xl3CCqsD2k02MWGmiDTI2RWIAPpUPujKuHVGMdVsxf653SHKPlamFo31bqEBM8L3aAayQcyiurh82O3hT%2F6yTn3fED421069n2dPxeJk3a2zN5EZZOpGJgcvVJdoNo7We1wz5CGsr0xUjR7JQ4gu5OxLy0uY2bOWT54WD4vbbHbdcGdLErjnVOixaOpCwuisiQRblIlNatE%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAUF5KYQOTFVTKLS34%2F20250808%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20250808T051933Z&X-Amz-Expires=43200&X-Amz-SignedHeaders=host&X-Amz-Signature=1b6a6764a3f13786a0df86098163dc1f061e7074fdf60b8920bc8679c63135ee"
            }
        ],
        error: data.error, 
        warning: data.warning,
    };



    await docClient.send(command);
    return {statusCode: 200, body:JSON.stringify(responseBody) };

}
