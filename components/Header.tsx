import styled from "styled-components";
import Back from "@/public/back.svg";
import { useRouter } from "next/router";

interface PropsType {
  currentMenu?: string;
}
const Header: React.FC<PropsType> = ({ currentMenu }) => {
  const router = useRouter();
  return (
    <Container>
      <BackButton
        onClick={() => {
          router.back();
        }}
      >
        <Back width={25} height={25} />
      </BackButton>
      {currentMenu && <Current>{currentMenu}</Current>}
      <RightContainer></RightContainer>
    </Container>
  );
};

const Container = styled.header`
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0px 20px;
  justify-content: space-between;
  position: relative;
  background: none;
`;

const RightContainer = styled.div``;

const Current = styled.p`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 17px;
  font-weight: 600;
`;

const BackButton = styled.button`
  height: 100%;
  padding-right: 10px;

  svg {
    fill: #b7bfc7;
    margin-left: -5px;
  }
`;

export default Header;
