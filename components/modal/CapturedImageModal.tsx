import { capturedImageAtom } from "@/context/atoms";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import Image from "next/image";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import * as faceapi from "face-api.js";

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

  const [capturedImage, setCapturedImage] = useAtom(capturedImageAtom);
  const [canvasSize, setCanvasSize] = useState<
    undefined | { width: number; height: number }
  >(undefined);

  const detectFace = async () => {
    const img = capturedImageRef.current;
    const canvas = canvasRef.current;

    if (img && canvas) {
      const detectionPromise: any = faceapi
        .detectSingleFace(
          img as faceapi.TNetInput,
          new faceapi.TinyFaceDetectorOptions()
        )
        .withAgeAndGender();

      const displaySize = {
        width: img.clientWidth,
        height: img.clientHeight,
      };

      detectionPromise
        .then(async (detections: any) => {
          if (detections && detections.detection) {
            console.log(detections);
            const box = detections?.detection.box;

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

              const context = canvas.getContext("2d");

              if (context) {
                context.clearRect(0, 0, canvas.width, canvas.height);
                const drawBox = new faceapi.draw.DrawBox(
                  resizedDetections.box,
                  { lineWidth: 3 }
                );
                drawBox.draw(canvas);
              }
            }
          } else {
            const context = canvas.getContext("2d");
            if (context) {
              context.clearRect(0, 0, canvas.width, canvas.height);
            }
          }
        })
        .catch((error: Error) => {
          console.error(error);
        });
    }
  };

  useEffect(() => {
    return () => {
      setCanvasSize(undefined);
      setCapturedImage(undefined);
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
            bg={"rgb(49, 130, 246)"}
            font={"white"}
            whileTap={{ scale: 0.97 }}
            whileHover={{ filter: "brightness(0.8)" }}
          >
            이 얼굴로 할게요
          </Button>
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
  width: calc(100% - 40px);
  height: 55px;
  border-radius: 15px;
  background-color: ${(props) => props.bg};
  color: ${(props) => props.font};
  font-size: 17px;
  font-weight: 600;
  -webkit-tap-highlight-color: transparent;
`;

export default CapturedImageModal;
