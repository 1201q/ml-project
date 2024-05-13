import Image from "next/image";
import styled from "styled-components";

interface PropsType {
  size: number;
  image: string | number;
  color: string;
}

interface StyleType {
  size: number;
  color: string;
}

const Avatar: React.FC<PropsType> = ({ size, image, color }) => {
  return (
    <Container size={size} color={color}>
      <Image
        src={require(`@/public/avatar/${image}.png`)}
        alt="avatar"
        width={size}
        height={size}
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
