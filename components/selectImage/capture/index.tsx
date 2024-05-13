import { motion } from "framer-motion";
import Webcam from "react-webcam";
import styled from "styled-components";
import { useRef } from "react";
import useSize from "@/utils/useSize";

const CaptureImagePage = () => {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const { size, isResizing, init } = useSize(videoContainerRef);

  return (
    <Container>
      <CameraContainer ref={videoContainerRef}>
        {size && !isResizing && init && (
          <Webcam
            mirrored={true}
            videoConstraints={{ ...size, facingMode: "user" }}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          />
        )}

        <CameraBox />
      </CameraContainer>
      <ControllerContainer>
        {size?.width} /{size?.height} / {size?.aspectRatio}
        <CaptureBtnContainer>
          <CaptureButton whileTap={{ scale: 0.9 }}></CaptureButton>
        </CaptureBtnContainer>
      </ControllerContainer>
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
  height: 65%;
  position: relative;
`;
const ControllerContainer = styled.div`
  height: 35%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
`;

const CaptureButton = styled(motion.button)`
  width: 40px;
  height: 40px;
  background-color: white;
  border-radius: 50%;
`;

const CaptureBtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background-color: gray;
  border-radius: 50%;
`;

const CameraBox = styled.canvas`
  border: 1px solid rgba(255, 255, 255, 0.7);

  width: calc(100% - 40px);
  height: calc(100% - 40px);
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translateX(50%) translateY(-50%);
  z-index: 100;
  background-color: transparent;
`;

export default CaptureImagePage;
