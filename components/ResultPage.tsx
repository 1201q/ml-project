import { predictDataAtom } from "@/context/atoms";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useAtom } from "jotai";
import styled from "styled-components";
import Header from "./Header";
import ResultPageCard from "./ResultPageCard";
import ResultPagePercentBar from "./ResultPagePercentBar";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import React from "react";
import dynamic from "next/dynamic";

const ShareModal = dynamic(() => import("@/components/ShareModal"));

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

interface PropsType {
  isSharePage: boolean;
  name: string | null;
  gender: "female" | "male" | null;
}

const ResultPage: React.FC<PropsType> = ({
  isSharePage = false,
  name,
  gender,
}) => {
  const containerRef = useRef(null);
  const router = useRouter();
  const [predictData] = useAtom(predictDataAtom);
  const userGender = gender ? gender : predictData?.gender;

  const topPredictData =
    userGender === "male" ? predictData?.male : predictData?.female;
  const bottomPredictData =
    userGender === "male" ? predictData?.female : predictData?.male;

  const bottomContainerRef = useRef(null);
  const isBottomContentsInView = useInView(bottomContainerRef, {
    root: containerRef,
    margin: "0px 0px -600px 0px",
  });

  const [isShareModalVisible, setIsShareModalVisible] = useState(false);

  useEffect(() => {
    if (router.query.shareModal) {
      setIsShareModalVisible(true);
    } else {
      setIsShareModalVisible(false);
    }
  }, [router.query]);

  const getBgColor = (changed: boolean) => {
    const blue =
      "linear-gradient(rgba(49, 130, 246, 0.2) 0%, rgba(0, 0, 0, 0) 60%)";
    const red =
      "linear-gradient(rgba(240, 68, 82, 0.15) 0%, rgba(0, 0, 0, 0) 50%)";

    if (userGender === "male") {
      return !changed ? blue : red;
    } else {
      return !changed ? red : blue;
    }
  };

  return (
    <Container color={getBgColor(isBottomContentsInView)}>
      <Header currentMenu="결과" />
      <ContentsContainer ref={containerRef}>
        <>
          <TitleContainer variants={reveal} initial="hidden" animate="visible">
            {isSharePage && <TitleText>{name}님과</TitleText>}
            <TitleText>
              가장 닮은 {userGender === "male" ? "남자" : "여자"} 연예인은
            </TitleText>
            <TitleText>
              {topPredictData && topPredictData[0].name}입니다
            </TitleText>
          </TitleContainer>
          {topPredictData && (
            <ItemContainer>
              <ItemTopContainer
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ root: containerRef, once: true }}
              >
                <ResultPageCard
                  rank={1}
                  name={topPredictData[0].name}
                  percent={topPredictData[0].probability}
                  fit={"contain"}
                  priority={true}
                />
              </ItemTopContainer>
              <ItemGridContainer
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ root: containerRef, once: true }}
              >
                {topPredictData?.slice(1, 5).map((item, index) => (
                  <ResultPageCard
                    key={`card-${item.name}`}
                    rank={item.rank}
                    name={item.name}
                    percent={item.probability}
                    priority={index < 3 ? true : false}
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
            <TitleText>{topPredictData?.slice(-1)[0].name}입니다</TitleText>
          </TitleContainer>
          {topPredictData?.slice(-1)[0] && (
            <motion.div
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ root: containerRef, once: true }}
              style={{ marginBottom: "50px" }}
            >
              <ItemTopContainer>
                <ResultPageCard
                  rank={topPredictData.length}
                  name={topPredictData?.slice(-1)[0].name}
                  percent={topPredictData?.slice(-1)[0].probability}
                  fit="contain"
                  priority={true}
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
            viewport={{ root: containerRef, once: true, amount: 0.1 }}
          >
            {topPredictData &&
              topPredictData.map((item, index) => (
                <ResultPagePercentBar
                  key={`bar-${item.name}`}
                  name={item.name}
                  rank={item.rank}
                  percent={item.probability}
                  color={
                    userGender === "male"
                      ? "rgba(49, 130, 246, 0.3)"
                      : "rgba(240, 68, 82, 0.2)"
                  }
                />
              ))}
          </ChartContainer>
        </>
        <div ref={bottomContainerRef}>
          <TitleContainer variants={reveal} initial="hidden" animate="visible">
            <TitleText>
              {userGender === "male" ? "여자" : "남자"} 연예인 중 가장 닮은
              사람은
            </TitleText>
            <TitleText>
              {bottomPredictData && bottomPredictData[0].name}입니다
            </TitleText>
          </TitleContainer>
          {bottomPredictData && (
            <ItemContainer>
              <ItemTopContainer
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ root: containerRef, once: true }}
              >
                <ResultPageCard
                  rank={1}
                  name={bottomPredictData[0].name}
                  percent={bottomPredictData[0].probability}
                  fit={"contain"}
                  priority={false}
                />
              </ItemTopContainer>
              <ItemGridContainer
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ root: containerRef, once: true }}
              >
                {bottomPredictData?.slice(1, 5).map((item, index) => (
                  <ResultPageCard
                    key={`card-${item.name}`}
                    rank={item.rank}
                    name={item.name}
                    percent={item.probability}
                    priority={false}
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
            <TitleText>{bottomPredictData?.slice(-1)[0].name}입니다</TitleText>
          </TitleContainer>
          {bottomPredictData?.slice(-1)[0] && (
            <motion.div
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ root: containerRef, once: true }}
              style={{ marginBottom: "50px" }}
            >
              <ItemTopContainer>
                <ResultPageCard
                  rank={bottomPredictData.length}
                  name={bottomPredictData?.slice(-1)[0].name}
                  percent={bottomPredictData?.slice(-1)[0].probability}
                  fit="contain"
                  priority={false}
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
            viewport={{ root: containerRef, once: true, amount: 0.1 }}
          >
            {bottomPredictData &&
              bottomPredictData.map((item, index) => (
                <ResultPagePercentBar
                  key={`bar-${item.name}`}
                  name={item.name}
                  rank={item.rank}
                  percent={item.probability}
                  color={
                    userGender === "male"
                      ? "rgba(240, 68, 82, 0.2)"
                      : "rgba(49, 130, 246, 0.3)"
                  }
                />
              ))}
          </ChartContainer>
        </div>

        {!isSharePage ? (
          <ButtonContainer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ root: containerRef, once: true }}
          >
            <Button
              onClick={() => {
                router.replace("/stage/capture");
              }}
              bg={"#f2f4f6"}
              font={"gray"}
              whileTap={{ scale: 0.97 }}
            >
              다시 할래요
            </Button>
            <Button
              onClick={() => {
                router.push({
                  pathname: "/stage/result",
                  query: { shareModal: "true" },
                });
              }}
              bg={"rgb(49, 130, 246)"}
              font={"white"}
              whileHover={{ filter: "brightness(0.8)" }}
              whileTap={{ scale: 0.97, filter: "brightness(0.8)" }}
            >
              친구에게 공유하기
            </Button>
          </ButtonContainer>
        ) : (
          <ButtonContainer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ root: containerRef, once: true }}
          >
            <Button
              onClick={() => {
                router.push("/stage/capture");
              }}
              bg={"rgb(49, 130, 246)"}
              font={"white"}
              whileHover={{ filter: "brightness(0.8)" }}
              whileTap={{ scale: 0.97, filter: "brightness(0.8)" }}
            >
              나도 해보기
            </Button>
          </ButtonContainer>
        )}
      </ContentsContainer>
      <AnimatePresence>{isShareModalVisible && <ShareModal />}</AnimatePresence>
    </Container>
  );
};
const Container = styled(motion.div)<{ color: string }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  background: ${(props) => props.color};
  overflow-y: hidden;
`;

const ContentsContainer = styled.div`
  padding: 0px 20px;
  height: calc(100% - 60px);
  overflow-y: scroll;
`;
const TitleText = styled(motion.p)`
  font-size: 27px;
  font-weight: 700;
  line-height: 130%;
  letter-spacing: -0.4px;
`;

const TitleContainer = styled(motion.div)`
  width: 100%;
  text-align: left;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const ItemContainer = styled(motion.div)`
  min-height: calc(100% - 150px);

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

const ButtonContainer = styled(motion.div)`
  width: calc(100%);
  margin-bottom: 20px;
  display: flex;

  background: none;
  gap: 15px;
`;
const Button = styled(motion.button)<{ bg: string; font: string }>`
  width: 100%;
  height: 55px;
  border-radius: 15px;
  background-color: ${(props) => props.bg};
  color: ${(props) => props.font};
  font-size: 17px;
  font-weight: 600;
  -webkit-tap-highlight-color: transparent;
`;

export default ResultPage;
