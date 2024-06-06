import { predictDataAtom } from "@/context/atoms";
import { motion, useAnimation, useInView } from "framer-motion";
import { useAtom } from "jotai";
import styled from "styled-components";
import Header from "./Header";
import ResultPageCard from "./ResultPageCard";
import ResultPagePercentBar from "./ResultPagePercentBar";
import { useRef } from "react";

const reveal = {
  hidden: { opacity: 0, y: 70 },
  visible: {
    opacity: 1,
    y: 0,

    transition: {
      y: {
        duration: 0.3,
      },
    },
  },
};

const ResultPage = () => {
  const [predictData] = useAtom(predictDataAtom);
  const containerRef = useRef(null);

  return (
    <Container>
      <Header currentMenu="결과" />
      <ContentsContainer ref={containerRef}>
        <TitleContainer variants={reveal} initial="hidden" animate="visible">
          <TitleText>가장 닮은 연예인은</TitleText>
          <TitleText>{predictData?.rank[0].name}입니다</TitleText>
        </TitleContainer>
        {predictData?.rank && (
          <ItemContainer>
            <ItemTopContainer
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ root: containerRef, once: true }}
            >
              <ResultPageCard
                rank={1}
                name={predictData?.rank[0].name}
                percent={predictData?.rank[0].probability}
                fit={"contain"}
              />
            </ItemTopContainer>
            <ItemGridContainer
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ root: containerRef, once: true }}
            >
              {predictData?.rank?.slice(1, 5).map((item, index) => (
                <ResultPageCard
                  key={`card-${item.name}`}
                  rank={item.rank}
                  name={item.name}
                  percent={item.probability}
                />
              ))}
            </ItemGridContainer>
          </ItemContainer>
        )}
        <TitleContainer
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ root: containerRef, once: true, amount: 0.4 }}
        >
          <TitleText>가장 안 닮은 연예인은...</TitleText>
          <TitleText>{predictData?.rank?.slice(-1)[0].name}입니다</TitleText>
        </TitleContainer>
        {predictData?.rank?.slice(-1)[0] && (
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ root: containerRef, once: true }}
            style={{ marginBottom: "50px" }}
          >
            <ItemTopContainer>
              <ResultPageCard
                rank={predictData?.rank.length}
                name={predictData?.rank?.slice(-1)[0].name}
                percent={predictData?.rank?.slice(-1)[0].probability}
                fit="contain"
              />
            </ItemTopContainer>
          </motion.div>
        )}
        <TitleContainer
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ root: containerRef, once: true, amount: 0.4 }}
        >
          <TitleText>분석 결과</TitleText>
        </TitleContainer>
        <ChartContainer
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ root: containerRef, once: true, amount: 0.2 }}
        >
          {predictData?.rank.map((item, index) => (
            <ResultPagePercentBar
              key={`bar-${item.name}`}
              name={item.name}
              rank={item.rank}
              percent={item.probability}
            />
          ))}
        </ChartContainer>
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
  background: linear-gradient(rgba(49, 130, 246, 0.2) 0%, rgba(0, 0, 0, 0) 60%);
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
  margin-bottom: 20px;
`;

const ItemContainer = styled(motion.div)`
  min-height: calc(100% - 150px);
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 50px;
`;

const ItemTopContainer = styled(motion.div)`
  height: 400px;
  background-color: #222222;
  border-radius: 12px;
`;

const ItemGridContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;

  height: 800px;

  @media screen and (max-width: 450px) {
    height: 500px;
  }
`;

const ChartContainer = styled(motion.div)`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 80px;
`;

export default ResultPage;
