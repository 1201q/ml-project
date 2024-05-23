import Camera from "@/components/capture/Camera";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import styled from "styled-components";
import CapturedImageModal from "../modal/CapturedImageModal";
import { useAtom } from "jotai";
import { capturedImageAtom } from "@/context/atoms";
import Webcam from "react-webcam";

const CapturePage = () => {
  const webcamRef = useRef<Webcam>(null);
  const [score, setScore] = useState<number>(NaN);
  const [isTiltingFace, setIsTiltingFace] = useState(false);
  const [isImgConfirmModalOpen, setIsImgConfirmModalOpen] = useState(false);

  const [capturedImage, setCapturedImage] = useAtom(capturedImageAtom);

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

      setIsImgConfirmModalOpen(true);
    }

    // const response = await fetch("/api/detect-face", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ image: imgSrc }),
    // });

    // const data = await response.json();

    // console.log(data.image);
  };

  const getIndicatorBg = (score: number, isTiltingFace: boolean): string => {
    if (isTiltingFace) {
      return "rgba(240, 68, 82, 0.8)";
    } else {
      if (Number.isNaN(score)) {
        return "rgba(240, 68, 82, 0.8)";
      } else if (score < 80) {
        return "rgba(49, 130, 246, 0.8)";
      } else {
        return "rgba(49, 130, 246, 1)";
      }
    }
  };

  return (
    <Container>
      <Camera
        webcamRef={webcamRef}
        setScore={setScore}
        setIsTiltingFace={setIsTiltingFace}
        isStop={isImgConfirmModalOpen}
      />
      <ControllerContainer>
        <StorageBtn
          whileTap={{ scale: 0.95, backgroundColor: "#8080807e" }}
          whileHover={{ backgroundColor: "#8080807e" }}
        >
          기존 이미지를 가져올게요
        </StorageBtn>

        <CaptureBtnContainer>
          <CaptureButton onClick={onCapture} whileTap={{ scale: 0.9 }} />
        </CaptureBtnContainer>
      </ControllerContainer>
      <PercentIndicator bg={getIndicatorBg(score, isTiltingFace)}>
        {isTiltingFace
          ? "얼굴이 기울어졌어요"
          : score
          ? `얼굴일 확률 ${score.toFixed()}%`
          : "얼굴을 인식할 수 없어요"}
      </PercentIndicator>
      <AnimatePresence>
        {isImgConfirmModalOpen && (
          <CapturedImageModal setIsOpen={setIsImgConfirmModalOpen} />
        )}
      </AnimatePresence>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: black;
`;

const ControllerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 180px;
  background-color: black;
`;

const StorageBtn = styled(motion.button)`
  font-size: 15px;
  color: #808080;
  z-index: 100;
  padding: 5px 10px;
  border-radius: 7px;
  margin-top: 17px;
  cursor: pointer;
`;

const CaptureButton = styled(motion.button)`
  width: 50px;
  height: 50px;
  background-color: white;
  border-radius: 50%;
`;

const CaptureBtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background-color: gray;
  border-radius: 50%;
  margin-top: 15px;
`;

const PercentIndicator = styled.div<{ bg: string }>`
  position: absolute;
  top: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 10px;
  max-width: 140px;
  height: 25px;
  background-color: ${(props) => props.bg};
  border-radius: 7px;
  font-size: 12px;
  font-weight: 400;
  color: white;
  z-index: 100;
  left: 50%;
  transform: translateX(-50%);
`;

export default CapturePage;
