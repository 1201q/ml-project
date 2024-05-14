import Header from "@/components/Header";
import { imgSrcAtom } from "@/context/atoms";
import { motion } from "framer-motion";
import { useAtomValue } from "jotai";
import Image from "next/image";
import styled from "styled-components";

const UploadPage = () => {
  const imgSrc = useAtomValue(imgSrcAtom);

  return (
    <Container>
      <Header currentMenu="이미지 업로드" />
      <ImageContainer>
        {imgSrc && (
          <Image
            src={imgSrc}
            alt="captureImage"
            fill={true}
            style={{
              objectFit: "cover",
              borderRadius: "15px",
            }}
          />
        )}
      </ImageContainer>
    </Container>
  );
};

const Container = styled(motion.div)`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ImageContainer = styled.div`
  width: calc(100% - 40px);
  margin: 0px 20px;
  position: relative;
  height: 100%;
  max-height: 540px;

  @media screen and (max-width: 450px) {
    height: 100%;
    max-height: 320px;
  }
`;

export default UploadPage;
