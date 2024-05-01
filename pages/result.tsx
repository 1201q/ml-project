import CurrentStage from "@/components/CurrentStage";
import FaceCapture from "@/components/FaceCapture";
import Header from "@/components/Header";

import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

function Result() {
  return (
    <Container>
      <Header />
      <CurrentStage />

      <button>찰칵</button>
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

export default Result;
