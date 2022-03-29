import { LoaderFunction } from 'remix';

import APIService from '~/services/api-service';
import GithubService from '~/services/github-service';

export const loader: LoaderFunction = async () => {
  if (!process.env.GITHUB_TOKEN || !process.env.GITHUB_USERNAME) {
    return {
      success: false,
      error: 'GITHUB_TOKEN and GITHUB_USERNAME must be set',
      data: null,
    };
  }

  const github = new GithubService(
    new APIService(),
    process.env.GITHUB_USERNAME,
    process.env.GITHUB_TOKEN
  );

  const data = await github.get_prs();

  return {
    success: true,
    error: null,
    body: data,
  };
};
