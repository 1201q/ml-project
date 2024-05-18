import nextURLPush from "@/utils/nextURLPush";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import styled from "styled-components";

const Terms = () => {
  const router = useRouter();

  const agree = () => {
    document.cookie = "terms=true; secure; samesite";
    nextURLPush(router, "/select_image/capture");
  };

  return (
    <Container>
      <TitleContainer>
        <TitleText>서비스 이용약관에</TitleText>
        <TitleText>동의해주세요</TitleText>
      </TitleContainer>
      <TermsContainer>
        <TermsText>
          본 서비스는 사용자의 얼굴을 분석하기 위해서 카메라에 대한 권한이
          필요해요.
        </TermsText>
        <TermsText>
          해당 사진은 사용자의 개인정보로서 외부에 공개되지 않으며, 서버에
          저장되지 않아요.
        </TermsText>
        <TermsText>
          해당 약관에 대해서 거부할 수 있지만 거부 시에 해당 서비스를 이용할 수
          없어요.
        </TermsText>
      </TermsContainer>
      <BottomContainer>
        <Button
          onClick={agree}
          bg={"rgb(49, 130, 246)"}
          font={"white"}
          whileHover={{ filter: "brightness(0.8)" }}
          whileTap={{ scale: 0.97, filter: "brightness(0.8)" }}
        >
          동의하고 시작하기
        </Button>
        <Button
          onClick={() => {
            router.back();
          }}
          bg={"#f2f4f6"}
          font={"gray"}
          whileTap={{ scale: 0.97 }}
        >
          닫기
        </Button>
      </BottomContainer>
    </Container>
  );
};
const Container = styled(motion.div)`
  padding: 0px 20px;
  height: calc(100% - 60px);
`;

const TitleText = styled.p`
  font-size: 28px;
  font-weight: 700;
  line-height: 130%;
`;

const TitleContainer = styled.div`
  margin-top: 30px;
`;

const TermsContainer = styled.div`
  margin-top: 50px;
`;

const TermsText = styled.p`
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 160%;
  margin-top: 10px;
`;

const BottomContainer = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 140px;
  /* padding-top: 20px; */
  gap: 12px;
`;

const Button = styled(motion.button)<{ bg: string; font: string }>`
  width: calc(100% - 40px);
  height: 55px;
  border-radius: 17px;
  background-color: ${(props) => props.bg};
  color: ${(props) => props.font};
  font-size: 17px;
  font-weight: 600;
  -webkit-tap-highlight-color: transparent;
`;

export default Terms;
