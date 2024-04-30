import styled from "styled-components";

const Header = () => {
  return (
    <Container>
      <div>이미지인식</div>
    </Container>
  );
};

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  width: calc(100% - 60px);
  height: 60px;
  padding: 0px 30px;
  font-size: 25px;
  font-weight: 800;

  @media screen and (max-width: 500px) {
    width: calc(100% - 32px);
    padding: 0px 16px;
  }
`;

export default Header;
