import { uploadedImageAtom } from "@/context/atoms";
import { SetState } from "@/types/types";
import nextURLPush from "@/utils/nextURLPush";
import { motion } from "framer-motion";
import { useSetAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Controller = () => {
  const router = useRouter();
  const setUploadedImage = useSetAtom(uploadedImageAtom);

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
            blob: file,
          });
          nextURLPush(router, "/stage/upload");
        };
        image.src = url;
      };
      reader.readAsDataURL(file);
    } else {
      setUploadedImage(null);
    }
  };

  return (
    <Container>
      <ControllerBtnContainer>
        <StorageBtn
          whileTap={{ scale: 0.95, backgroundColor: "#8080807e" }}
          whileHover={{ backgroundColor: "#8080807e" }}
          htmlFor="file"
        >
          기존 이미지를 가져올게요
        </StorageBtn>
        <Input id="file" type="file" accept="image/*" onChange={getImageFile} />
      </ControllerBtnContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 190px;
  position: relative;
`;

const ControllerBtnContainer = styled(motion.button)`
  display: flex;
  margin-top: 20px;
  height: 32px;
  gap: 10px;
`;
const StorageBtn = styled(motion.label)`
  font-size: 15px;
  color: #808080;
  z-index: 100;
  padding: 7px 12px;
  border-radius: 10px;
  margin-top: 17px;
  cursor: pointer;
`;

const Input = styled.input`
  display: none;
`;

export default Controller;
