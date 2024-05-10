import styled from "styled-components";

const Loading = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <Container>
      <LoadingText></LoadingText>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoadingText = styled.p`
  font-size: 20px;
  font-weight: 700;
  color: white;
`;

export default Loading;
