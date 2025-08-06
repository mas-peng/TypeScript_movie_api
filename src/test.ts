import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';

/**
 * @param event API Gatewayから渡されるイベントオブジェクト
 * @returns API Gatewayが解釈できる形式のレスポンス
 */
export const handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  
  const fixedData = {
    message: 'Hello from Lambda!',
    status: 'ok',
  };

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(fixedData),
  };
};