import Camera from "@/components/capture/Camera";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ImageConfirmModal from "../modal/ImageConfirmModal";
import { useAtom } from "jotai";
import { imgSizeAtom, imgSrcAtom } from "@/context/atoms";
import Webcam from "react-webcam";
import nextURLPush from "@/utils/nextURLPush";
import { useRouter } from "next/router";
import { SizeType } from "@/types/types";

const CapturePage = () => {
  const router = useRouter();
  const webcamRef = useRef<Webcam>(null);
  const [score, setScore] = useState<number>(NaN);
  const [isImgConfirmModalOpen, setIsImgConfirmModalOpen] = useState(false);
  const [imgSrc, setImgSrc] = useAtom(imgSrcAtom);
  const [imgSize, setImgSize] = useAtom(imgSizeAtom);

  const onCapture = () => {
    const img = webcamRef.current?.getScreenshot();

    const size = {
      width: webcamRef.current?.video?.clientWidth,
      height: webcamRef.current?.video?.clientHeight,
    } as SizeType;

    if (img && size) {
      setImgSize(size);
      setImgSrc(img);
    }
  };

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null && e.target.files.length >= 1) {
      const file = e.target.files[0];

      let reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = function (e) {
        const image = new Image();
        image.src = e.target?.result as string;

        image.onload = function () {
          const width = image.width;
          const height = image.height;
          console.log(width, height);

          if (image) {
            setImgSrc(image.src);
            setImgSize({
              width: width,
              height: height,
            });
            // nextURLPush(router, "/select_image/upload");
          }
        };
      };
    }
  };

  useEffect(() => {
    if (imgSrc) {
      setIsImgConfirmModalOpen(true);
    }
  }, [imgSrc]);

  useEffect(() => {
    setImgSrc(null);
    setImgSize(null);
    setIsImgConfirmModalOpen(false);
  }, []);

  const getIndicatorBg = (score: number): string => {
    if (Number.isNaN(score)) {
      return "rgba(240, 68, 82, 0.8)";
    } else if (score < 80) {
      return "rgba(49, 130, 246, 0.8)";
    } else {
      return "rgba(49, 130, 246, 1)";
    }
  };

  return (
    <Container>
      <Camera
        webcamRef={webcamRef}
        setScore={setScore}
        isStop={isImgConfirmModalOpen}
      />
      <ControllerContainer>
        <StorageBtn
          whileTap={{ scale: 0.95, backgroundColor: "#8080807e" }}
          whileHover={{ backgroundColor: "#8080807e" }}
          htmlFor="file"
        >
          <FileInput
            id="file"
            type="file"
            accept="image/*"
            onChange={onUpload}
          />
          기존 이미지를 가져올게요
        </StorageBtn>

        <CaptureBtnContainer>
          <CaptureButton onClick={onCapture} whileTap={{ scale: 0.9 }} />
        </CaptureBtnContainer>
      </ControllerContainer>
      <PercentIndicator bg={getIndicatorBg(score)}>
        {score ? `얼굴일 확률 ${score.toFixed()}%` : "얼굴을 인식할 수 없어요"}
      </PercentIndicator>
      <AnimatePresence>
        {isImgConfirmModalOpen && (
          <ImageConfirmModal setIsOpen={setIsImgConfirmModalOpen} />
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

const StorageBtn = styled(motion.label)`
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

const FileInput = styled.input`
  display: none;
`;
export default CapturePage;
