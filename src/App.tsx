import React, { useEffect, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useGithubCommits } from "./hooks/useGithubCommits";

function App() {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const { data } = useGithubCommits({
    repoName: "Crossroads",
    repoOwnerUsername: "hicksbrian",
    githubPersonalToken: process.env.REACT_APP_GITHUB_PERSONAL_TOKEN!,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", (event) => {
        function getScrollPercent() {
          var h = document.documentElement,
            b = document.body,
            st = "scrollTop",
            sh = "scrollHeight";

          return Math.floor(
            //@ts-ignore
            ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100
          );
        }

        const percent = getScrollPercent();
        if (progressBarRef.current) {
          progressBarRef.current.style.height = `${percent}%`;
        }
      });
    }
  }, []);

  return (
    <div className="flex min-h-screen gap-4 p-16">
      <img
        src="/background.jpg"
        className="w-screen h-screen object-cover fixed top-0 left-0 -z-10"
      />
      <div className="fixed top-0 left-0 flex h-screen rounded-r-xl justify-center w-[10%] bg-white py-16">
        <div className="h-full w-3 rounded-full border-2 border-black">
          <div
            ref={progressBarRef}
            className="w-full transition-all bg-black"
          ></div>
        </div>
      </div>
      <div className="text-white w-full flex flex-col gap-16 ml-[10%]">
        {data?.length &&
          data.map((commit) => (
            <>
              <div
                key={commit.sha}
                className="flex flex-col gap-4 text-2xl w-full font-semibold"
              >
                <div className="flex gap-2 items-center">
                  <p>{new Date(commit.commit.committer.date).toDateString()}</p>
                  *<p>{commit.commit.committer.name}</p>*<p>{commit.sha}</p>
                </div>
                <p>{commit.commit.message}</p>
              </div>
              <div className="border-b border-b-white w-full"></div>
            </>
          ))}
      </div>
    </div>
  );
}

export default App;
