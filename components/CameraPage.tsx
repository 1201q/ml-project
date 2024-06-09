import styled from "styled-components";
import useSize from "@/utils/useSize";
import { useRef, useState } from "react";
import Controller from "./Controller";
import Camera from "./Camera";

import { motion } from "framer-motion";
import DetectedResult from "./DetectedResult";
import DetectIndicator from "./DetectIndicator";
import SelectGenderModal from "./SelectGenderModal";
import React from "react";

const CameraPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isResizing, size } = useSize(containerRef);

  const [isResultVisible, setIsResultVisible] = useState(false);
  const [isFaceDetected, setIsFaceDetected] = useState(false);
  const [isServerFaceDetected, setIsServerFaceDetected] = useState<
    boolean | "loading"
  >("loading");
  const [isGenderModalVisible, setIsGenderModalVisible] = useState(false);

  return (
    <Container>
      <CameraContainer ref={containerRef}>
        {!isResizing && size && !isResultVisible && (
          <Camera size={size} setIsResultVisible={setIsResultVisible} />
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
