import axios from 'axios';

export interface GithubRepo {
  id: number;
  name: string;
}

export const getRepoNamesFromOrg = async (orgName: string) => {
  const apiUrl = `https://api.github.com/orgs/${orgName}/repos`;

  const {data} = await axios.get<GithubRepo[]>(apiUrl);

  return data.map(repo => repo.name);
};