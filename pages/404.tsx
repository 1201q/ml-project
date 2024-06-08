import Render from "@/components/Render";
import { useRouter } from "next/router";
import styled from "styled-components";

const Error404 = () => {
  const router = useRouter();
  return (
    <Container>
      <Text>페이지를 찾을 수 없어요</Text>
      <ButtonContainer>
        <Button
          bg={"#e8f3ff"}
          font={"#3182f6"}
          onClick={() => {
            router.replace("/");
          }}
        >
          메인으로
        </Button>
      </ButtonContainer>
    </Container>
  );
};
const ErrorPage = () => {
  return <Render render={Error404} />;
};

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Text = styled.p`
  font-size: 25px;
  font-weight: 500;

  line-height: 130%;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 30px;
`;

const Button = styled.button<{ bg: string; font: string }>`
  width: 120px;
  height: 45px;
  border-radius: 15px;
  background-color: ${(props) => props.bg};
  color: ${(props) => props.font};
  font-size: 17px;
  font-weight: 600;
  -webkit-tap-highlight-color: transparent;
`;

export default ErrorPage;
