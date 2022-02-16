import {getRepoNamesFromOrg} from '../api/github';
import {handler} from '../app';

jest.mock('../api/github', () => ({
  getRepoNamesFromOrg: jest.fn()
}));

const createMockEvent = (queryStringParameters: {[key: string]: string} | null) => ({
  queryStringParameters
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TestHandler = (event: {queryStringParameters: null | {[key: string]: string}}) => any;

describe('app handler', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('returns 400 if org parameter missing', async () => {
    const event = createMockEvent(null);
    const response = await (handler as TestHandler)(event);

    expect(response).toEqual({
      body: JSON.stringify({message: 'org querystring parameter missing or invalid'}),
      statusCode: 400
    });
  });

  it('returns 500 if fetch throws', async () => {
    (getRepoNamesFromOrg as jest.Mock).mockRejectedValue(new Error('error'));

    const event = createMockEvent({org: 'test'});
    const response = await (handler as TestHandler)(event);

    expect(response).toEqual({
      body: JSON.stringify({message: 'Error fetching repos by org'}),
      statusCode: 500
    });
  });

  it('returns string array if successful', async () => {
    (getRepoNamesFromOrg as jest.Mock).mockResolvedValue(['repo1', 'repo2', 'repo3']);

    const event = createMockEvent({org: 'test'});
    const response = await (handler as TestHandler)(event);

    expect(response).toEqual({
      body: JSON.stringify({repos: ['repo1', 'repo2', 'repo3'], version: 1}),
      statusCode: 200
    });
  });
});
