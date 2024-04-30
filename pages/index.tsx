import CurrentStage from "@/components/CurrentStage";
import Header from "@/components/Header";

import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import styled from "styled-components";

function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const recogBoxRef = useRef<HTMLCanvasElement>(null);

  const [isInit, setIsInit] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);

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

  const getUserVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then((stream) => {
        let video = videoRef.current;

        if (video) {
          video.srcObject = stream;
          video.play();
          setIsVideoReady(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onVideoPlay = () => {
    if (videoRef.current && recogBoxRef.current) {
      const video = videoRef.current as faceapi.TNetInput;
      const recogBox = recogBoxRef.current;
      const displaySize = {
        width: videoRef.current.clientWidth,
        height: videoRef.current.clientHeight,
      };

      faceapi.matchDimensions(recogBox, displaySize);

      setInterval(async () => {
        const detections = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks();

        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );

        const context = recogBox.getContext("2d");

        if (context) {
          context.clearRect(0, 0, recogBox.width, recogBox.height);
          faceapi.draw.drawDetections(recogBox, resizedDetections);
        }
      }, 200);
    }
  };

  useEffect(() => {
    getUserVideo();
    init();
  }, [videoRef]);

  return (
    <Container>
      <Header />
      <CurrentStage />
      <VideoContainer>
        <VideoBox>
          <Video
            autoPlay
            playsInline
            muted
            ref={videoRef}
            onCanPlay={onVideoPlay}
          />

          <canvas
            ref={recogBoxRef}
            style={{ position: "absolute", top: 0, left: 0 }}
          />
        </VideoBox>
      </VideoContainer>
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

const Video = styled.video`
  width: 100%;
  max-width: 640px;
  border-radius: 13px;
`;

const VideoBox = styled.div`
  width: 100%;
  max-width: 640px;

  position: relative;
`;

const VideoContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  position: relative;

  @media screen and (max-width: 500px) {
    width: calc(100% - 32px);
    margin: 0px 16px;
  }
`;

export default Home;
