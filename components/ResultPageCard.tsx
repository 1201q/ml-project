import Image from "next/image";
import styled from "styled-components";

interface PropsType {
  name: string;
  rank: number;
  percent: number;
  fit?: "cover" | "contain";
  priority: boolean;
}

const ResultPageCard: React.FC<PropsType> = ({
  name,
  rank,
  percent,
  fit = "cover",
  priority,
}) => {
  return (
    <Item>
      <Image
        src={require(`@/public/star/${name}.jpg`)}
        alt={name}
        fill
        style={{ objectFit: fit, zIndex: 2 }}
        placeholder="blur"
        priority={priority}
        sizes="50vw"
      />
      {fit === "contain" && (
        <Image
          src={require(`@/public/star/${name}.jpg`)}
          alt={name}
          fill
          style={{ objectFit: "cover", opacity: 0.3 }}
          placeholder="blur"
          priority={false}
          quality={50}
          sizes="33vw"
        />
      )}
      <NameContainer>
        <PercentText>{percent.toFixed(2)}%</PercentText>
        <NameText>{name}</NameText>
      </NameContainer>
      <RankText>{rank}위</RankText>
    </Item>
  );
};

const Item = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 12px;
  overflow: hidden;

  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  cursor: pointer;

  img {
    filter: brightness(0.8);
  }
`;

const NameContainer = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 100;

  @media screen and (max-width: 450px) {
    bottom: 17px;
    right: 17px;
  }
`;

const PercentText = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: white;
  text-align: right;
  letter-spacing: -1px;
  margin-bottom: 2px;
`;
const NameText = styled.div`
  font-size: 22px;
  font-weight: 600;
  color: white;
  text-align: right;
`;

const RankText = styled.p`
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 26px;
  font-weight: 500;
  color: white;
  z-index: 100;

  @media screen and (max-width: 450px) {
    font-size: 23px;
    top: 17px;
    left: 17px;
  }
`;

export default ResultPageCard;
