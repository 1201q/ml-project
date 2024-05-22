import React, { useState, useRef, useEffect } from "react";
import * as faceapi from "face-api.js";
import styled from "styled-components";

const FaceCapture = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const recogBoxRef = useRef<HTMLCanvasElement>(null);

  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

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
          setVideoStream(stream);
          console.log(stream);
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

      const timer = setInterval(async () => {
        console.log("타이머");
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
          faceapi.draw.drawFaceLandmarks(recogBox, resizedDetections);
        }
      }, 100);

      setTimer(timer);
    }
  };

  useEffect(() => {
    getUserVideo();
  }, []);

  useEffect(() => {
    return () => {
      if (timer && videoStream) {
        clearInterval(timer);
        videoStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [videoStream, timer]);

  return (
    <Container>
      <CaptureContainer>
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
      </CaptureContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  position: relative;

  @media screen and (max-width: 500px) {
    width: calc(100% - 32px);
    margin: 0px 16px;
  }
`;

const Video = styled.video`
  width: 100%;
  max-width: 640px;
  border-radius: 13px;
`;

const CaptureContainer = styled.div`
  width: 100%;
  max-width: 640px;

  position: relative;
`;

export default FaceCapture;
