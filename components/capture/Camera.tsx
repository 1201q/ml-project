import useSize from "@/utils/useSize";
import { Dispatch, RefObject, SetStateAction, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import styled from "styled-components";
import useDetectWebcamFace from "./hooks/useDetectWebcamFace";
import { DetectBoxDataType, SetState } from "@/types/types";
import Image from "next/image";
import ViewFiner from "@/public/viewfinder.svg";

interface CameraPropsType {
  webcamRef: RefObject<Webcam>;
  setScore: SetState<number>;
  setIsTiltingFace: SetState<boolean>;
  setIsLoaded: SetState<boolean>;
  isStop: boolean;
}

const CameraComponent: React.FC<CameraPropsType> = ({
  isStop,
  setScore,
  setIsTiltingFace,
  setIsLoaded,

  webcamRef,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isResizing, size } = useSize(containerRef);

  const cameraSize = {
    width: webcamRef.current?.video?.clientWidth,
    height: webcamRef.current?.video?.clientHeight,
  };

  useDetectWebcamFace(
    webcamRef,
    canvasRef,
    isStop,
    setScore,
    setIsTiltingFace,
    setIsLoaded
  );

  return (
    <Container ref={containerRef}>
      <BarContainer type={"top"}></BarContainer>
      {!isResizing && size && (
        <>
          <Webcam
            ref={webcamRef}
            width={size.width}
            style={{
              zIndex: 1,
              overflow: "hidden",
            }}
            screenshotQuality={1}
            screenshotFormat="image/jpeg"
            mirrored={true}
            videoConstraints={{
              facingMode: "user",
            }}
          />
          <Detector
            ref={canvasRef}
            width={cameraSize.width}
            height={cameraSize.height}
          />
          <ViewFiner />
        </>
      )}
      <BarContainer type={"bottom"}></BarContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100% - 180px);
  background-color: black;
  overflow: hidden;
  position: relative;

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50%;
    height: 50%;
    max-width: 300px;
    max-height: 300px;
    fill: white;
    z-index: 100;
    transform: translate(-50%, -50%);
  }
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
