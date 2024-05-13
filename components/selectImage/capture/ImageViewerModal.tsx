import { motion } from "framer-motion";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

const ImageViewerModal = ({
  imgSrc,
  setIsOpen,
}: {
  imgSrc: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
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
            bg={"rgb(49, 130, 246)"}
            font={"white"}
            whileTap={{ scale: 0.97 }}
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
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 200;
`;

const ModalContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  bottom: 20px;
  width: calc(100% - 40px);
  height: 400px;
  background-color: white;
  z-index: 100;
  margin: 0px 20px;
  border-radius: 25px;
  overflow: hidden;
`;

const ButtonContainer = styled.div`
  margin: 0px 20px 20px 20px;
  display: flex;
  gap: 15px;
`;

const ImageContainer = styled.div`
  height: 320px;
  position: relative;
  margin: 20px 20px;
  border-radius: 20px;
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

export default ImageViewerModal;
