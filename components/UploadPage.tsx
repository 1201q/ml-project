import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Header from "./Header";
import { PuffLoader } from "react-spinners";
import { detectedFaceImageAtom, uploadedImageAtom } from "@/context/atoms";
import { useAtom } from "jotai";
import dataURLtoBlob from "@/utils/blob";
import axios from "axios";
import NextImage from "next/image";
import Check from "@/public/check.svg";
import SelectGenderModal from "./SelectGenderModal";
import React from "react";

const StoragePage = () => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [uploadedImage, setUploadedImage] = useAtom(uploadedImageAtom);
  const [detectedFaceImage, setDetectedFaceImage] = useAtom(
    detectedFaceImageAtom
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isDetected, setIsDetected] = useState(false);
  const [detectedImages, setDetectedImages] = useState([]);

  const [selectImageIndex, setSelectImageIndex] = useState<null | number>(null);
  const [isNotSelectImage, setIsNotSelectImage] = useState(false);
  const [isGenderModalVisible, setIsGenderModalVisible] = useState(false);

  const extractFace = () => {
    const url = `${process.env.NEXT_PUBLIC_GCP_API_URL}/extract` as string;
    const formData = new FormData();

    if (uploadedImage && uploadedImage?.blob) {
      formData.append("file", uploadedImage.blob);
    } else if (uploadedImage) {
      const blob = dataURLtoBlob(uploadedImage?.src);
      formData.append("file", blob);
    }

    axios
      .post(url, formData)
      .then((res) => {
        if (res.data.faces) {
          const faces = res.data.faces.map((image: string) => {
            return "data:image/jpeg;base64," + image;
          });

          if (faces.length === 1) {
            setSelectImageIndex(0);
          }
          setIsDetected(true);
          setDetectedImages(faces);
        } else {
          setIsDetected(false);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsDetected(false);
        setIsLoading(false);
      });
  };

  const getImageFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setUploadedImage(null);
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
            blob: file,
          });
        };
        image.src = url;
      };
      reader.readAsDataURL(file);
    } else {
      setUploadedImage(null);
    }
  };

  const pushNextStage = () => {
    if (typeof selectImageIndex === "number") {
      setIsGenderModalVisible(true);
      setDetectedFaceImage({ src: detectedImages[selectImageIndex] });
    } else {
      setIsNotSelectImage(true);

      setTimeout(() => {
        setIsNotSelectImage(false);
      }, 2000);
    }
  };

  useEffect(() => {
    if (uploadedImage) {
      extractFace();
    } else {
      setSelectImageIndex(null);
      setIsDetected(false);
      setDetectedImages([]);
      setIsLoading(true);
      setUploadedImage(null);
    }
  }, [uploadedImage]);

  return (
    <Container ref={containerRef}>
      <Header currentMenu="이미지 업로드" />
      <ContentsContainer>
        <>
          {isLoading && (
            <TitleContainer
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <TitleText>이미지에서 얼굴을</TitleText>
              <TitleText>찾는 중이에요</TitleText>
            </TitleContainer>
          )}
          {!isLoading && !isDetected && (
            <TitleContainer
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <TitleText>이미지에서</TitleText>
              <TitleText>얼굴을 찾지 못했어요</TitleText>
            </TitleContainer>
          )}
          {!isLoading && isDetected && detectedImages.length === 1 && (
            <TitleContainer
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <TitleText>이미지에서</TitleText>
              <TitleText>얼굴을 찾았어요</TitleText>
            </TitleContainer>
          )}
          {!isLoading && isDetected && detectedImages.length > 1 && (
            <TitleContainer
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <TitleText>이미지 중에</TitleText>
              <TitleText>얼굴을 선택해주세요</TitleText>
            </TitleContainer>
          )}

          {isLoading && (
            <LoadingContainer>
              <PuffLoader
                loading={true}
                color="rgb(49,130,246)"
                speedMultiplier={1}
                size={170}
              />
            </LoadingContainer>
          )}
        </>
        <ImageContainer
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {detectedImages.map((item, index) => (
            <ImageRowItem
              key={`image-${index}`}
              onClick={() => {
                setSelectImageIndex(index);
              }}
              whileTap={{ scale: 0.95, backgroundColor: "#f2f4f6" }}
              whileHover={{ backgroundColor: "#f2f4f6" }}
            >
              <ImageHeader>
                <p>{index + 1}</p>
              </ImageHeader>
              <NextImage
                src={item}
                alt={`item-${index}`}
                width={60}
                height={60}
                style={{ borderRadius: "10px" }}
              />
              <CheckButton
                $ischeck={
                  typeof index === "number" && index === selectImageIndex
                }
              >
                <Check width={18} height={18} />
              </CheckButton>
            </ImageRowItem>
          ))}
        </ImageContainer>
      </ContentsContainer>
      <>
        {isNotSelectImage && (
          <SelectPlzPopup
            initial={{ y: 10 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.1 }}
          >
            이미지를 하나 선택해주세요
          </SelectPlzPopup>
        )}
        {!isLoading && (
          <ButtonContainer
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              bg={"#f2f4f6"}
              font={"gray"}
              whileTap={{ scale: 0.97 }}
              htmlFor="reupload"
            >
              다른 사진으로
              <input
                id="reupload"
                type="file"
                accept="image/*"
                onChange={(event) => {
                  getImageFile(event);
                }}
                style={{ display: "none" }}
              />
            </Button>
            {isDetected && (
              <NextStepButton
                $isselectimage={typeof selectImageIndex === "number"}
                onClick={() => {
                  !isNotSelectImage && pushNextStage();
                }}
                bg={"rgb(49, 130, 246)"}
                font={"white"}
                whileTap={{ scale: 0.97 }}
                whileHover={{ filter: "brightness(0.8)" }}
              >
                이 얼굴로 할게요
              </NextStepButton>
            )}
          </ButtonContainer>
        )}
      </>
      {isGenderModalVisible && <SelectGenderModal />}
    </Container>
  );
};
const Container = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ContentsContainer = styled.div`
  padding: 0px 20px;
  height: calc(100% - 170px);
`;
const TitleContainer = styled(motion.div)`
  margin-top: 20px;
`;
const TitleText = styled(motion.p)`
  font-size: 28px;
  font-weight: 700;
  line-height: 130%;
`;

