import { motion } from "framer-motion";
import styled from "styled-components";
import Header from "../Header";
import { useAtomValue } from "jotai";
import { detectedFaceDataAtom, detectedFaceImageAtom } from "@/context/atoms";
import Image from "next/image";
import { useRouter } from "next/router";
import nextURLPush from "@/utils/nextURLPush";

const SelectGenderPage = () => {
  const router = useRouter();
  const face = useAtomValue(detectedFaceImageAtom);

  return (
    <Container>
      <Header currentMenu="성별 선택" />
      <ContentsContainer>
        <TitleContainer
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <TitleText>남성이신가요?</TitleText>
          <TitleText>여성이신가요?</TitleText>
        </TitleContainer>
        <FaceContainer
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {face && (
            <Image
              src={face}
              alt="myface"
              width={face.width}
              height={face.height}
              style={{ borderRadius: "15px" }}
            />
          )}
        </FaceContainer>
      </ContentsContainer>
      <ButtonContainer
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <Button
          bg={"rgb(49, 130, 246)"}
          font={"white"}
          whileHover={{ filter: "brightness(0.8)" }}
          whileTap={{ scale: 0.97, filter: "brightness(0.8)" }}
          onClick={() => {
            nextURLPush(router, "/stage/post");
          }}
        >
          남자에요
        </Button>
        <Button
          bg={"#ff779b"}
          font={"white"}
          whileHover={{ filter: "brightness(0.8)" }}
          whileTap={{ scale: 0.97, filter: "brightness(0.8)" }}
          onClick={() => {
            nextURLPush(router, "/stage/post");
          }}
        >
          여자에요
        </Button>
      </ButtonContainer>
    </Container>
  );
};

const Container = styled(motion.div)`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ContentsContainer = styled.div`
  padding: 0px 20px;
  height: calc(100% - 60px);
`;

const FaceContainer = styled(motion.div)`
  position: relative;
  display: flex;
  justify-content: center;
  margin-top: 70px;
`;
const TitleText = styled(motion.p)`
  font-size: 28px;
  font-weight: 700;
  line-height: 130%;
`;

const TitleContainer = styled(motion.div)`
  margin-top: 20px;
`;
const ButtonContainer = styled(motion.div)`
  width: calc(100% - 40px);
  bottom: 0;
  margin: 0px 20px 20px 20px;
  display: flex;
  gap: 15px;
  background-color: white;
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

export default SelectGenderPage;
