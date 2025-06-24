"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FileNode } from '@webcontainer/api';
import { CodeShowComponent } from '@/components/CodeShowComponent';
import { FileExplorer } from '@/components/FileExplorer';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import { transformFiles } from '@/libs/sampack';
import { reactBaseTemplate } from '@/libs/baseTemplate';
import { extractAllFiles, secondPart1, secondpart3 } from '@/libs/prompts';
import { json } from 'stream/consumers';

import HashLoader from "react-spinners/HashLoader";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Preview } from '@/components/Preview';
import { ClipLoader } from 'react-spinners';
import { useWebContainer } from '@/hooks/useWebContainer';
import { FileItem } from '@/types';


export default function Builder() {
  const searchParams = useSearchParams()
  const prompt = searchParams.get("prompt");
  const [loading, setLoading] = useState(false);
  const [deployloading, setDeployLoading] = useState(false);
  const [templateSet, setTemplateSet] = useState(false);
  const webcontainer = useWebContainer();

  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);


  const [files, setFiles] = useState<FileItem[]>([]);
  const [sampackFiles, setSandpackFiles] = useState<Record<string, string>>();

  const [templatefiles, setTemplateFiles] = useState<FileItem[]>([]);

  const [responseOfChatapi, setresponseOfChatapi] = useState<any>();

  const [isChatcomplete, setisChatcomplete] = useState(false);

  const [userPrompt, setPrompt] = useState("");

  const [websiteURL, setWebsiteURL] = useState("");


  useEffect(() => {
    const mountAndUpdateFiles = async () => {
      if (!webcontainer) {
        console.warn("WebContainer not initialized yet. Skipping mount.");
        return;
      }
      if (!files || files.length === 0) {
        console.warn("No files provided. Skipping mount.");
        return;
      }

      // console.log("DOOSRA USE EFFECT");
      // console.log(files, "files ke time pe aah!");

      //  Function to update files
      // console.log("Updating files in WebContainer...");

      let updatedFiles = [...files];

      //  Helper function to find and update a file recursively
      const updateNestedFile = (fileList: any, filePath: any, newContent: any) => {
        return fileList.map((file: FileItem) => {
          if (file.type === "file" && file.path === filePath) {
            // console.log("Updating file:", filePath);
            return { ...file, content: newContent };
          }
          if (file.type === "folder" && file.children) {
            return { ...file, children: updateNestedFile(file.children, filePath, newContent) };
          }
          return file;
        });
      };

      const addNestedFile = (fileList: FileItem[], newFile: FileItem) => {
        return fileList.map((file) => {
          if (file.type === "folder" && file.name === "src") {
            // console.log("Adding file to /src:", newFile.name);
            return { ...file, children: [...(file.children || []), newFile] };
          }
          return file;
        });
      };

      // console.log("responseOfChatapi from chat api in useffect checking before mounting:", responseOfChatapi);
      //  Update modified files
      for (const modifiedFile of responseOfChatapi.modified_files) {
        // console.log("Modifying file:", modifiedFile.path);
        updatedFiles = updateNestedFile(updatedFiles, modifiedFile.path, modifiedFile.content);
        // await webcontainer.fs.writeFile(modifiedFile.path, modifiedFile.content);
      }



      //  Add new files in the correct folders
      for (const newFile of responseOfChatapi.new_files) {
        // console.log("Adding new file:", newFile.path);
        updatedFiles = addNestedFile(updatedFiles, newFile);
      }

      //  Function to create mount structure
      const createMountStructure = (files: FileItem[]): Record<string, any> => {
        const mountStructure: Record<string, any> = {};

        const processFile = (file: FileItem, isRootFolder: boolean): any => {
          if (file.type === "folder") {
            const directory: Record<string, any> = {};
            file.children?.forEach(child => {
              directory[child.name] = processFile(child, false);
            });
            return { directory };
          } else if (file.type === "file") {
            return { file: { contents: file.content || "" } };
          }
        };

        files.forEach(file => {
          mountStructure[file.name] = processFile(file, true);
        });

        return mountStructure;
      };

      // console.log(files, "files mount se pahle ");
      const mountStructure = createMountStructure(updatedFiles);
      // console.log(mountStructure, "mountStructure");

      //  Mount the structure
      await webcontainer.mount(mountStructure);
      // console.log("WebContainer mounted successfully!");

      //  Verify mounted files
      try {
        const rootFiles = await webcontainer.fs.readdir("/");
        // console.log(" Mounted Files in Root:", rootFiles);

        if (rootFiles.includes(files[1]?.name)) {
          // console.log(` ${files[1].name} is successfully mounted!`);
        }

        const filePath = `/${files[1]?.name}`;
        const fileContent = await webcontainer.fs.readFile(filePath, "utf-8");
        // console.log(` Content of ${files[1]?.name}:`, fileContent);

      } catch (error) {
        console.error("❌ Error verifying mounted files:", error);
      }


      //  Update state
      // console.log("Updated Files:3", updatedFiles);
      setFiles(updatedFiles);
      // console.log("Files updated successfully!3");
      // };

    };

    mountAndUpdateFiles();
  }, [responseOfChatapi]);


  async function init() {
    const response = await axios.post(`/template`, {
      prompt: prompt!.trim()
    });

    setTemplateSet(true);

    const { prompts, uiPrompts } = response.data;

    setLoading(true);

    const messages = `${prompts[0]} \n\n User Prompt : ${prompt}`;

    const stepsResponse = await axios.post(`/agent`, {
      messages: messages
    });

    // 🛠️ FIX HERE: Parse if it's a string
    const rawResponse = stepsResponse.data.response;

    // console.log("Raw response:", rawResponse);


    let parsedResponse = rawResponse;

    if (typeof rawResponse === "string") {
      const cleaned = rawResponse
        .replace(/```json\n?/, '')
        .replace(/```$/, '')
        .trim();

      parsedResponse = JSON.parse(cleaned);
    }

    // console.log("Parsed response:", parsedResponse);
    // console.log("Array.isArray?", Array.isArray(parsedResponse.modified_files)); // ✅ should be true now

    setresponseOfChatapi(parsedResponse); // ✅ storing parsed object
    setFiles(uiPrompts[0]);

    setLoading(false);
    setisChatcomplete(true);
  }


  useEffect(() => {
    // console.log("TEESRA USE EFFECT");
    init();
  }, [])

  // useEffect(() => {
  //   if (files.length > 0) {
  // console.log(transformFiles(files), "transform files ke time pe aah!");
  //     setSandpackFiles(transformFiles(files));
  // console.log(sampackFiles, "sampack files ke time pe aah!");
  // console.log(files, "files ke time pe aah!");
  // console.log(files[0], "files ke time pe aah!");
  //   }
  // }, [files]);

  // useEffect(() => {
  // console.log(sampackFiles, "sandpackFiles updated");
  // }, [sampackFiles]);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4 text-center">
        <p className="text-sm text-orange-400 mt-1">Prompt: {prompt}</p>
      </header>

      <div className="flex-1 overflow-hidden h-full">
        <div className="h-full w-full flex justify-center items-center px-6 py-8 gap-6">

          {loading && (
            <div className='flex flex-col gap-32 items-center justify-center h-screen'>
              <HashLoader
                color={"#FFFFFF"}
                loading={loading}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
              <div>
                <h1 className="text-white text-3xl">Wait Till We are Loading....</h1>
              </div>
            </div>
          )}
          {!loading && (
            <div className="flex flex-col items-center justify-center min-h-screen bg- p-6">
              {/* Upper Section */}
              <div className="w-full h-[50%] flex flex-col items-center justify-center mb-48">
                {/* Deploy Button */}
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      onClick={async () => {
                        try {
                          setDeployLoading(true);
                          if (!Array.isArray(files) || files.length === 0) {
                            console.error("Invalid files array", files);
                            return;
                          }
                          // console.log("Sending files:", files);
                          const response = await axios.post(`/deploy`, { fileItems: files }, {
                            headers: { 'Content-Type': 'application/json' },
                          });
                          // console.log("Deployment response:", response.data);
                          if (response.data.success) {
                            // alert(`Deployed successfully: ${response.data.url}`);
                            setWebsiteURL(response.data.url);
                          }
                        } catch (error) {
                          console.error("Deployment failed:", error);
                        } finally {
                          setDeployLoading(false);
                        }
                      }}
                      className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300"
                    >
                      🚀 Deploy
                    </button>
                  </DialogTrigger>
                  <DialogContent className="w-1/4 h-ful flex">
                    <DialogTitle>Deployment</DialogTitle>
                    {deployloading && (
                      <ClipLoader
                        color={"#FFFFFF"}
                        loading={loading}
                        size={150}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    )}
                    {!deployloading && websiteURL && (
                      <div>
                        websiteURL: {websiteURL}
                      </div>
                    )}
                    <DialogFooter className="sm:justify-start">
                      <DialogClose asChild>

                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>


                {/* Input & Chat */}
                <div className="w-full max-w-2xl mt-6">
                  <textarea
                    value={userPrompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full p-4 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                    placeholder="Add Feature to Your App"
                    rows={4}
                  />

                  <button
                    onClick={async () => {
                      setLoading(true);
                      const fileContents = extractAllFiles(files).join("\n");
                      const part2 = `### **Project Files:**\nBelow is the content of all files inside the \`src\` folder:\n\n${fileContents}`;
                      const newMessage = `${secondPart1} \n\n ${part2} \n\n ${secondpart3} \n\n User Prompt: ${userPrompt}`;

                      const stepsResponse = await axios.post(`/agent`, { messages: newMessage });
                      setLoading(false);
                      // console.log(stepsResponse.data.response, "gandi baat agli chat ke sath");
                      // 🛠️ FIX HERE: Parse if it's a string
                      const rawResponse = stepsResponse.data.response;
                      // console.log("Raw response:", rawResponse);
                      let parsedResponse = rawResponse;
                      if (typeof rawResponse === "string") {
                        const cleaned = rawResponse
                          .replace(/```json\n?/, '')
                          .replace(/```$/, '')
                          .trim();

                        parsedResponse = JSON.parse(cleaned);
                      }
                      setresponseOfChatapi(parsedResponse);
                    }}
                    className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300"
                  >
                    💬 Send Prompt
                  </button>
                </div>

                {loading && (
                  <ClipLoader
                    color={"#FFFFFF"}
                    loading={loading}
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                )}
              </div>

              {/* Lower Section */}
              <div className="w-full flex justify-center space-x-6 py-6">
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      onClick={() => null}
                      className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300"
                    >
                      📜 Preview Code
                    </button>
                  </DialogTrigger>
                  <DialogContent className="w-full h-ful flex">
                    <DialogTitle>Code Base</DialogTitle>
                    <div className="flex">
                      {files && (
                        <FileExplorer
                          files={files}
                          onFileSelect={setSelectedFile}
                        />
                      )}
                    </div>
                    <div className="flex flex-col w-full bg-gray-900 rounded-lg p-10 shadow-lg h-[calc(100vh-8rem)]">
                      <CodeShowComponent file={selectedFile} />
                    </div>
                    <DialogFooter className="sm:justify-start">
                      <DialogClose asChild>

                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>


                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      onClick={() => null}
                      className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300"
                    >
                      🌐 Preview Website
                    </button>
                  </DialogTrigger>
                  <DialogContent className="w-full h-ful flex">
                    <DialogTitle>Preview</DialogTitle>
                    <div className="flex flex-col w-full bg-gray-900 rounded-lg p-1 shadow-lg h-[calc(100vh-8rem)]">
                      <Preview webContainer={webcontainer!} files={files} />
                    </div>
                    <DialogFooter className="sm:justify-start">
                      <DialogClose asChild>

                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>


              </div>
            </div>
          )}

          {/* <div className='w-full h-full'> 
            {sampackFiles && (
            <SandpackProvider files={sampackFiles} template='react' >
            <SandpackLayout>
              <SandpackFileExplorer />
              <SandpackCodeShowComponent />
              <SandpackPreview />
            </SandpackLayout>
          </SandpackProvider>
          )}
          </div> */}
        </div>
      </div>
    </div>
  );
}