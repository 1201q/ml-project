import Header from "@/components/Header";
import { imgSizeAtom, imgSrcAtom } from "@/context/atoms";
import { motion } from "framer-motion";
import { useAtomValue } from "jotai";
import Image from "next/image";
import styled from "styled-components";

const UploadPage = () => {
  const imgSrc = useAtomValue(imgSrcAtom);
  const imgSize = useAtomValue(imgSizeAtom);

  return (
    <Container>
      <Header currentMenu="이미지 업로드" />
      {imgSrc && imgSize && (
        <ImageContainer width={imgSize?.width} height={imgSize?.height}>
          <Image
            src={imgSrc}
            alt="captureImage"
            fill
            style={{
              objectFit: "cover",
              borderRadius: "15px",
            }}
          />
        </ImageContainer>
      )}
    </Container>
  );
};

const Container = styled(motion.div)`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ImageContainer = styled.div<{ width: number; height: number }>`
  aspect-ratio: ${(props) => props.width / props.height};
  width: calc(100% - 40px);
  max-height: calc(100% - 60px);
  margin: 20px 20px;
  position: relative;
`;

export default UploadPage;
