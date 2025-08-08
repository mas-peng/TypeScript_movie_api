import { APIGatewayProxyEvent,APIGatewayProxyEventV2, APIGatewayProxyResult, APIGatewayProxyEventPathParameters } from 'aws-lambda';
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda"; 

const lambdaClient = new LambdaClient();
export const handler = async (event: APIGatewayProxyEventV2) => {
  const response = {
    statusCode: 200,
    body: {
      code: 0,
      message: "This is called from common lambda!"
    },
  };
  return response;
}
