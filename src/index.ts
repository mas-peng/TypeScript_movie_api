import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, GetCommandInput } from '@aws-sdk/lib-dynamodb';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

const dynamodbClient = new DynamoDBClient({
    region: 'ap-northeast-1',
});

// ここで、↑で初期化したDynamoDBClientを用いてDynamoDBDocumentClientを初期化
const docClient = DynamoDBDocumentClient.from(dynamodbClient);
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const command = new GetCommand({
        TableName: "Api_Sample_Tbl",
        Key: {
            id: 1,
        },
      });
const response = await docClient.send(command);
const item = response.Item
  console.log(response);
  return  {
    statusCode: 200,
    body: JSON.stringify(item),
};

};
    // API Gatewayのリクエストからidを取得