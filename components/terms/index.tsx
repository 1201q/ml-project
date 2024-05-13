import styled from "styled-components";
import { useRef, useState, useEffect } from "react";
import * as faceapi from "face-api.js";
import Header from "../Header";
import Terms from "./Terms";
import { motion } from "framer-motion";

const StartPage = () => {
  const cameraContainerRef = useRef<HTMLDivElement>(null);

  const [isModelInit, setIsModelInit] = useState(false);

  const init = async () => {
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models"),
      faceapi.nets.ageGenderNet.loadFromUri("/models"),
    ]);
    setIsModelInit(true);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Container initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Header currentMenu={"이용약관"} />
      <Terms />
      {/* <CameraContainer ref={cameraContainerRef}></CameraContainer> */}
    </Container>
  );
};

const Container = styled(motion.div)`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const CameraContainer = styled.div`
  height: 550px;
  max-height: calc(100dvh - 200px);
  background-color: #f2f4f6;
  border-radius: 0px;
  overflow: hidden;
  position: relative;
`;

export default StartPage;
