import useSize from "@/utils/useSize";
import { useRef } from "react";
import Webcam from "react-webcam";
import styled from "styled-components";

const CameraComponent = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isResizing, size } = useSize(containerRef);

  return (
    <Container ref={containerRef}>
      <BarContainer>1</BarContainer>
      <p style={{ position: "fixed", top: 0 }}>기본</p>

      {!isResizing && size ? (
        <Webcam
          width={size.width}
          height={size.height - 100}
          style={{
            objectFit: "cover",
            aspectRatio: `${size.width} / ${size.height - 100}`,
            zIndex: 1,
          }}
          mirrored={true}
          videoConstraints={{
            facingMode: "user",
          }}
        />
      ) : (
        <></>
      )}

      <BarContainer>
        width:{size?.width} / height:{size?.height}
      </BarContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: calc(100% - 180px);
  background-color: green;
  overflow: hidden;
`;

const BarContainer = styled.div`
  width: 100%;
  height: 50px;
  background-color: black;
  color: white;
  z-index: 100;
`;

export default CameraComponent;
