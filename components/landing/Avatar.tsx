import Image from "next/image";
import { useEffect } from "react";
import styled from "styled-components";

interface PropsType {
  size: number;
  image: string | number;
  color: string;
  index: number;
}

interface StyleType {
  size: number;
  color: string;
}

const Avatar: React.FC<PropsType> = ({ size, image, color, index }) => {
  return (
    <Container size={size} color={color}>
      <Image
        src={require(`@/public/avatar/${image}.png`)}
        alt={image.toString()}
        width={size}
        height={size}
        placeholder={index < 3 ? "empty" : "blur"}
        priority={index < 3 ? true : false}
        sizes="220px"
      />
    </Container>
  );
};

const Container = styled.div<StyleType>`
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
  background-color: ${(props) => props.color};
  aspect-ratio: 1 / 1;
  border-radius: 30px;
  overflow: hidden;

  user-select: none;
`;

export default Avatar;
