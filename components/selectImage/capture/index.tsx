import { AnimatePresence, motion } from "framer-motion";
import Webcam from "react-webcam";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import useSize from "@/utils/useSize";
import ImageConfirmModal from "./ImageConfirmModal";
import { useAtom } from "jotai";
import { imgSrcAtom } from "@/context/atoms";

const CaptureImagePage = () => {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const webcamRef = useRef<Webcam>(null);

  const { isResizing, init } = useSize(videoContainerRef);
  const [isReadyCamera, setIsReadyCamera] = useState(false);
  const [imgSrc, setImgSrc] = useAtom(imgSrcAtom);
  const [isImgConfirmModalOpen, setIsImgConfirmModalOpen] = useState(false);

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

  return (
    <Container>
      <CameraContainer ref={videoContainerRef}>
        {!isResizing && init && (
          <Webcam
            ref={webcamRef}
            mirrored={true}
            videoConstraints={{
              facingMode: "user",
            }}
            screenshotQuality={100}
            screenshotFormat="image/jpeg"
            onCanPlay={() => {
              setIsReadyCamera(true);
            }}
          />
        )}
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
  color: white;
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
`;

export default CaptureImagePage;
