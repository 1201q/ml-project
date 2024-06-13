import styled from "styled-components";

const ListPage = ({ data }: { data: any }) => {
  return (
    <Container>
      {data.map((item: any) => (
        <>
          <Row>
            <p>{item.name}</p>
            <p>
              {item.male[0].name} / {item.male[0].probability}
            </p>
            <p>
              {item.female[0].name} / {item.female[0].probability}
            </p>
          </Row>
        </>
      ))}
    </Container>
  );
};

const Container = styled.div`
  height: 100dvh;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
  background-color: #f2f4f6;
  padding: 20px 10px;
`;

export default ListPage;
