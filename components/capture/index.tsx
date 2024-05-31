import Camera from "@/components/capture/Camera";
import { AnimatePresence, motion } from "framer-motion";
import { ChangeEvent, useRef, useState } from "react";
import styled from "styled-components";
import CapturedImageModal from "../modal/CapturedImageModal";
import { useAtom } from "jotai";
import {
  capturedImageAtom,
  detectedFaceDataAtom,
  uploadedImageAtom,
} from "@/context/atoms";
import Webcam from "react-webcam";
import nextURLPush from "@/utils/nextURLPush";
import { useRouter } from "next/router";
import dataURLtoBlob from "@/utils/blob";

const CapturePage = () => {
  const router = useRouter();
  const webcamRef = useRef<Webcam>(null);
  const [score, setScore] = useState<number>(NaN);
  const [isTiltingFace, setIsTiltingFace] = useState(false);
  const [isImgConfirmModalOpen, setIsImgConfirmModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [capturedImage, setCapturedImage] = useAtom(capturedImageAtom);
  const [uploadedImage, setUploadedImage] = useAtom(uploadedImageAtom);

  const onCapture = async () => {
    const imgSrc = webcamRef.current?.getScreenshot();

    const { clientWidth, clientHeight } = webcamRef.current
      ?.video as HTMLVideoElement;

    if (imgSrc) {
      setCapturedImage({
        src: imgSrc,
        width: clientWidth,
        height: clientHeight,
      });

      setIsImgConfirmModalOpen(true);
    }
  };

  const getIndicatorBg = (score: number, isTiltingFace: boolean): string => {
    if (isTiltingFace) {
      return "rgba(240, 68, 82, 0.8)";
    } else {
      if (Number.isNaN(score)) {
        return "rgba(240, 68, 82, 0.8)";
      } else if (score < 80) {
        return "rgba(49, 130, 246, 0.8)";
      } else {
        return "rgba(49, 130, 246, 1)";
      }
    }
  };

  const getImageFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const image = new Image();
        const url = e.target?.result as string;
        image.onload = () => {
          setUploadedImage({
            src: url,
            width: image.width,
            height: image.height,
          });
          nextURLPush(router, "/stage/upload");
        };
        image.src = url;
      };
      reader.readAsDataURL(file);
    } else {
      setUploadedImage(undefined);
    }
  };

  return (
    <Container>
      <Camera
        webcamRef={webcamRef}
        setScore={setScore}
        setIsTiltingFace={setIsTiltingFace}
        setIsLoaded={setIsLoaded}
        isStop={isImgConfirmModalOpen}
      />
      <ControllerContainer>
        <StorageBtn
          whileTap={{ scale: 0.95, backgroundColor: "#8080807e" }}
          whileHover={{ backgroundColor: "#8080807e" }}
          htmlFor="file"
        >
          기존 이미지를 가져올게요
        </StorageBtn>
        <Input id="file" type="file" accept="image/*" onChange={getImageFile} />
        <CaptureBtnContainer>
          <CaptureButton onClick={onCapture} whileTap={{ scale: 0.9 }} />
        </CaptureBtnContainer>
      </ControllerContainer>
      {/* {isLoaded && (
        <PercentIndicator bg={getIndicatorBg(score, isTiltingFace)}>
          {isTiltingFace
            ? "얼굴이 기울어졌어요"
            : score
            ? `얼굴일 확률 ${score.toFixed()}%`
            : "얼굴을 인식할 수 없어요"}
        </PercentIndicator>
      )} */}
      <AnimatePresence>
        {isImgConfirmModalOpen && (
          <CapturedImageModal setIsOpen={setIsImgConfirmModalOpen} />
        )}
      </AnimatePresence>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: black;
`;

const ControllerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 180px;
  background-color: black;
`;

const StorageBtn = styled(motion.label)`
  font-size: 15px;
  color: #808080;
  z-index: 100;
  padding: 7px 12px;
  border-radius: 7px;
  margin-top: 17px;
  cursor: pointer;
`;

const CaptureButton = styled(motion.button)`
  width: 50px;
  height: 50px;
  background-color: white;
  border-radius: 50%;
`;

const CaptureBtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background-color: gray;
  border-radius: 50%;
  margin-top: 15px;
`;

const PercentIndicator = styled.div<{ bg: string }>`
  position: absolute;
  top: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 10px;
  max-width: 150px;
  height: 25px;
  background-color: ${(props) => props.bg};
  border-radius: 7px;
  font-size: 13px;
  font-weight: 400;
  color: white;
  z-index: 100;
  left: 50%;
  transform: translateX(-50%);
`;

const Input = styled.input`
  display: none;
`;

export default CapturePage;
