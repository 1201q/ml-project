import styled from "styled-components";

const Header = () => {
  return (
    <Container>
      <div>우모못</div>
    </Container>
  );
};

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  width: 100%;
  height: 60px;
  padding: 0px 30px;
  font-size: 25px;
  font-weight: 800;
  letter-spacing: -2px;
  z-index: 100;
  color: black;
  background-color: white;

  backdrop-filter: blur(10px);

  @media screen and (max-width: 500px) {
    padding: 0px 16px;
  }
`;

export default Header;
