import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

const dynamodbClient = new DynamoDBClient({
    region: 'ap-northeast-1',
});

// ここで、↑で初期化したDynamoDBClientを用いてDynamoDBDocumentClientを初期化
const docClient = DynamoDBDocumentClient.from(dynamodbClient);
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.queryStringParameters?.id;
    const command = new GetCommand({
        TableName: "Api_Sample_Tbl",
        Key: {
            id: id,
        },
      });
const response = await docClient.send(command);
const item = response.Item
if(!item){
      console.log(response);
  return  {
    statusCode: 404,
    body: JSON.stringify({ message: 'Item not found' }),

}
}
  console.log(response);
  return  {
    statusCode: 200,
    body: JSON.stringify(item),
};

};
    // API Gatewayのリクエストからidを取得