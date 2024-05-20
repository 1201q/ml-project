import useSize from "@/utils/useSize";
import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import styled from "styled-components";
import * as faceapi from "face-api.js";

const CameraComponent = ({ isStop = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const intervalRef = useRef<NodeJS.Timeout>();
  const { isResizing, size } = useSize(containerRef);
  const [isPlayPossible, setIsPlayPossible] = useState(false);
  const [score, setScore] = useState(0);
  const [isInit, setIsInit] = useState(false);

  const cameraSize = {
    width: webcamRef.current?.video?.clientWidth,
    height: webcamRef.current?.video?.clientHeight,
  };

  const init = async () => {
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      // faceapi.nets.faceLandmark68TinyNet.loadFromUri("/models"),
      // faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      // faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      // faceapi.nets.faceExpressionNet.loadFromUri("/models"),
      // faceapi.nets.ageGenderNet.loadFromUri("/models"),
    ]);
    setIsInit(true);
  };

  useEffect(() => {
    init();
  }, []);

  const detectFace = () => {
    const cameraRef = webcamRef.current?.video;
    const detecterRef = canvasRef.current;

    if (cameraRef && detecterRef) {
      const detectionPromise: any = faceapi.detectSingleFace(
        cameraRef as faceapi.TNetInput,
        new faceapi.TinyFaceDetectorOptions()
      );

      const displaySize = {
        width: cameraRef.clientWidth,
        height: cameraRef.clientHeight,
      };

      detectionPromise
        .then((detections: faceapi.FaceDetection) => {
          if (detections) {
            const box = detections?.box;
            if (
              box &&
              box.x !== null &&
              box.y !== null &&
              box.width !== null &&
              box.height !== null
            ) {
              setScore(detections?.score * 100);

              const resizedDetections = faceapi.resizeResults(
                detections,
                displaySize
              );
              const context = detecterRef.getContext("2d");

              if (context) {
                context.clearRect(0, 0, detecterRef.width, detecterRef.height);
                const drawBox = new faceapi.draw.DrawBox(resizedDetections.box);
                drawBox.draw(detecterRef);
              }
            }
          } else {
            const context = detecterRef.getContext("2d");
            if (context) {
              context.clearRect(0, 0, detecterRef.width, detecterRef.height);
            }
            setScore(NaN);
          }
        })
        .catch((error: Error) => {
          console.error(error);
        });
    }
  };

  useEffect(() => {
    if (!isStop && isInit) {
      intervalRef.current = setInterval(detectFace, 100);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isStop, isInit]);

  return (
    <Container ref={containerRef}>
      <BarContainer type={"top"}>{score}</BarContainer>
      {!isResizing && size && (
        <>
          <Webcam
            ref={webcamRef}
            width={size.width}
            style={{
              zIndex: 1,
              overflow: "hidden",
            }}
            mirrored={true}
            videoConstraints={{
              facingMode: "user",
            }}
            onCanPlay={() => setIsPlayPossible(true)}
          />
          <Detector
            ref={canvasRef}
            width={cameraSize.width}
            height={cameraSize.height}
          />
        </>
      )}
      <BarContainer type={"bottom"}>
        width:{size?.width} / height:{size?.height}
      </BarContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100% - 180px);
  background-color: green;
  overflow: hidden;
  position: relative;
`;

const BarContainer = styled.div<{ type: "top" | "bottom" }>`
  position: absolute;
  width: 100%;
  height: 50px;
  background-color: black;
  color: white;
  z-index: 100;

  ${(props) => (props.type === "top" ? "top : 0" : "bottom:0")}
`;

const Detector = styled.canvas`
  position: absolute;

  left: 0;
  z-index: 2;
  transform: scaleX(-1);
`;

export default CameraComponent;
