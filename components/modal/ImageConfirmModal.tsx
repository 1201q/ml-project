import { imgSizeAtom, imgSrcAtom } from "@/context/atoms";
import { motion } from "framer-motion";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import Image from "next/image";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import * as faceapi from "face-api.js";
import { SizeType } from "@/types/types";

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

const ImageConfirmModal = ({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const router = useRouter();
  const [imgSize, setSize] = useAtom(imgSizeAtom);
  const [imgSrc, setImgSrc] = useAtom(imgSrcAtom);
  const [displayImgSize, setDisplayImgSize] = useState<SizeType | undefined>();
  const [btnContainerVisible, setBtnContainerVisible] = useState(false);
  const [isDetected, setIsDetected] = useState(false);

  const detectFace = async () => {
    const captureImageRef = imageRef.current;
    const detecterRef = canvasRef.current;

    if (captureImageRef && detecterRef) {
      const detectionPromise: any = faceapi.detectSingleFace(
        captureImageRef as faceapi.TNetInput,
        new faceapi.TinyFaceDetectorOptions()
      );

      const displaySize = {
        width: captureImageRef.clientWidth,
        height: captureImageRef.clientHeight,
      };

      detectionPromise
        .then(async (detections: faceapi.FaceDetection) => {
          if (detections) {
            const box = detections?.box;
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

              const context = detecterRef.getContext("2d");

              if (context) {
                context.clearRect(0, 0, detecterRef.width, detecterRef.height);
                const drawBox = new faceapi.draw.DrawBox(
                  resizedDetections.box,
                  { lineWidth: 3 }
                );
                drawBox.draw(detecterRef);
                setIsDetected(true);
              }
            }
            setBtnContainerVisible(true);
          } else {
            const context = detecterRef.getContext("2d");
            if (context) {
              context.clearRect(0, 0, detecterRef.width, detecterRef.height);
            }
            setIsDetected(false);
            setBtnContainerVisible(true);
          }
        })
        .catch((error: Error) => {
          console.error(error);
          setBtnContainerVisible(true);
          setIsDetected(false);
        });
    }
  };

  useEffect(() => {
    return () => setDisplayImgSize(undefined);
  }, []);

  useEffect(() => {
    if (displayImgSize) {
      console.log(displayImgSize);
      console.log(imgSize);
      detectFace();
    }
  }, [displayImgSize]);

  return (
    <Container>
      <ModalContainer
        variants={modalVariants}
        animate="animate"
        initial="initial"
        exit="exit"
      >
        {typeof imgSrc === "string" && imgSize && (
          <ImageContainer ratio={imgSize?.width / imgSize?.height}>
            <Image
              ref={imageRef}
              src={imgSrc}
              alt="captureImage"
              fill={true}
              style={{ borderRadius: "15px" }}
              onLoad={() => {
                if (imageRef.current) {
                  const renderImg = imageRef.current;

                  setDisplayImgSize({
                    width: renderImg.clientWidth,
                    height: renderImg.clientHeight,
                  });
                }
              }}
            />

            {displayImgSize && (
              <Detector
                ref={canvasRef}
                width={displayImgSize.width}
                height={displayImgSize.height}
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
            onClick={() => {
              if (imageRef.current) {
                const ref = imageRef.current;
                setSize({
                  width: ref.clientWidth,
                  height: ref.clientHeight,
                });
                console.log(ref.clientWidth, ref.clientHeight);
                router.push("/select_image/upload");
              }
            }}
            bg={"rgb(49, 130, 246)"}
            font={"white"}
            whileTap={{ scale: 0.97 }}
            whileHover={{ filter: "brightness(0.8)" }}
          >
            업로드
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

  @media screen and (max-width: 450px) {
    max-height: calc(100dvh - 100px);
  }
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

const Detector = styled.canvas`
  position: absolute;
`;

export default ImageConfirmModal;
