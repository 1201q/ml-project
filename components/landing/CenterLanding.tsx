import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";

const CenterLanding = () => {
  const router = useRouter();
  return (
    <Container initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Image
        src={require("@/public/Pastel_20.png")}
        alt="pastel"
        width={1300}
        style={{
          marginBottom: "100px",
          position: "absolute",
          zIndex: 1,
          opacity: 0.8,
          userSelect: "none",
        }}
        draggable={false}
        priority
        placeholder="empty"
      />
      <CenterContainer>
        <LandingText>
          딥러닝 학습 모델을 이용해
          <br />
          당신의 얼굴을 평가해드릴게요
        </LandingText>
        <StartButton
          whileTap={{ scale: 0.92 }}
          onClick={() => {
            router.push("/start");
          }}
        >
          시작하기
        </StartButton>
      </CenterContainer>
      <TeamSmallText>
        이 프로젝트는 이하택, 홍지찬, 황준서의 머신러닝 프로젝트에요.
      </TeamSmallText>
    </Container>
  );
};

const Container = styled(motion.div)`
  height: 100%;
  z-index: 100;
  padding: 0px 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fef9fe;

  @media screen and (max-width: 768px) {
    padding: 0px 20px;
  }
`;

const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 120px;
  z-index: 100;
`;

const LandingText = styled.p`
  font-size: 65px;
  font-weight: 700;
  color: black;
  line-height: 120%;
  letter-spacing: -2px;
  margin-bottom: 50px;
  text-align: center;
  white-space: nowrap;

  @media screen and (max-width: 768px) {
    font-size: 45px;
  }

  @media screen and (max-width: 500px) {
    font-size: 38px;
    white-space: pre-line;
  }
`;

const TeamSmallText = styled.p`
  position: fixed;
  bottom: 40px;
  font-size: 15px;
  text-align: center;
  z-index: 100;
  white-space: pre-line;
  padding: 0px 20px;
`;

const StartButton = styled(motion.button)`
  width: 220px;
  height: 50px;
  background-color: #7d6efc;
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 20px;
  margin-bottom: 50px;
  font-weight: 700;
  opacity: 1;

  :hover {
    opacity: 0.8;
  }

  @media screen and (max-width: 768px) {
    width: 170px;
    height: 40px;
    font-size: 18px;
  }

  @media screen and (max-width: 500px) {
    width: 150px;
    height: 40px;
    font-size: 16px;
  }
`;

export default CenterLanding;
