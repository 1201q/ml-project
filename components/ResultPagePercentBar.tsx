import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

interface PropsType {
  name: string;
  rank: number;
  percent: number;
  color: string;
}

const ResultPagePercentBar: React.FC<PropsType> = ({
  rank,
  name,
  percent,
  color,
}) => {
  return (
    <Container>
      <ChartRank>
        <p>{rank}</p>
      </ChartRank>
      <BarContainer>
        <Name>{name}</Name>
        <Percent weight={percent > 10 ? 700 : 400}>
          {percent.toFixed(2)}%
        </Percent>
        <Bar
          color={color}
          width={Number(percent.toFixed(2))}
          opacity={percent < 3 ? 0.2 : 0.3}
        ></Bar>
      </BarContainer>
    </Container>
  );
};

const Container = styled(motion.div)`
  display: flex;
  height: 25px;
`;

const ChartRank = styled.div`
  display: flex;
  align-items: center;
  width: 35px;

  p {
    text-align: center;
    font-size: 16px;
    font-weight: 600;
  }
`;

const BarContainer = styled.div`
  width: calc(100% - 35px);
  position: relative;
`;

const Name = styled.p`
  height: 100%;
  position: absolute;
  left: 5px;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 700;
  z-index: 2;
  color: black;
`;

const Percent = styled.p<{ weight: number }>`
  height: 100%;
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: ${(props) => props.weight};
  z-index: 2;
  letter-spacing: -0.7px;
`;
const Bar = styled.div<{ width: number; opacity: number; color: string }>`
  width: ${(props) => `${props.width}%`};
  height: 100%;
  position: absolute;
  background-color: ${(props) => props.color};
  z-index: 1;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
`;

export default React.memo(ResultPagePercentBar);
