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
            videoConstraints={{
              ...size,
              facingMode: "user",
            }}
          />
        )}
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
  display: flex;
  justify-content: center;
  position: relative;
  height: 100%;
`;

const ControllerContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 200px;
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

export default CaptureImagePage;
