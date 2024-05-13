import { motion } from "framer-motion";
import styled from "styled-components";
import Image from "next/image";

import { useRouter } from "next/router";
import nextURLPush from "@/utils/nextURLPush";

const SelectModeModal = () => {
  const router = useRouter();
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

  const menuVariants = {
    out: {
      x: -600,
    },
    in: {
      x: 0,
    },
    tap: {
      scale: 0.97,
      backgroundColor: "#f3f3f4",
    },
    hover: { backgroundColor: "#f3f3f4" },
  };

  return (
    <Container>
      <ModalContainer
        variants={modalVariants}
        animate="animate"
        initial="initial"
        exit="exit"
      >
        <ModalTitle>어떤 방법으로 이미지를 가져올까요?</ModalTitle>
        <ModalMenuContainer>
          <ModalMenu
            onClick={() => {
              nextURLPush(router, "/select_image/capture");
            }}
            variants={menuVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Image
              src={require("@/public/Camera.png")}
              alt={"camera"}
              width={35}
              height={35}
              style={{
                marginLeft: "-4px",
                marginTop: "2px",
                marginRight: "7px",
              }}
            />
            이미지 촬영하기
          </ModalMenu>
          <ModalMenu
            onClick={() => {
              nextURLPush(router, "/select_image/import");
            }}
            variants={menuVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Image
              src={require("@/public/folder.png")}
              alt={"folder"}
              width={35}
              height={35}
              style={{ marginLeft: "-4px", marginRight: "7px" }}
            />
            저장소에서 이미지 가져오기
          </ModalMenu>
        </ModalMenuContainer>
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
  position: absolute;
  bottom: 13px;
  width: calc(100% - 26px);
  height: 230px;
  background-color: white;
  z-index: 100;
  margin: 0px 13px;
  border-radius: 25px;
  overflow: hidden;
`;

const ModalTitle = styled.p`
  font-size: 22px;
  font-weight: 600;
  padding: 35px 30px 18px 25px;
`;

const ModalMenuContainer = styled(motion.div)`
  padding: 0px 12px;
`;

const ModalMenu = styled(motion.div)`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 7px 13px;
  margin-bottom: 5px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 500;
  background-color: white;
  -webkit-tap-highlight-color: transparent;
`;

export default SelectModeModal;
