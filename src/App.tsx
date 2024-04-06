import React, { useRef } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useGithubCommits } from "./hooks/useGithubCommits";

function App() {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const { data, error, loading } = useGithubCommits({
    repoName: "Crossroads",
    repoOwnerUsername: "hicksbrian",
    githubPersonalToken: process.env.REACT_APP_GITHUB_PERSONAL_TOKEN!,
  });

  return (
    <div className="flex min-h-screen gap-4 p-16">
      <img
        src="/background.jpg"
        className="w-screen h-screen object-cover fixed top-0 left-0 -z-10"
      />
      <div className="fixed top-0 left-0 flex h-screen rounded-r-xl justify-center w-[10%] bg-white py-16">
        <div className="h-full w-6 rounded-full border-4 border-black">
          <div ref={progressBarRef} className="w-full bg-black"></div>
        </div>
      </div>
      <div className="text-white flex flex-col gap-16 ml-[10%]">
        {data?.length &&
          data.map((commit) => (
            <div
              key={commit.sha}
              className="flex flex-col gap-4 text-2xl font-semibold"
            >
              <div className="flex gap-2 items-center">
                <p>{new Date(commit.commit.committer.date).toDateString()}</p>*
                <p>{commit.commit.committer.name}</p>*<p>{commit.sha}</p>
              </div>
              <p>{commit.commit.message}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
