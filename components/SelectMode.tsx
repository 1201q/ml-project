import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";

const SelectMode = () => {
  const router = useRouter();
  const [isCamHover, setIsCamHover] = useState(false);
  const [isFileHover, setIsFileHover] = useState(false);

  return (
    <Container>
      <LandingText
        initial={{ opacity: 0, y: 70 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: "easeInOut", duration: 0.2 }}
      >
        모드를 선택해주세요
      </LandingText>

      <SelectContainer
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.2,
          duration: 0.2,
          ease: "easeInOut",
        }}
      >
        <Select
          whileTap={{ scale: 0.95 }}
          bg={"#f7eeac"}
          onClick={() => router.push("/capture")}
          onHoverStart={() => {
            setIsCamHover(true);
          }}
          onHoverEnd={() => {
            setIsCamHover(false);
          }}
          isOppositeHover={isFileHover}
        >
          <SelectHeader>이미지를 촬영할게요</SelectHeader>
          <Image
            src={require("@/public/Camera.png")}
            alt="Camera"
            width={400}
            height={400}
            quality={100}
            draggable={false}
            style={{ marginTop: "30px", userSelect: "none" }}
          />
        </Select>
        <Select
          onHoverStart={() => {
            setIsFileHover(true);
          }}
          onHoverEnd={() => {
            setIsFileHover(false);
          }}
          whileTap={{ scale: 0.95 }}
          bg={"#cfddfe"}
          isOppositeHover={isCamHover}
        >
          <SelectHeader>기존의 이미지를 가져올게요</SelectHeader>
          <Image
            src={require("@/public/folder.png")}
            alt="folder"
            width={370}
            height={370}
            quality={100}
            draggable={false}
            style={{ marginTop: "50px", userSelect: "none" }}
          />
        </Select>
      </SelectContainer>
    </Container>
  );
};

const Container = styled(motion.div)`
  height: 100%;
  z-index: 100;
  padding: 0px 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fefdff;

  @media screen and (max-width: 768px) {
    padding: 0px 20px;
  }
`;

const SelectContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 60px;
  width: 100%;
  height: 450px;
  z-index: 100;

  @media screen and (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;

const Select = styled(motion.div)<{ bg: string; isOppositeHover: boolean }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.bg};
  border-radius: 17px;
  overflow: hidden;
  position: relative;
  box-shadow: inset 0 -1px 0 0 rgba(47, 43, 67, 0.1),
    0 1px 3px 0 rgba(47, 43, 67, 0.1);

  opacity: ${(props) => (props.isOppositeHover ? "0.4" : "1")};
  transition-property: opacity;
  transition-duration: 0.2s;

  img {
    transform: ${(props) =>
      props.isOppositeHover ? "scale(0.8)" : "scale(1)"};
    transition-duration: 0.2s;
  }

  @media screen and (max-width: 1024px) {
    height: 180px;
    position: relative;
    img {
      margin-bottom: -70px;
      margin-left: 220px;
      width: 280px;
      height: 280px;
    }
  }
`;

const SelectHeader = styled.p`
  position: absolute;
  left: 30px;
  top: 30px;
  font-size: 34px;
  font-weight: 700;
  z-index: 100;

  @media screen and (max-width: 1024px) {
    font-size: 25px;
  }
`;

const LandingText = styled(motion.p)`
  font-size: 55px;
  font-weight: 700;
  color: black;
  line-height: 120%;
  letter-spacing: -2px;
  margin-bottom: 50px;
  text-align: center;
  white-space: nowrap;
  z-index: 100;

  @media screen and (max-width: 768px) {
    font-size: 45px;
  }

  @media screen and (max-width: 500px) {
    font-size: 38px;
    white-space: pre-line;
  }
`;

export default SelectMode;
