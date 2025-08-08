import { APIGatewayProxyEvent,APIGatewayProxyEventV2, APIGatewayProxyResult, APIGatewayProxyEventPathParameters } from 'aws-lambda';
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda"; 

const lambdaClient = new LambdaClient();
export const handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResult> => {
    //【共通処理】開始ログ出力処理
    const path:string = event.rawPath.split('/')[1] ?? "";
    const pathParameters = event.pathParameters;
    let timestamp = new Date().toISOString();
    console.log(`${timestamp} movie API receive request. [path=${path}, param=${pathParameters}]`);


    //【個別処理】個別lambda呼び出し
    //リクエストパス(registerを想定)から該当lambda関数を呼び出す処理
    const input = {
        FunctionName: "register-lambda" //ここを呼び出しパスに応じたlambda関数名に変換すれば、呼び分けができる
    }
    console.log(path);
    const command = new InvokeCommand(input);
    const res = await lambdaClient.send(command);
    const resText = new TextDecoder().decode(res.Payload);

    //【共通処理】終了ログ出力処理 開始
    timestamp = new Date().toISOString();
    console.log(`${timestamp} movie API respond request. [path=${path}, param=${pathParameters}]`);

    return { statusCode: 200, body: JSON.parse(resText) };
}
