import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
// data:image/jpeg;base64,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

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function Extract(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Error parsing form data:", err);
        res.status(500).json({ error: "Error parsing form data" });
        return;
      }

      // 이미지 Blob 데이터
      const imageBlob = files.file;
      console.log(imageBlob);
      // 여기서 imageBlob을 처리하고 저장할 수 있습니다.
      // 예를 들어, imageBlob을 데이터베이스에 저장하거나 다른 서버로 전송할 수 있습니다.

      res.status(200).json({ message: "Image Blob received successfully" });
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
