import { motion } from "framer-motion";
import styled from "styled-components";

interface PropsType {
  isFaceDetected: boolean;
  isServerFaceDetected: "loading" | boolean;
}

const DetectIndicator: React.FC<PropsType> = ({
  isFaceDetected,
  isServerFaceDetected,
}) => {
  const color =
    isFaceDetected && isServerFaceDetected
      ? "rgb(49, 130, 246)"
      : "rgb(240, 68, 82)";

  const text = () => {
    if (isServerFaceDetected === "loading") {
      return "서버에서 얼굴을 검사하고 있어요";
    } else if (!isFaceDetected || !isServerFaceDetected) {
      return "얼굴을 검출하지 못했어요";
    } else {
      return "얼굴 검출 완료!";
    }
  };

  return (
    <Container
      initial={{ y: 50, scale: 0.7, opacity: 0 }}
      animate={{ y: 0, scale: 1, opacity: 1 }}
      color={color}
    >
      {text()}
    </Container>
  );
};

const Container = styled(motion.div)<{ color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  height: 33px;
  border-radius: 15px;
  width: auto;
  top: 40px;
  background-color: ${(props) => props.color};
  color: white;
  font-size: 14px;
  font-weight: 600;
  padding: 0px 18px;
  z-index: 1000;
`;

export default DetectIndicator;
