import { NextRequest, NextResponse } from "next/server";
import fs from "fs-extra";
import path from "path";
import axios from "axios";
import archiver from "archiver";
import { FileItem } from "@/types";

const NETLIFY_TOKEN = "nfp_e9Pra7RRDqeduoaNoy3C9xrh1A8udL3Gd364"; // Replace with your Netlify token
const NETLIFY_API_BASE = "https://api.netlify.com/api/v1";

async function createLocalProject(fileItems: FileItem[], baseDir: string) {
  for (const item of fileItems) {
    const fullPath = path.join(baseDir, item.path);

    if (item.type === "folder") {
      await fs.ensureDir(fullPath);
      if (item.children) {
        await createLocalProject(item.children, baseDir);
      }
    } else if (item.type === "file") {
      await fs.ensureDir(path.dirname(fullPath));
      await fs.writeFile(fullPath, item.content || "");
    }
  }
}

function zipDirectory(sourceDir: string, outPath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const archive = archiver("zip", { zlib: { level: 9 } });
    const output = fs.createWriteStream(outPath);

    output.on("close", () => resolve(outPath));
    archive.on("error", (err:any) => reject(err));

    archive.pipe(output);
    archive.directory(sourceDir, false);
    archive.finalize();
  });
}

async function deployToNetlify(zipFilePath: string): Promise<string> {
  try {
    const siteResponse = await axios.post(
      `${NETLIFY_API_BASE}/sites`,
      {},
      { headers: { Authorization: `Bearer ${NETLIFY_TOKEN}` } }
    );

    const siteId = siteResponse.data.id;
    const siteUrl = siteResponse.data.url;

    console.log(`Created Netlify site: ${siteUrl}`);

    const zipContent = fs.readFileSync(zipFilePath);

    const deployResponse = await axios.post(
      `${NETLIFY_API_BASE}/sites/${siteId}/deploys`,
      zipContent,
      {
        headers: {
          Authorization: `Bearer ${NETLIFY_TOKEN}`,
          "Content-Type": "application/zip",
        },
      }
    );

    console.log(`Deployed to Netlify: ${deployResponse.data.deploy_ssl_url}`);
    return deployResponse.data.deploy_ssl_url;
  } catch (error) {
    console.error("Netlify Deployment Error:", error);
    throw error;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { fileItems } = await req.json();

    if (!fileItems || !Array.isArray(fileItems)) {
      return NextResponse.json({ error: "Invalid FileItem[] structure." }, { status: 400 });
    }

    const tempDir = path.join(process.cwd(), "temp_project");
    const zipPath = path.join(process.cwd(), "project.zip");

    await fs.ensureDir(tempDir);
    await createLocalProject(fileItems, tempDir);
    await zipDirectory(tempDir, zipPath);
    
    const liveUrl = await deployToNetlify(zipPath);

    // await fs.remove(tempDir);
    // await fs.remove(zipPath);

    return NextResponse.json({ success: true, url: liveUrl });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
