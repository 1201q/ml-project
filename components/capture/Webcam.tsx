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
}

const WebcamComponent: React.FC<VideoPropsType> = ({
  setIsReadyCamera,
  webcamRef,
}) => {
  const [score, setScore] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    intervalRef.current = setInterval(detectFace, 100);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const detectFace = () => {
    const cameraRef = webcamRef.current?.video;

    const detectionPromise: any = faceapi.detectSingleFace(
      cameraRef as faceapi.TNetInput,
      new faceapi.TinyFaceDetectorOptions()
    );

    if (cameraRef) {
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
        onCanPlay={() => setIsReadyCamera(true)}
      />
      <ViewFinder>
        <ViewfinderIcon />
      </ViewFinder>
      <p style={{ position: "absolute", top: 0, color: "white" }}>
        {score ? `${score.toFixed()}%` : "없음"}
      </p>
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
    fill: #808080;
    z-index: 100;
    margin-bottom: 50px;
  }
`;

export default WebcamComponent;
