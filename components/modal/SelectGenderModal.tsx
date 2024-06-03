import nextURLPush from "@/utils/nextURLPush";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import styled from "styled-components";

const SelectGenderModal = () => {
  const router = useRouter();
  return (
    <Container>
      <ModalContainer>
        <TopContainer>
          <TitleText>남자이신가요? 여자이신가요?</TitleText>
        </TopContainer>
        <ButtonContainer>
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

  background-color: white;
  z-index: 100;
  margin: 0px 13px;
  border-radius: 20px;
  overflow: hidden;
`;

const TopContainer = styled.div`
  padding: 30px 21px;
`;

const TitleText = styled.p`
  font-size: 22px;
  font-weight: 600;
`;
const ButtonContainer = styled.div`
  width: calc(100% - 40px);

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
export default SelectGenderModal;
