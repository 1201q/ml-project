import { useRouter } from "next/router";
import styled from "styled-components";
import LandingPage from "./landing/index";

const Render = () => {
  const router = useRouter();
  const path = router.pathname;

  return (
    <Container>
      <MobileContainer>{path === "/" && <LandingPage />}</MobileContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100dvh;
  background-color: #f2f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MobileContainer = styled.div`
  width: 100%;
  max-width: 800px;
  height: 100%;
  background-color: white;
  border-right: 1px solid lightgray;
  border-left: 1px solid lightgray;
  position: relative;
  overflow: hidden;
`;

export default Render;
