import * as faceapi from "face-api.js";
import * as canvas from "canvas";
import { loadImage } from "canvas";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

const loadModels = async () => {
  const MODEL_URL = path.join(process.cwd(), "public", "models");
  await faceapi.nets.tinyFaceDetector.loadFromDisk(MODEL_URL);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ error: "Image is required" });
    }

    try {
      await loadModels();

      const img = await loadImage(image);
      const detections = await faceapi.detectSingleFace(
        img,
        new faceapi.TinyFaceDetectorOptions()
      );

      if (!detections) {
        return res.status(404).json({ error: "No faces detected" });
      }

      const faceBox = detections.box;

      const { x, y, width, height } = faceBox;
      const faceCanvas = canvas.createCanvas(width, height);
      const ctx = faceCanvas.getContext("2d");
      ctx.drawImage(img, x, y, width, height, 0, 0, width, height);
      const croppedImage = faceCanvas.toDataURL();

      return res.status(200).json({ image: croppedImage });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
