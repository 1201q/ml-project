import { useRouter } from "next/router";
import styled from "styled-components";
import LandingPage from "./landing/index";
import StartPage from "./terms/index";
import CameraPage from "./selectImage/mode/index";
import ImportImagePage from "./selectImage/import";
import CaptureImagePage from "./selectImage/capture";

const Render = () => {
  const router = useRouter();
  const path = router.pathname;

  return (
    <Container>
      <MobileContainer>
        {path === "/" && <LandingPage />}
        {path === "/terms" && <StartPage />}
        {path === "/select_image" && <CameraPage />}
        {path === "/select_image/capture" && <CaptureImagePage />}
        {path === "/select_image/import" && <ImportImagePage />}
      </MobileContainer>
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

const MobileContainer = styled.main`
  width: 100%;
  max-width: 800px;
  height: 100%;
  background-color: white;
  border-right: 1px solid lightgray;
  border-left: 1px solid lightgray;
  position: relative;
  overflow: hidden;

  @media screen and (max-width: 800px) {
    border: none;
  }
`;

export default Render;
