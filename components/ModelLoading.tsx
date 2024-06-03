import styled from "styled-components";
import { PuffLoader } from "react-spinners";

const ModelLoading = ({ text }: { text: string }) => {
  return (
    <Container>
      <LoadingContainer>
        <PuffLoader loading={true} color="white" speedMultiplier={2} />
        <Text>{text}</Text>
      </LoadingContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 200;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 2px;
`;

const Text = styled.p`
  font-size: 17px;
  font-weight: 300;
  color: #ffffff5a;
  text-align: center;
  margin-top: 40px;
`;

export default ModelLoading;
