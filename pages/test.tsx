import React, { useState, useRef, useEffect } from "react";
import * as faceapi from "face-api.js";
import styled from "styled-components";

function App() {
  // const videoRef = useRef(null);
  // const canvasRef = useRef(null);
  // const [isModelLoaded, setIsModelLoaded] = useState(false);
  // const [onoff, setOnOff] = useState(false);
  // const [expression, setExpression] = useState<any>(null);

  // useEffect(() => {
  //   const loadModels = async () => {
  //     await Promise.all([
  //       faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
  //       faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
  //       faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
  //       faceapi.nets.faceExpressionNet.loadFromUri("/models"),
  //       faceapi.nets.ageGenderNet.loadFromUri("/models"),
  //     ]);
  //     setIsModelLoaded(true);
  //   };

  //   loadModels();
  // }, []);

  // useEffect(() => {
  //   if (isModelLoaded && videoRef.current && canvasRef.current && onoff) {
  //     startVideo();
  //   }
  // }, [isModelLoaded, onoff]);

  // const startVideo = () => {
  //   navigator.mediaDevices
  //     .getUserMedia({ video: {} })
  //     .then((stream) => {
  //       videoRef.current.srcObject = stream;
  //     })
  //     .catch((err) => console.error("Error accessing webcam:", err));
  // };

  // const handleVideoOnPlay = () => {
  //   const video = videoRef.current;
  //   const canvas = canvasRef.current;
  //   const displaySize = { width: 640, height: 480 };
  //   faceapi.matchDimensions(canvas, displaySize);

  //   setInterval(async () => {
  //     const detections = await faceapi
  //       .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
  //       .withFaceLandmarks()
  //       .withFaceExpressions()
  //       .withAgeAndGender();
  //     const resizedDetections = faceapi.resizeResults(detections, displaySize);

  //     canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  //     faceapi.draw.drawDetections(canvas, resizedDetections);

  //     resizedDetections.forEach((result) => {
  //       const { age, gender, genderProbability } = result;
  //       new faceapi.draw.DrawTextField(
  //         [
  //           `${faceapi.utils.round(age, 0)} years`,
  //           `${gender} (${faceapi.utils.round(genderProbability)})`,
  //         ],
  //         result.detection.box.bottomLeft
  //       ).draw(canvas);
  //     });
  //     typeof resizedDetections[0]?.expressions === "object" &&
  //       setExpression(Object?.entries(resizedDetections[0]?.expressions));
  //   }, 100);
  // };

  return (
    <Container>
      {/* <Button
        onClick={() => {
          setOnOff((prev) => !prev);
        }}
      >
        온오프
      </Button>

      <VideoContainer>
        {onoff && (
          <>
            <Video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              onPlay={handleVideoOnPlay}
            />
            <Canvas
              ref={canvasRef}
              style={{ position: "absolute", top: 0, left: 0 }}
            />
          </>
        )}
      </VideoContainer> */}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100dvh;
`;

const Button = styled.button`
  position: fixed;
  top: 0;
  left: 0;
  width: 20px;
`;

const VideoContainer = styled.div``;

const Video = styled.video`
  position: relative;
`;

const Canvas = styled.canvas``;

const Status = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 120px;
  border: 1px solid black;
  font-size: 15px;
`;

export default App;
