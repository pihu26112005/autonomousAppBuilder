import { WebContainer } from "@webcontainer/api";
import React, { useEffect, useRef, useState } from "react";

interface PreviewProps {
  files: any[];
  webContainer: WebContainer;
}

import { FadeLoader } from "react-spinners";

export function Preview({ files, webContainer }: PreviewProps) {
  const [url, setUrl] = useState<string | null>(null);
  const hasStarted = useRef(false);


  useEffect(() => {
    let isMounted = true; // Track if the component is still mounted
    // if (hasStarted.current) return;
    // hasStarted.current = true;

    async function startContainer() {
      try {
        // ✅ Check mounted files
        try {
          const rootFiles = await webContainer.fs.readdir("/");
          console.log("🗂️ Mounted Files in Root:", rootFiles);

          if (rootFiles.includes(files[1].name)) {
            console.log(`✅ ${files[1].name} is successfully mounted!`);
          }

          // Read a specific file to verify content
          const filePath = `/${files[1].name}`;
          const fileContent = await webContainer.fs.readFile(filePath, "utf-8");
          console.log(`📂 Content of ${files[1].name}:`, fileContent);
        } catch (error) {
          console.error("❌ Error verifying mounted files:", error);
        }

        // ✅ Move this BEFORE starting the server!
        webContainer.on("server-ready", (port, serverUrl) => {
          console.log(`✅ Server ready on ${serverUrl}:${port}`);
          setUrl(serverUrl);
        });


        // Install dependencies
        const installProcess = await webContainer.spawn("npm", ["install"]);
        await installProcess.exit; // Wait for installation to finish

        console.log("Dependencies installed ✅");

        // Start development server
        const runProcess = await webContainer.spawn("npm", ["run", "dev"]);

        // ✅ Capture logs from the process
        runProcess.output.pipeTo(
          new WritableStream({
            write(chunk) {
              console.log("🖥️ Dev Server Log:", chunk);
            },
          })
        );

        console.log("Devooh! server started 🚀");
        await runProcess.exit; // Wait for server to start

        console.log("Dev server started 🚀");

        // Listen for `server-ready`
        webContainer.on("server-ready", (port, serverUrl) => {
          console.log(`Server ready on ${serverUrl}:${port}`);
          setUrl(serverUrl);
          console.log("URL set to:", serverUrl);
          console.log("URL set to:", url);
        });
      } catch (error) {
        console.error("WebContainer Error:", error);
      }
    }
    console.log("Starting container...");
    startContainer();
    console.log("Container started!");

    // return () => {
    //   console.log("Stopping container...");
    //   isMounted = false; // Prevent state updates after unmount
    // };
  }, []); // Runs only when `webContainer` changes

  useEffect(() => {
    if (url) {
      console.log("🌍 URL Updated:", url);
    }
  }, [url]);

  return (
    <div className="h-full flex items-center justify-center text-gray-400">
      {!url ? (
        // <p className="text-center">Loading...</p>
        <FadeLoader
        color={"#FFFFFF"}
        // loading={loading}
        // size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      ) : (
        <iframe width="100%" height="100%" src={url} />
      )}
    </div>
  );
}
