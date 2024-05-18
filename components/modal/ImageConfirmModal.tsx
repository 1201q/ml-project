import { imgSizeAtom } from "@/context/atoms";
import { motion } from "framer-motion";
import { useSetAtom } from "jotai";
import Image from "next/image";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useRef } from "react";
import styled from "styled-components";

const ImageConfirmModal = ({
  imgSrc,
  setIsOpen,
}: {
  imgSrc: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const router = useRouter();
  const setSize = useSetAtom(imgSizeAtom);
  const modalVariants = {
    initial: {
      opacity: 0,
      y: 300,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    exit: {
      y: 300,
      opacity: 0,
      transition: { duration: 0.1 },
    },
  };

  return (
    <Container>
      <ModalContainer
        variants={modalVariants}
        animate="animate"
        initial="initial"
        exit="exit"
      >
        <ImageContainer>
          <Image
            ref={imageRef}
            src={imgSrc}
            alt="captureImage"
            fill={true}
            style={{
              objectFit: "cover",
              borderRadius: "15px",
            }}
          />
        </ImageContainer>
        <ButtonContainer>
          <Button
            onClick={() => {
              setIsOpen(false);
            }}
            bg={"#f2f4f6"}
            font={"gray"}
            whileTap={{ scale: 0.97 }}
          >
            다시 찍을게요
          </Button>
          <Button
            onClick={() => {
              if (imageRef.current) {
                const ref = imageRef.current;
                setSize({
                  width: ref.clientWidth,
                  height: ref.clientHeight,
                  aspectRatio: ref.clientWidth / ref.clientHeight,
                });
                router.push("/select_image/upload");
              }
            }}
            bg={"rgb(49, 130, 246)"}
            font={"white"}
            whileTap={{ scale: 0.97 }}
            whileHover={{ filter: "brightness(0.8)" }}
          >
            업로드
          </Button>
        </ButtonContainer>
      </ModalContainer>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 200;
`;

const ModalContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  bottom: 13px;
  width: calc(100% - 26px);
  height: 600px;
  background-color: white;
  z-index: 100;
  margin: 0px 13px;
  border-radius: 25px;
  overflow: hidden;

  @media screen and (max-width: 450px) {
    height: 430px;
  }
`;

const ButtonContainer = styled.div`
  margin: 0px 20px 20px 20px;
  display: flex;
  gap: 15px;
`;

const ImageContainer = styled.div`
  height: 500px;
  position: relative;
  margin: 20px 20px;

  @media screen and (max-width: 450px) {
    height: 320px;
  }
`;

const Button = styled(motion.button)<{ bg: string; font: string }>`
  width: calc(100% - 40px);
  height: 55px;
  border-radius: 15px;
  background-color: ${(props) => props.bg};
  color: ${(props) => props.font};
  font-size: 17px;
  font-weight: 600;
  -webkit-tap-highlight-color: transparent;
`;

export default ImageConfirmModal;