const LoadingContainer = styled.div`
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
`;

const ImageContainer = styled(motion.div)`
  display: grid;
  max-height: calc(100% - 100px);
  grid-template-columns: 1fr 1fr;
  row-gap: 20px;
  column-gap: 10px;
  margin-top: 30px;
  overflow-y: scroll;
`;
const ImageRowItem = styled(motion.div)`
  display: flex;
  align-items: center;

  font-size: 15px;

  border-radius: 12px;
  cursor: pointer;
  height: 80px;
  padding: 0px 10px;
  background-color: white;
  position: relative;
`;

const ImageHeader = styled.div`
  display: flex;
  width: 30px;
  align-items: center;

  p {
    font-weight: 600;
    font-size: 17px;
    color: rgb(27, 100, 218);
  }
`;

const CheckButton = styled.button<{ $ischeck: boolean }>`
  position: absolute;
  right: 10px;

  svg {
    fill: ${(props) => (props.$ischeck ? "rgb(27, 100, 218)" : "lightgray")};
  }
`;

const ButtonContainer = styled(motion.div)`
  width: calc(100% - 40px);
  position: absolute;
  display: flex;
  margin: 0px 20px 20px 20px;
  gap: 15px;
  bottom: 0px;
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

const NextStepButton = styled(Button)<{ $isselectimage: boolean }>`
  opacity: ${(props) => (props.$isselectimage ? 1 : "0.4")};
  cursor: ${(props) => !props.$isselectimage && "not-allowed"};
`;

const SelectPlzPopup = styled(motion.div)`
  text-align: center;
  color: rgb(240, 68, 82);
`;

export default React.memo(StoragePage);
