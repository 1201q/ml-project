import styled from "styled-components";
import Slider from "@/components/landing/Slider";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

const LandingPage = () => {
  const router = useRouter();

  return (
    <Container>
      <TopContainer>
        <Slider />
      </TopContainer>
      <MiddleContainer>
        <TextContainer>
          <BigText>딥러닝 학습 모델을 이용해</BigText>
          <BigText>당신의 얼굴을 평가해드릴게요</BigText>
        </TextContainer>
        <SmallText>이 프로젝트는 머신러닝 프로젝트의</SmallText>
        <SmallText>학습을 위해 제작되었어요.</SmallText>
      </MiddleContainer>
      <BottomContainer>
        <Button
          whileHover={{ filter: "brightness(0.8)" }}
          whileTap={{ scale: 0.97, filter: "brightness(0.8)" }}
          onClick={() => {
            router.push("/terms");
          }}
        >
          시작하기
        </Button>
        <BottomSmallText>
          이 프로젝트는 이하택, 홍지찬, 황준서의 머신러닝 프로젝트에요.
        </BottomSmallText>
      </BottomContainer>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  background: linear-gradient(
    rgba(49, 130, 246, 0.55) 0%,
    rgba(0, 0, 0, 0) 60%
  );
`;

const TopContainer = styled.div`
  position: relative;
  display: flex;

  width: 100%;
  height: 50%;
  overflow: hidden;
`;

const MiddleContainer = styled.div`
  height: 30%;
`;

const TextContainer = styled.div`
  margin-bottom: 30px;
  padding: 0px 20px;
`;

const BigText = styled.p`
  font-size: 40px;
  font-weight: 700;
  letter-spacing: 0px;
  line-height: 120%;
  text-align: center;
  color: black;

  @media screen and (max-width: 450px) {
    font-size: 28px;
  }
`;

const SmallText = styled.p`
  font-weight: 500;
  font-size: 17px;
  text-align: center;
  color: #333333;
  line-height: 120%;

  @media screen and (max-width: 450px) {
    font-size: 15px;
  }
`;

const BottomContainer = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 140px;
  padding-top: 20px;
`;

const Button = styled(motion.button)`
  width: calc(100% - 40px);
  height: 55px;
  border-radius: 17px;
  background-color: rgb(49, 130, 246);
  color: white;
  font-size: 18px;
  font-weight: 600;
  -webkit-tap-highlight-color: transparent;
`;

const BottomSmallText = styled.p`
  margin-top: 20px;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: -0.5px;
  color: gray;
  text-align: center;
  padding: 0px 20px;
`;

export default LandingPage;
