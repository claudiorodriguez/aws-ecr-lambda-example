import axios from 'axios';
import {getRepoNamesFromOrg} from '../github';

jest.mock('axios', () => ({
  get: jest.fn()
}));

describe('github api', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('maps names to array', async () => {
    (axios.get as jest.Mock).mockResolvedValue({data: [{name: 'repo1'}, {name: 'repo2'}]});

    const repos = await getRepoNamesFromOrg('testorg');

    expect(axios.get).toHaveBeenCalledWith('https://api.github.com/orgs/testorg/repos');
    expect(repos).toEqual(['repo1', 'repo2']);
  });
});
