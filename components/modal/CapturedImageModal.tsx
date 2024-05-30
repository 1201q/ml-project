import {
  capturedImageAtom,
  detectedFaceDataAtom,
  detectedFaceImageAtom,
} from "@/context/atoms";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { loadImage } from "canvas";
import * as canvas from "canvas";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import * as faceapi from "face-api.js";
import nextURLPush from "@/utils/nextURLPush";
import { useRouter } from "next/router";
import dataURLtoBlob from "@/utils/blob";

const modalVariants = {
  initial: {
    opacity: 0,
    y: 300,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    y: 300,
    opacity: 0,
    transition: { duration: 0.1 },
  },
};

const CapturedImageModal = ({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const capturedImageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const router = useRouter();

  const [capturedImage, setCapturedImage] = useAtom(capturedImageAtom);
  const [detectedFaceImage, setDetectedFaceImage] = useAtom(
    detectedFaceImageAtom
  );

  const [detectedFaceData, setDetectedFaceData] = useAtom(detectedFaceDataAtom);
  const [canvasSize, setCanvasSize] = useState<
    undefined | { width: number; height: number }
  >(undefined);
  const [isFaceDetected, setIsFaceDetected] = useState(false);

  const detectFace = async () => {
    const img = capturedImageRef.current;
    const canvas = canvasRef.current;

    if (img && canvas) {
      const detectionPromise: any = faceapi
        .detectSingleFace(
          img as faceapi.TNetInput,
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceLandmarks(true)
        .withAgeAndGender();

      const displaySize = {
        width: img.clientWidth,
        height: img.clientHeight,
      };

      detectionPromise
        .then(async (detections: any) => {
          if (detections && detections.detection) {
            const box = detections?.detection.box;
            getCroppedFace(box);
            if (
              box &&
              box.x !== null &&
              box.y !== null &&
              box.width !== null &&
              box.height !== null
            ) {
              const resizedDetections = faceapi.resizeResults(
                detections.detection,
                displaySize
              );
              // const resizedLandmark: faceapi.FaceLandmarks =
              //   faceapi.resizeResults(detections, displaySize);

              const context = canvas.getContext("2d");

              if (context) {
                context.clearRect(0, 0, canvas.width, canvas.height);
                const drawBox = new faceapi.draw.DrawBox(
                  resizedDetections.box,
                  { lineWidth: 3 }
                );
                drawBox.draw(canvas);
                // faceapi.draw.drawFaceLandmarks(canvas, resizedLandmark);
                setIsFaceDetected(true);
                setDetectedFaceData(detections);
              }
            }
          } else {
            const context = canvas.getContext("2d");
            if (context) {
              context.clearRect(0, 0, canvas.width, canvas.height);
            }
            setIsFaceDetected(false);
          }
        })
        .catch((error: Error) => {
          console.error(error);
          setIsFaceDetected(false);
        });
    } else {
      setIsFaceDetected(false);
    }
  };

  const getCroppedFace = async (faceBox: faceapi.Box) => {
    if (capturedImage?.src) {
      const img = await loadImage(capturedImage?.src);

      const { x, y, width, height } = faceBox;
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
    }
  };

  useEffect(() => {
    return () => {
      setCanvasSize(undefined);

      setIsFaceDetected(false);
    };
  }, []);

  useEffect(() => {
    if (canvasSize) {
      detectFace();
    }
  }, [canvasSize]);

  return (
    <Container>
      <ModalContainer
        variants={modalVariants}
        animate="animate"
        initial="initial"
        exit="exit"
      >
        {capturedImage && (
          <ImageContainer ratio={capturedImage.width / capturedImage.height}>
            <Image
              ref={capturedImageRef}
              src={capturedImage.src}
              fill
              alt="face"
              quality={100}
              style={{ borderRadius: "15px" }}
              onLoad={() => {
                if (capturedImageRef.current) {
                  const { clientWidth, clientHeight } =
                    capturedImageRef.current;
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

        <ButtonContainer>
          {isFaceDetected ? (
            <>
              <Button
                onClick={() => {
                  setIsOpen(false);
                }}
                bg={"#f2f4f6"}
                font={"gray"}
                whileTap={{ scale: 0.97 }}
              >
                다시 찍을게요
              </Button>
              <Button
                onClick={() => {
                  nextURLPush(router, "/stage/gender");
                }}
                bg={"rgb(49, 130, 246)"}
                font={"white"}
                whileTap={{ scale: 0.97 }}
                whileHover={{ filter: "brightness(0.8)" }}
              >
                이 얼굴로 할게요
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => {
                  setIsOpen(false);
                }}
                bg={"#f2f4f6"}
                font={"gray"}
                whileTap={{ scale: 0.97 }}
              >
                다시 찍어주세요
              </Button>
            </>
          )}
        </ButtonContainer>
      </ModalContainer>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 200;
`;

const ModalContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  bottom: 13px;
  width: calc(100% - 26px);

  background-color: white;
  z-index: 100;
  margin: 0px 13px;
  border-radius: 25px;
  overflow: hidden;
`;

const ButtonContainer = styled.div`
  width: calc(100% - 40px);
  bottom: 0;
  margin: 0px 20px 20px 20px;
  display: flex;
  gap: 15px;
  background-color: white;
`;

const ImageContainer = styled.div<{ ratio: number }>`
  aspect-ratio: ${(props) => props.ratio};
  position: relative;

  margin: 20px 20px 20px 20px;

  img {
    aspect-ratio: ${(props) => props.ratio};
  }
`;

const Button = styled(motion.button)<{ bg: string; font: string }>`
  width: 100%;
  height: 55px;
  border-radius: 15px;
  background-color: ${(props) => props.bg};
  color: ${(props) => props.font};
  font-size: 17px;
  font-weight: 600;
  -webkit-tap-highlight-color: transparent;
`;

export default CapturedImageModal;
