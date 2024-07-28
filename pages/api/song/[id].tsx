import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { id } = req.query;

  const payload = JSON.parse(
    fs.readFileSync("./server-payload.json", { encoding: "utf8" })
  );
  const artist = payload?.songs?.find((artist) => artist.id == id);

  res.end(JSON.stringify(artist));
}
