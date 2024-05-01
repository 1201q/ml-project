import CenterLanding from "@/components/landing/CenterLanding";
import React from "react";
import styled from "styled-components";

function Home() {
  return (
    <Container>
      <CenterLanding />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  background-color: #fefdff;
`;

export default Home;
