import CurrentStage from "@/components/CurrentStage";
import FaceCapture from "@/components/FaceCapture";
import Header from "@/components/Header";
import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as faceapi from "face-api.js";

function Capture() {
  const router = useRouter();
  const [isInit, setIsInit] = useState(false);
  const [isCameraVisible, setIsCameraVisible] = useState(true);

  const init = async () => {
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models"),
      faceapi.nets.ageGenderNet.loadFromUri("/models"),
    ]);
    setIsInit(true);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Container>
      <Header />
      <CurrentStage />
      {isInit && isCameraVisible && <FaceCapture />}

      {/* <button
        onClick={() => {
          router.push("/result");
        }}
      >
        찰칵
      </button> */}
      {isInit ? "설정완료" : "설정미"}
      <button
        onClick={() => {
          setIsCameraVisible((prev) => !prev);
        }}
      >
        끄기
      </button>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100dvh;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

export default Capture;
