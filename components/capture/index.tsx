import { AnimatePresence, motion } from "framer-motion";
import Webcam from "react-webcam";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import useSize from "@/utils/useSize";
import ImageConfirmModal from "../modal/ImageConfirmModal";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { imgSizeAtom, imgSrcAtom } from "@/context/atoms";
import WebcamComponent from "./Webcam";

const CapturePage = () => {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const webcamRef = useRef<Webcam>(null);

  const [isReadyCamera, setIsReadyCamera] = useState(false);
  const [imgSrc, setImgSrc] = useAtom(imgSrcAtom);
  const [isImgConfirmModalOpen, setIsImgConfirmModalOpen] = useState(false);

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
  }, []);

  return (
    <Container>
      <CameraContainer ref={videoContainerRef}>
        <WebcamComponent
          setIsReadyCamera={setIsReadyCamera}
          webcamRef={webcamRef}
          isStop={isImgConfirmModalOpen}
        />

        <StorageBtn
          whileTap={{ scale: 0.95, backgroundColor: "#8080807e" }}
          whileHover={{ backgroundColor: "#8080807e" }}
        >
          기존 이미지를 가져올게요
        </StorageBtn>
      </CameraContainer>
      <ControllerContainer>
        {isReadyCamera && (
          <CaptureBtnContainer>
            <CaptureButton onClick={onCapture} whileTap={{ scale: 0.9 }} />
          </CaptureBtnContainer>
        )}
      </ControllerContainer>
      <AnimatePresence>
        {isImgConfirmModalOpen && imgSrc && (
          <ImageConfirmModal
            setIsOpen={setIsImgConfirmModalOpen}
            imgSrc={imgSrc}
          />
        )}
      </AnimatePresence>
    </Container>
  );
};

const Container = styled(motion.div)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: black;
`;

const CameraContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
  height: calc(100% - 180px);
`;

const ControllerContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  margin-top: 10px;
`;

const StorageBtn = styled(motion.button)`
  position: absolute;
  bottom: -45px;
  font-size: 15px;
  color: #808080;
  z-index: 100;
  padding: 5px 10px;
  border-radius: 7px;
`;

export default CapturePage;
