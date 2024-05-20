import { useState } from "react";
import Webcam from "react-webcam";
import styled from "styled-components";

const CameraComponent = () => {
  const [test, setTest] = useState(false);
  return (
    <Container>
      {test ? (
        <>
          <p style={{ position: "fixed", top: 0 }}>기본</p>
          <Webcam style={{ width: "100%" }} mirrored={true} />
        </>
      ) : (
        <>
          <p style={{ position: "fixed", top: 0 }}>height:100%</p>
          <Webcam style={{ width: "100%", height: "100%" }} mirrored={true} />
        </>
      )}
      <button
        style={{ position: "fixed", top: 0, right: 0, width: 50 }}
        onClick={() => {
          setTest((prev) => !prev);
        }}
      >
        전환
      </button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100% - 180px);
  background-color: green;
`;

export default CameraComponent;
