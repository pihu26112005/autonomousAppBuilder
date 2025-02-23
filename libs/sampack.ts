import { FileItem } from "@/types";

export function transformFiles(files: FileItem[]): Record<string, string> {
  const result: Record<string, string> = {};

  function traverse(file: FileItem) {
    if (!file.path) {
      console.warn("Skipping file with missing path:", file.path);
      return;
    }

    if (file.type === "file") {
      result[file.path] = file.content || '';
      console.log(result, "result from transformFiles");
    } else if (file.type === "folder" && file.children) {
      file.children.forEach(child => traverse(child));
    }
  }

  files.forEach(file => traverse(file));
  console.log("Final transformed files:", result); // Debugging
  return result;
}
