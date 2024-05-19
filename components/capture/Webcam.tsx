import { RefObject, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { SetState } from "@/types/types";
import * as faceapi from "face-api.js";

import styled from "styled-components";
import ViewfinderIcon from "@/public/viewfinder.svg";
import Error from "next/error";

interface VideoPropsType {
  setIsReadyCamera: SetState<boolean>;
  webcamRef: RefObject<Webcam>;
  isStop: boolean;
}

const WebcamComponent: React.FC<VideoPropsType> = ({
  setIsReadyCamera,
  webcamRef,
  isStop,
}) => {
  const [score, setScore] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout>();
  const viewFinderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isStop) {
      intervalRef.current = setInterval(detectFace, 150);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isStop]);

  const detectFace = () => {
    const cameraRef = webcamRef.current?.video;

    if (cameraRef) {
      const detectionPromise: any = faceapi.detectSingleFace(
        cameraRef as faceapi.TNetInput,
        new faceapi.TinyFaceDetectorOptions()
      );

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
            }
          } else {
            setScore(NaN);
          }
        })
        .catch((error: Error) => {
          console.error(error);
        });
    }
  };

  return (
    <>
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
      <ViewFinder ref={viewFinderRef}>
        <ViewfinderIcon />
      </ViewFinder>

      <TopContainer>
        <Percent>
          {score
            ? `얼굴일 확률 ${score.toFixed()}%`
            : "얼굴을 인식할 수 없어요"}
        </Percent>
      </TopContainer>
    </>
  );
};

const ViewFinder = styled.div`
  position: absolute;

  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 70%;
    height: 70%;
    fill: #ffffff4e;
    z-index: 100;
    margin-bottom: 50px;
  }
`;

const TopContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  width: 100%;
  height: 55px;
  background-color: black;
`;

const Percent = styled.div`
  position: absolute;
  top: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 10px;
  max-width: 140px;
  height: 25px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 7px;
  font-size: 12px;
  font-weight: 400;
  color: white;
`;

export default WebcamComponent;
