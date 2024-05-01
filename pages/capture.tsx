import CurrentStage from "@/components/CurrentStage";
import FaceCapture from "@/components/FaceCapture";
import Header from "@/components/Header";
import { useRouter } from "next/router";

import React from "react";
import styled from "styled-components";

function Capture() {
  const router = useRouter();
  return (
    <Container>
      <Header />
      <CurrentStage />
      <FaceCapture />
      <button
        onClick={() => {
          router.push("/result");
        }}
      >
        찰칵
      </button>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100dvh;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

export default Capture;
