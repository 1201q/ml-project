import styled from "styled-components";
import HeadMeta from "./HeadMeta";

type RenderProps = {
  render: React.FC<any>;
  [key: string]: any;
  title?: string | undefined;
  description?: string | undefined;
};

const Render = ({
  render: Render,
  title,
  description,
  ...props
}: RenderProps) => {
  return (
    <Container>
      <MobileContainer>
        <HeadMeta title={title} description={description} />
        <Render {...props} />
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
  max-width: 780px;
  height: 100dvh;
  background-color: white;
  border-right: 1px solid lightgray;
  border-left: 1px solid lightgray;
  position: relative;
  overflow: hidden;

  @media screen and (max-width: 780px) {
    border: none;
  }
`;

export default Render;
