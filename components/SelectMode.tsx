import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";

const SelectMode = () => {
  const router = useRouter();
  return (
    <Container>
      <LandingText>모드를 선택해주세요</LandingText>

      <SelectContainer>
        <Select bg={"#d2d2f5"} onClick={() => router.push("/capture")}>
          <SelectHeader>이미지를 촬영할게요</SelectHeader>
          <Image
            src={require("@/public/Camera.png")}
            alt="Camera"
            width={400}
            height={400}
            quality={100}
            style={{ marginTop: "30px" }}
          />
        </Select>
        <Select bg={"#c2dbf8"}>
          <SelectHeader>기존의 이미지를 가져올게요</SelectHeader>
          <Image
            src={require("@/public/folder.png")}
            alt="folder"
            width={380}
            height={380}
            quality={100}
            style={{ marginTop: "50px" }}
          />
        </Select>
      </SelectContainer>
    </Container>
  );
};

const Container = styled(motion.div)`
  height: 100%;
  z-index: 100;
  padding: 0px 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f6f6f8;

  @media screen and (max-width: 768px) {
    padding: 0px 20px;
  }
`;

const SelectContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 60px;
  width: 100%;
  height: 450px;
  z-index: 100;

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;

const Select = styled.div<{ bg: string }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.bg};
  border-radius: 17px;
  overflow: hidden;
  position: relative;
  box-shadow: inset 0 -1px 0 0 rgba(47, 43, 67, 0.1),
    0 1px 3px 0 rgba(47, 43, 67, 0.1);
`;

const SelectHeader = styled.p`
  position: absolute;
  left: 30px;
  top: 30px;
  font-size: 32px;
  font-weight: 700;
`;

const SelectSmallHeader = styled.p`
  font-size: 17px;
`;

const LandingText = styled.p`
  font-size: 55px;
  font-weight: 700;
  color: black;
  line-height: 120%;
  letter-spacing: -2px;
  margin-bottom: 50px;
  text-align: center;
  white-space: nowrap;
  z-index: 100;

  @media screen and (max-width: 768px) {
    font-size: 45px;
  }

  @media screen and (max-width: 500px) {
    font-size: 38px;
    white-space: pre-line;
  }
`;

export default SelectMode;
