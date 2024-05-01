import SelectMode from "@/components/SelectMode";
import React from "react";
import styled from "styled-components";

function Start() {
  return (
    <Container>
      <SelectMode />
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

export default Start;
