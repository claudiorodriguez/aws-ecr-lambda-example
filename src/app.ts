import {APIGatewayProxyHandler} from 'aws-lambda';
import {getRepoNamesFromOrg} from './api/github';

interface ErrorResponse {
  message: string;
}

interface SuccessResponse {
  repos: string[];
  version: number;
}

const buildResponse = (body: ErrorResponse | SuccessResponse, statusCode: number) => ({
  body: JSON.stringify(body),
  statusCode
});

export const handler: APIGatewayProxyHandler = async (event) => {
  const {org} = event.queryStringParameters || {};

  if (!org || typeof org !== 'string') {
    return buildResponse(
      {
        message: 'org querystring parameter missing or invalid'
      },
      400
    );
  }

  try {
    const repos = await getRepoNamesFromOrg(org);

    return buildResponse({repos, version: 1}, 200);
  } catch (error) {
    return buildResponse({message: 'Error fetching repos by org'}, 500);
  }
};
