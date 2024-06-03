import { motion } from "framer-motion";
import styled from "styled-components";
import Header from "./Header";
import { PuffLoader } from "react-spinners";
import { useRouter } from "next/router";
import nextURLPush from "@/utils/nextURLPush";
import { useEffect, useState } from "react";

const ResultLoading = () => {
  const router = useRouter();
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsComplete(true);
    }, 2000);
  }, []);
  return (
    <Container>
      <Header />
      <ContentsContainer>
        {!isComplete ? (
          <TitleContainer
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <TitleText>예측 결과를</TitleText>
            <TitleText>가져오고 있어요</TitleText>
          </TitleContainer>
        ) : (
          <TitleContainer
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <TitleText>예측 결과가 나왔어요!</TitleText>
            <SmallText>지금 보러 가보세요!</SmallText>
          </TitleContainer>
        )}

        {!isComplete && (
          <LoadingContainer>
            <PuffLoader
              loading={true}
              color="rgb(49,130,246)"
              speedMultiplier={1}
              size={170}
            />
          </LoadingContainer>
        )}
      </ContentsContainer>
      {isComplete && (
        <ButtonContainer
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <Button
            onClick={() => {
              nextURLPush(router, "/stage/result");
            }}
            bg={"rgb(49, 130, 246)"}
            font={"white"}
            whileHover={{ filter: "brightness(0.8)" }}
            whileTap={{ scale: 0.97, filter: "brightness(0.8)" }}
          >
            결과 보러가기
          </Button>
        </ButtonContainer>
      )}
    </Container>
  );
};
const Container = styled(motion.div)`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const ContentsContainer = styled.div`
  display: flex;

  flex-direction: column;
  align-items: center;
  padding: 0px 20px;
  height: calc(100% - 60px);
`;

const TitleText = styled(motion.p)`
  font-size: 28px;
  font-weight: 700;
  line-height: 130%;
`;

const SmallText = styled.p`
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 160%;
  margin-top: 10px;
`;

const TitleContainer = styled(motion.div)`
  width: 100%;
  text-align: left;
  margin-top: 20px;
`;

const LoadingContainer = styled.div`
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
`;

const ButtonContainer = styled(motion.div)`
  position: absolute;
  width: calc(100% - 40px);
  bottom: 0;
  margin: 0px 20px 20px 20px;
  display: flex;
  gap: 15px;
  background-color: white;
`;
const Button = styled(motion.button)<{ bg: string; font: string }>`
  width: 100%;
  height: 55px;
  border-radius: 15px;
  background-color: ${(props) => props.bg};
  color: ${(props) => props.font};
  font-size: 17px;
  font-weight: 600;
  -webkit-tap-highlight-color: transparent;
`;

export default ResultLoading;
