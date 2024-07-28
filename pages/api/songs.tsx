import path from "path";
import { promises as fs } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const jsonDirectory = path.join(process.cwd(), "json");

  const fileContents = await fs.readFile(
    jsonDirectory + "/server-payload.json",
    "utf8"
  );
  const payload = JSON.parse(fileContents);

  const songs = payload?.songs.map((i) => ({
    id: i.id,
    song: i.song,
  }));

  res.end(JSON.stringify({ songs }));
}
