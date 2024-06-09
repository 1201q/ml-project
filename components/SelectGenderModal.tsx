import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";
import styled from "styled-components";

const SelectGenderModal = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setIsLoading(true);
    });
    return () => {
      router.events.off("routeChangeStart", () => {
        setIsLoading(true);
      });
    };
  }, []);

  return (
    <Container>
      <ModalContainer initial={{ y: 100 }} animate={{ y: 0 }}>
        <TopContainer>
          <TitleText>성별을 선택해주세요</TitleText>
        </TopContainer>
        <ButtonContainer>
          <Button
            bg={"#e8f3ff"}
            font={"#3182f6"}
            whileTap={{ scale: 0.97 }}
            onClick={() =>
              router.replace(
                {
                  pathname: "/stage/post",
                  query: { gender: "male" },
                },
                "/stage/post"
              )
            }
          >
            남자에요
          </Button>
          <Button
            bg={"#fee"}
            font={"#f04452"}
            whileTap={{ scale: 0.97 }}
            onClick={() =>
              router.replace(
                {
                  pathname: "/stage/post",
                  query: { gender: "female" },
                },
                "/stage/post"
              )
            }
          >
            여자에요
          </Button>
        </ButtonContainer>
        {isLoading && (
          <LoadingContainer>
            <div style={{ marginRight: "12px" }}>
              <PuffLoader
                loading={true}
                color="rgb(49,130,246)"
                speedMultiplier={1}
                size={60}
              />
            </div>
          </LoadingContainer>
        )}
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
  z-index: 1000;
`;
const ModalContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  bottom: 13px;
  width: calc(100% - 26px);

  background-color: white;
  z-index: 100;
  margin: 0px 13px;
  border-radius: 20px;
  overflow: hidden;
`;

const TopContainer = styled.div`
  padding: 30px 21px 25px 21px;
`;

const TitleText = styled.p`
  font-size: 22px;
  font-weight: 700;
`;
const ButtonContainer = styled.div`
  width: calc(100% - 40px);
  margin: 0px 20px 20px 20px;
  display: flex;
  gap: 10px;
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

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: white;
`;
export default SelectGenderModal;
