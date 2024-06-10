import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import styled from "styled-components";
import useDetectCamera from "./hooks/useDetectCamera";
import { capturedImageAtom } from "@/context/atoms";
import { useAtom } from "jotai";
import { SetState, SizeType } from "@/types/types";

const Camera = ({
  size,
  setIsResultVisible,
  selectDevice,
  isMirrored,
}: {
  size: SizeType;
  setIsResultVisible: SetState<boolean>;
  selectDevice: MediaDeviceInfo | undefined;
  isMirrored: boolean;
}) => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [capturedImage, setCapturedImage] = useAtom(capturedImageAtom);
  const [isStop, setIsStop] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);

  const cameraSize = {
    width: webcamRef.current?.video?.clientWidth,
    height: webcamRef.current?.video?.clientHeight,
  };

  const onCapture = async () => {
    const imgSrc = webcamRef.current?.getScreenshot();

    const { clientWidth, clientHeight } = webcamRef.current
      ?.video as HTMLVideoElement;

    if (imgSrc) {
      setCapturedImage({
        src: imgSrc,
        width: clientWidth,
        height: clientHeight,
      });
      setIsStop(true);
      setIsResultVisible(true);
    }
  };

  useDetectCamera({
    webcamRef,
    canvasRef,
    isStop,
  });

  return (
    <>
      <motion.div layoutId="camera">
        <Webcam
          ref={webcamRef}
          width={size.width}
          style={{
            zIndex: 1,
            overflow: "hidden",
          }}
          screenshotQuality={1}
          screenshotFormat="image/jpeg"
          mirrored={isMirrored}
          videoConstraints={
            !selectDevice
              ? {
                  facingMode: "user",
                }
              : { deviceId: selectDevice.deviceId }
          }
          onCanPlay={() => {
            setIsCameraReady(true);
          }}
        />
        {isCameraReady && (
          <Canvas
            isMirrored={isMirrored}
            ref={canvasRef}
            width={cameraSize.width}
            height={cameraSize.height}
          />
        )}
      </motion.div>

      <CaptureBtnContainer>
        <CaptureButton
          onClick={() => {
            onCapture();
          }}
          whileTap={{ scale: 0.85 }}
        />
      </CaptureBtnContainer>
    </>
  );
};

const CaptureBtnContainer = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background-color: gray;
  border-radius: 50%;
  margin-top: 15px;
  z-index: 100;
  bottom: 50px;
`;

const CaptureButton = styled(motion.button)`
  width: 50px;
  height: 50px;
  background-color: white;
  border-radius: 50%;
`;
const Canvas = styled.canvas<{ isMirrored: boolean }>`
  position: absolute;
  left: 0;
  z-index: 2;
  transform: ${(props) => (props.isMirrored ? "scaleX(-1)" : "none")};
`;

export default Camera;
