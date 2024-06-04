import { predictDataAtom } from "@/context/atoms";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import styled from "styled-components";
import Header from "./Header";
import Image from "next/image";

const ResultPage = () => {
  const [predictData] = useAtom(predictDataAtom);
  return (
    <Container>
      <Header currentMenu="결과" />
      <ContentsContainer>
        <TitleContainer
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <TitleText>가장 닮은 연예인은</TitleText>
          <TitleText>{predictData?.rank[0].name}입니다</TitleText>
        </TitleContainer>
        <ItemContainer></ItemContainer>
        {predictData?.rank.map((item: any, index: any) => (
          <Item key={item.name}>
            <div>
              <ItemName>{item.name}</ItemName>
              <p>{Number(item.probability).toFixed(2)}%</p>
            </div>

            <Image
              src={require(`@/public/star/${item.name}.jpg`)}
              alt={item.name}
              fill
              style={{ objectFit: "contain", borderRadius: "10px" }}
            />
          </Item>
        ))}
      </ContentsContainer>
    </Container>
  );
};
const Container = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ContentsContainer = styled.div`
  padding: 0px 20px;
  height: calc(100% - 60px);
  overflow-y: scroll;
`;
const TitleText = styled(motion.p)`
  font-size: 28px;
  font-weight: 700;
  line-height: 130%;
`;

const TitleContainer = styled(motion.div)`
  width: 100%;
  text-align: left;
  margin-top: 20px;
  margin-bottom: 40px;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Item = styled.div`
  width: 100%;
  position: relative;
  height: 300px;
  display: flex;
  flex-direction: column;
`;
const ItemName = styled.p`
  font-size: 25px;
  font-weight: 700;
  line-height: 130%;
`;

export default ResultPage;
