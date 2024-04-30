import styled from "styled-components";

const CurrentStage = () => {
  const stage = ["이미지 입력", "이미지 입력", "결과"];
  return (
    <Container>
      <StageContainer>
        {stage.map((st, i) => (
          <Stage key={i}>
            <StageBar current={i === 0}></StageBar>
            <p>{st}</p>
          </Stage>
        ))}
      </StageContainer>
    </Container>
  );
};

const Container = styled.div`
  width: calc(100% - 32px);
  padding: 0px 16px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const StageContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 13px;
  width: 100%;
  max-width: 600px;
`;

const Stage = styled.div`
  p {
    text-align: center;
    font-size: 16px;
    font-weight: 400;
  }
`;

const StageBar = styled.div<{ current: boolean }>`
  height: 10px;
  background-color: #3182f6;
  border-radius: 30px;
  margin-bottom: 12px;
  opacity: ${(props) => (props.current ? "1" : "0.2")};
`;
export default CurrentStage;
