import Header from "@/components/Header";
import {
  detectedFaceDataAtom,
  detectedFaceImageAtom,
  imgSizeAtom,
  imgSrcAtom,
  uploadedImageAtom,
} from "@/context/atoms";
import { motion } from "framer-motion";
import { useAtom, useAtomValue } from "jotai";
import NextImage from "next/image";
import {
  ChangeEvent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import * as faceapi from "face-api.js";
import { loadImage } from "canvas";
import * as canvas from "canvas";
import nextURLPush from "@/utils/nextURLPush";
import { useRouter } from "next/router";
const DISPLAY_SIDE_MARGIN = 40;
const DISPLAY_TOPBOTTOM_MARGIN = 60 + 75;

const UploadPage = () => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const uploadedImageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isTooBigImage, setIsTooBigImage] = useState(false);
  const [isDetectedFace, setIsDetectedFace] = useState(false);
  const [isDetectedMultipleFace, setIsDetectedMultipleFace] = useState(false);

  const [uploadedImage, setUploadedImage] = useAtom(uploadedImageAtom);
  const [detectedFaceImage, setDetectedFaceImage] = useAtom(
    detectedFaceImageAtom
  );

  const [detectedFaceData, setDetectedFaceData] = useAtom(detectedFaceDataAtom);

  const detect = async () => {
    const imageRef = uploadedImageRef.current;
    const detecterRef = canvasRef.current;

    if (imageRef && detecterRef) {
      const displaySize = {
        width: imageRef.clientWidth,
        height: imageRef.clientHeight,
      };

      try {
        const detections = await faceapi.detectAllFaces(
          imageRef as faceapi.TNetInput,
          new faceapi.TinyFaceDetectorOptions()
        );

        if (detections && detections.length > 1) {
          setIsDetectedMultipleFace(true);
        } else if (detections && detections.length === 1) {
          const box = detections[0].box;
          setDetectedFaceData(detections[0]);
          getCroppedFace(box);
          const resizedDetection: faceapi.FaceDetection = faceapi.resizeResults(
            detections[0],
            displaySize
          );
          const context = detecterRef.getContext("2d");
          if (context) {
            context.clearRect(0, 0, detecterRef.width, detecterRef.height);
            const drawBox = new faceapi.draw.DrawBox(resizedDetection.box, {
              lineWidth: 2,
              boxColor: "blue",
            });
            drawBox.draw(detecterRef);
            setIsDetectedFace(true);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getImageFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const image = new Image();
        const url = e.target?.result as string;
        image.onload = () => {
          setUploadedImage({
            src: url,
            width: image.width,
            height: image.height,
          });
        };
        image.src = url;
      };
      reader.readAsDataURL(file);
    } else {
      setUploadedImage(undefined);
    }
  };

  const getCroppedFace = async (faceBox: faceapi.Box) => {
    if (uploadedImage?.src) {
      const img = await loadImage(uploadedImage?.src);
      const { x, y, width, height } = faceBox;
      const faceCanvas = canvas.createCanvas(width, height);
      const ctx = faceCanvas.getContext("2d");
      ctx.drawImage(img, x, y, width, height, 0, 0, width, height);
      const croppedImage = faceCanvas.toDataURL();

      if (croppedImage) {
        setDetectedFaceImage({
          src: croppedImage,
          width: width,
          height: height,
          x: x,
          y: y,
        });
      }
    }
  };

  useEffect(() => {
    if (containerRef.current && uploadedImage) {
      const { clientWidth, clientHeight } = containerRef?.current;

      if (
        uploadedImage.width > clientWidth - DISPLAY_SIDE_MARGIN ||
        uploadedImage.height > clientHeight - DISPLAY_TOPBOTTOM_MARGIN
      ) {
        setIsTooBigImage(true);
      } else {
        setIsTooBigImage(false);
      }
    } else {
      setIsDetectedFace(false);
      setIsDetectedMultipleFace(false);
    }
  }, [uploadedImage]);

  return (
    <Container ref={containerRef}>
      <Header currentMenu="이미지 업로드" />
      {uploadedImage && (
        <ContentsContainer ratio={uploadedImage?.width / uploadedImage?.height}>
          <ImageContainer
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            ratio={uploadedImage?.width / uploadedImage?.height}
          >
            <NextImage
              ref={uploadedImageRef}
              src={uploadedImage}
              alt="uploadedImage"
              fill={isTooBigImage}
              style={{ borderRadius: "12px" }}
              onLoad={() => {
                const imageRef = uploadedImageRef.current;
                const canvas = canvasRef.current;
                if (canvas && imageRef) {
                  canvas.width = imageRef.clientWidth;
                  canvas.height = imageRef.clientHeight;
                  detect();
                }
              }}
            />
            <canvas
              ref={canvasRef}
              style={{
                position: "absolute",
                zIndex: 10000,
              }}
            />
          </ImageContainer>
        </ContentsContainer>
      )}
      {isDetectedFace && (
        <BottomContainer
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <SubMenuContainer>
            <p>이미지 직접 자르기</p>
          </SubMenuContainer>
          <ButtonContainer>
            <Button
              bg={"#f2f4f6"}
              font={"gray"}
              whileTap={{ scale: 0.97 }}
              htmlFor="reupload"
            >
              다른 사진으로 할래요
              <input
                id="reupload"
                type="file"
                accept="image/*"
                onChange={(event) => {
                  setUploadedImage(undefined);
                  getImageFile(event);
                }}
                style={{ display: "none" }}
              />
            </Button>
            <Button
              onClick={() => {
                nextURLPush(router, "/stage/gender");
              }}
              bg={"rgb(49, 130, 246)"}
              font={"white"}
              whileTap={{ scale: 0.97 }}
              whileHover={{ filter: "brightness(0.8)" }}
            >
              이 얼굴로 할게요
            </Button>
          </ButtonContainer>
        </BottomContainer>
      )}
      {!isDetectedFace && (
        <BottomContainer
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <SubMenuContainer>
            <p>이미지 직접 자르기</p>
          </SubMenuContainer>
          <ButtonContainer>
            <Button
              onClick={() => {}}
              bg={"#f2f4f6"}
              font={"gray"}
              whileTap={{ scale: 0.97 }}
              htmlFor="reupload2"
            >
              얼굴을 인식하지 못했어요
              <input
                id="reupload2"
                type="file"
                accept="image/*"
                onChange={(event) => {
                  setUploadedImage(undefined);
                  getImageFile(event);
                }}
                style={{ display: "none" }}
              />
            </Button>
          </ButtonContainer>
        </BottomContainer>
      )}
      {isDetectedMultipleFace && (
        <BottomContainer
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <SubMenuContainer>
            <p>이미지 직접 자르기</p>
          </SubMenuContainer>
          <ButtonContainer>
            <Button
              onClick={() => {}}
              bg={"#f2f4f6"}
              font={"gray"}
              whileTap={{ scale: 0.97 }}
              htmlFor="reupload3"
            >
              한명까지만 인식할 수 있어요
              <input
                id="reupload3"
                type="file"
                accept="image/*"
                onChange={(event) => {
                  setUploadedImage(undefined);
                  getImageFile(event);
                }}
                style={{ display: "none" }}
              />
            </Button>
          </ButtonContainer>
        </BottomContainer>
      )}
    </Container>
  );
};

const Container = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const ContentsContainer = styled.div<{ ratio: number }>`
  aspect-ratio: ${(props) => props.ratio};
  display: flex;
  justify-content: center;
  padding: 20px 20px;
  max-height: calc(100% - 255px);

  @media screen and (max-width: 450px) {
    max-height: calc(100% - 225px);
  }
`;

const ImageContainer = styled(motion.div)<{ ratio: number }>`
  display: flex;
  justify-content: center;
  aspect-ratio: ${(props) => props.ratio};
  max-width: 100%;
  max-height: 100%;
  overflow: hidden;
  position: relative;
`;

const BottomContainer = styled(motion.div)`
  position: absolute;
  width: 100%;
  bottom: 0;

  display: flex;
  flex-direction: column;
  background-color: white;
`;

const SubMenuContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 38px;

  p {
    font-size: 16px;

    color: #808080;
    border-radius: 7px;
    cursor: pointer;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  margin: 0px 20px 20px 20px;
  gap: 15px;
`;
const Button = styled(motion.label)<{ bg: string; font: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 55px;
  border-radius: 15px;
  background-color: ${(props) => props.bg};
  color: ${(props) => props.font};
  font-size: 17px;
  font-weight: 600;
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
`;

export default UploadPage;
