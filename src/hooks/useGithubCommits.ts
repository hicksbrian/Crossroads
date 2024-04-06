import { useEffect, useState } from "react";
import { GithubCommit } from "../types/GithubCommitsResponse";

type useGithubCommitsProps = {
  repoName: string;
  repoOwnerUsername: string;
  githubPersonalToken: string;
};

export const useGithubCommits = ({
  repoName,
  repoOwnerUsername,
  githubPersonalToken,
}: useGithubCommitsProps) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<GithubCommit[]>();
  const [error, setError] = useState();

  useEffect(() => {
    async function FetchCommits() {
      const res = await fetch(
        `https://api.github.com/repos/${repoOwnerUsername}/${repoName}/commits`,
        {
          headers: {
            Accept: "application/vnd.github+json",
            Authorization: `${githubPersonalToken}`,
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      );

      const data = await res.json();

      setData(data);
    }

    if (!data) {
      FetchCommits();
    }
  }, []);

  console.log("data", { data });
  return { loading, data, error };
};
