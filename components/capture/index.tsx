import Camera from "@/components/capture/Camera";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ImageConfirmModal from "../modal/ImageConfirmModal";
import { useAtom } from "jotai";
import { imgSizeAtom, imgSrcAtom } from "@/context/atoms";
import Webcam from "react-webcam";

const CapturePage = () => {
  const webcamRef = useRef<Webcam>(null);
  const [score, setScore] = useState<number>(NaN);
  const [isImgConfirmModalOpen, setIsImgConfirmModalOpen] = useState(false);
  const [imgSrc, setImgSrc] = useAtom(imgSrcAtom);
  const [imgSize, setImgSize] = useAtom(imgSizeAtom);

  const onCapture = () => {
    const img = webcamRef.current?.getScreenshot();
    if (img) {
      setImgSrc(img);
    }
  };

  useEffect(() => {
    if (imgSrc) {
      setIsImgConfirmModalOpen(true);
    }
  }, [imgSrc]);

  useEffect(() => {
    setImgSrc(null);
    setImgSize(null);
    setIsImgConfirmModalOpen(false);
  }, []);

  return (
    <Container>
      <Camera
        webcamRef={webcamRef}
        setScore={setScore}
        isStop={isImgConfirmModalOpen}
      />
      <ControllerContainer>
        <StorageBtn
          whileTap={{ scale: 0.95, backgroundColor: "#8080807e" }}
          whileHover={{ backgroundColor: "#8080807e" }}
        >
          기존 이미지를 가져올게요
        </StorageBtn>
        <CaptureBtnContainer>
          <CaptureButton onClick={onCapture} whileTap={{ scale: 0.9 }} />
        </CaptureBtnContainer>
      </ControllerContainer>
      <PercentIndicator>
        {score ? `얼굴일 확률 ${score.toFixed()}%` : "얼굴을 인식할 수 없어요"}
      </PercentIndicator>
      <AnimatePresence>
        {isImgConfirmModalOpen && (
          <ImageConfirmModal setIsOpen={setIsImgConfirmModalOpen} />
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

const StorageBtn = styled(motion.button)`
  font-size: 15px;
  color: #808080;
  z-index: 100;
  padding: 5px 10px;
  border-radius: 7px;
  margin-top: 17px;
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

const PercentIndicator = styled.div`
  position: absolute;
  top: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 10px;
  max-width: 140px;
  height: 25px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 7px;
  font-size: 12px;
  font-weight: 400;
  color: white;
  z-index: 100;
  left: 50%;
  transform: translateX(-50%);
`;

export default CapturePage;
