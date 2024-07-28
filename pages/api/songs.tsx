import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const payload = JSON.parse(
    fs.readFileSync("./server-payload.json", { encoding: "utf8" })
  );

  const songs = payload?.songs.map((i) => ({
    id: i.id,
    song: i.song,
  }));

  res.end(JSON.stringify({ songs }));
}
