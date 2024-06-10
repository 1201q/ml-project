import styled from "styled-components";
import useSize from "@/utils/useSize";
import { useEffect, useRef, useState } from "react";
import Controller from "./Controller";
import Camera from "./Camera";

import { motion } from "framer-motion";
import DetectedResult from "./DetectedResult";
import DetectIndicator from "./DetectIndicator";
import SelectGenderModal from "./SelectGenderModal";
import React from "react";
import CameraSetting from "./CameraSetting";

const CameraPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isResizing, size } = useSize(containerRef);

  const [isCameraVisible, setIsCameraVisible] = useState(false); // 카메라 세팅 모달에 따라 visible 결정
  const [isResultVisible, setIsResultVisible] = useState(false);
  const [isFaceDetected, setIsFaceDetected] = useState(false);
  const [isServerFaceDetected, setIsServerFaceDetected] = useState<
    boolean | "loading"
  >("loading");
  const [isGenderModalVisible, setIsGenderModalVisible] = useState(false);
  const [isCameraSettingModalOpen, setIsCameraSettingModalOpen] =
    useState(false);

  const [selectDevice, setSelectDevice] = useState<
    MediaDeviceInfo | undefined
  >();
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [isMirrored, setIsMirrored] = useState(true);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((mediaDevices) => {
      const devices = mediaDevices.filter(
        (media) => media.kind === "videoinput"
      );
      setDevices(devices);
    });
  }, [setDevices, setSelectDevice]);

  useEffect(() => {
    if (isCameraSettingModalOpen) {
      setIsCameraVisible(false);
    } else {
      setIsCameraVisible(true);
    }
  }, [isCameraSettingModalOpen]);

  return (
    <Container>
      <CameraContainer ref={containerRef}>
        {isCameraVisible && !isResizing && size && !isResultVisible && (
          <Camera
            size={size}
            setIsResultVisible={setIsResultVisible}
            selectDevice={selectDevice}
            isMirrored={isMirrored}
          />
        )}
        {!isResizing && size && isResultVisible && (
          <DetectedResult
            setIsFaceDetected={setIsFaceDetected}
            setIsServerFaceDetected={setIsServerFaceDetected}
          />
        )}

        {isResultVisible && !isServerFaceDetected && <IsNotDetectedContainer />}
        {isResultVisible && (
          <DetectIndicator
            isFaceDetected={isFaceDetected}
            isServerFaceDetected={isServerFaceDetected}
          />
        )}
        {!isResizing && size && !isResultVisible && (
          <CameraSetting
            setIsCameraSettingModalOpen={setIsCameraSettingModalOpen}
            isCameraSettingModalOpen={isCameraSettingModalOpen}
            devices={devices}
            selectDevice={selectDevice}
            setSelectDevice={setSelectDevice}
            setIsMirrored={setIsMirrored}
            isMirrored={isMirrored}
          />
        )}
      </CameraContainer>
      {!isResultVisible && <Controller />}
      <>
        {isResultVisible &&
          isServerFaceDetected !== "loading" &&
          isFaceDetected &&
          isServerFaceDetected && (
            <ButtonContainer
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <Button
                onClick={() => {
                  setIsResultVisible(false);
                }}
                bg={"#f2f4f6"}
                font={"gray"}
                whileTap={{ scale: 0.97 }}
              >
                다시 찍을게요
              </Button>
              <Button
                bg={"rgb(49, 130, 246)"}
                font={"white"}
                whileTap={{ scale: 0.97 }}
                whileHover={{ filter: "brightness(0.8)" }}
                onClick={() => {
                  setIsGenderModalVisible(true);
                }}
              >
                이 얼굴로 할게요
              </Button>
            </ButtonContainer>
          )}
        {isResultVisible &&
          isServerFaceDetected !== "loading" &&
          (!isFaceDetected || !isServerFaceDetected) && (
            <ButtonContainer
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <Button
                onClick={() => {
                  setIsResultVisible(false);
                }}
                bg={"#f2f4f6"}
                font={"gray"}
                whileTap={{ scale: 0.97 }}
              >
                다시 찍어주세요
              </Button>
            </ButtonContainer>
          )}
      </>
      {isGenderModalVisible && <SelectGenderModal />}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: black;
`;

const IsNotDetectedContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 300;
`;

const CameraContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100% - 190px);

  background-color: black;
  overflow: hidden;
  position: relative;
`;
const ButtonContainer = styled(motion.div)`
  position: absolute;
  width: calc(100% - 40px);
  bottom: 0;
  margin: 0px 20px 20px 20px;
  display: flex;
  gap: 15px;
`;
const Button = styled(motion.button)<{ bg: string; font: string }>`
  width: 100%;
  height: 55px;
  border-radius: 15px;
  background-color: ${(props) => props.bg};
  color: ${(props) => props.font};
  font-size: 17px;
  font-weight: 600;
  -webkit-tap-highlight-color: transparent;
`;

export default React.memo(CameraPage);
