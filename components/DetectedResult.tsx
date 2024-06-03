import { capturedImageAtom, detectedFaceImageAtom } from "@/context/atoms";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { loadImage } from "canvas";
import * as canvas from "canvas";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import * as faceapi from "face-api.js";
import dataURLtoBlob from "@/utils/blob";
import axios from "axios";
import { SetState } from "@/types/types";

interface PropsType {
  setIsFaceDetected: SetState<boolean>;
  setIsServerFaceDetected: SetState<boolean | "loading">;
}

const DetectedResult: React.FC<PropsType> = ({
  setIsFaceDetected,
  setIsServerFaceDetected,
}) => {
  const capturedImageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [capturedImage] = useAtom(capturedImageAtom);

  const [, setDetectedFaceImage] = useAtom(detectedFaceImageAtom);

  const [canvasSize, setCanvasSize] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const detectFace = async () => {
    const img = capturedImageRef.current;
    const canvas = canvasRef.current;

    if (img && canvas) {
      const detectionPromise: any = faceapi.detectSingleFace(
        img as faceapi.TNetInput,
        new faceapi.TinyFaceDetectorOptions()
      );

      const displaySize = {
        width: img.clientWidth,
        height: img.clientHeight,
      };

      detectionPromise
        .then(async (detections: any) => {
          if (detections) {
            const box = detections?.box;
            const blob = await getCroppedFace(box);

            if (blob) {
              verifyFaceDetection(blob);
            }

            if (
              box &&
              box.x !== null &&
              box.y !== null &&
              box.width !== null &&
              box.height !== null
            ) {
              const resizedDetections = faceapi.resizeResults(
                detections,
                displaySize
              );

              const context = canvas.getContext("2d");

              if (context) {
                context.clearRect(0, 0, canvas.width, canvas.height);
                const drawBox = new faceapi.draw.DrawBox(
                  resizedDetections.box,
                  { lineWidth: 1, boxColor: "white" }
                );
                drawBox.draw(canvas);

                setIsFaceDetected(true);
              }
            }
          } else {
            const context = canvas.getContext("2d");
            if (context) {
              context.clearRect(0, 0, canvas.width, canvas.height);
            }
            setIsFaceDetected(false);
            setIsServerFaceDetected(false);
          }
        })
        .catch((error: Error) => {
          console.error(error);
          setIsFaceDetected(false);
          setIsServerFaceDetected(false);
        });
    } else {
      setIsFaceDetected(false);
      setIsServerFaceDetected(false);
    }
  };

  const getCroppedFace = async (faceBox: faceapi.Box) => {
    if (capturedImage?.src) {
      const img = await loadImage(capturedImage?.src);

      let { x, y, width, height } = faceBox;

      x = x - 5;
      y = y - 5;
      width = width + 10;
      height = height + 10;

      const faceCanvas = canvas.createCanvas(width, height);
      const ctx = faceCanvas.getContext("2d");
      ctx.drawImage(img, x, y, width, height, 0, 0, width, height);

      const croppedImage = faceCanvas.toDataURL();

      const blob = dataURLtoBlob(croppedImage);

      if (croppedImage && blob) {
        setDetectedFaceImage({
          src: croppedImage,
          width: width,
          height: height,
          x: x,
          y: y,
          blob: blob,
        });
      }

      return blob;
    }
    return null;
  };

  const verifyFaceDetection = (blob: Blob) => {
    const url = `${process.env.NEXT_PUBLIC_GCP_API_URL}/isface` as string;
    const formData = new FormData();
    formData.append("file", blob);

    axios
      .post(url, formData)
      .then((res) => {
        if (res.data.isFace) {
          setIsServerFaceDetected(true);
        } else {
          setIsServerFaceDetected(false);
        }
      })
      .catch((error) => {
        setIsServerFaceDetected(false);
      });
  };

  useEffect(() => {
    return () => {
      setCanvasSize(null);
      setIsFaceDetected(false);
      setIsServerFaceDetected("loading");
    };
  }, []);

  useEffect(() => {
    if (canvasSize) {
      detectFace();
    }
  }, [canvasSize]);

  return (
    <Container>
      {capturedImage && (
        <ImageContainer
          layoutId="camera"
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
          ratio={capturedImage.width / capturedImage.height}
        >
          <Image
            ref={capturedImageRef}
            src={capturedImage.src}
            fill
            alt="face"
            quality={100}
            style={{ borderRadius: "17px" }}
            onLoad={() => {
              if (capturedImageRef.current) {
                const { clientWidth, clientHeight } = capturedImageRef.current;
                setCanvasSize({ width: clientWidth, height: clientHeight });
              }
            }}
          />
          {canvasSize && (
            <canvas
              style={{ position: "absolute" }}
              ref={canvasRef}
              width={canvasSize.width}
              height={canvasSize.height}
            />
          )}
        </ImageContainer>
      )}
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 200;
`;
const ImageContainer = styled(motion.div)<{ ratio: number }>`
  width: calc(100% - 40px);
  aspect-ratio: ${(props) => props.ratio};
  position: relative;
  margin: 20px 20px 20px 20px;

  img {
    aspect-ratio: ${(props) => props.ratio};
  }
`;

export default DetectedResult;
