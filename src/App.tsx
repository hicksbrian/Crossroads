import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useGithubCommits } from "./hooks/useGithubCommits";

function App() {
  const { data, error, loading } = useGithubCommits({
    repoName: "Crossroads",
    repoOwnerUsername: "hicksbrian",
    githubPersonalToken: process.env.REACT_APP_GITHUB_PERSONAL_TOKEN!,
  });

  return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
}

export default App;
