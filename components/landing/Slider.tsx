import { useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import Avatar from "@/components/landing/Avatar";

const aniScroll = keyframes`
  0% { 
    transform: translateX(0%);
  }

  100% { 
    transform: translateX(-100%); 
  }
`;

const aniScroll2 = keyframes`
  0% { 
    transform: translateX(100%); 
  }

  100% { 
    transform: translateX(0%);
  }
`;

const Slider = () => {
  const array = [18, 1, 5, 7, 12, 9, 11, 17, 4];
  const color = ["#7783b8", "#f2f4f6", "#e7c36e", "#9ad3bd", "#d49b89"];
  const sliderRef = useRef<HTMLDivElement>(null);
  const [render, setRender] = useState(array);

  return (
    <Container ref={sliderRef}>
      <Line>
        {render.map((d, index) => (
          <Avatar
            key={`${index}-1`}
            size={220}
            color={color[index % 5]}
            image={d}
            index={index}
          />
        ))}
      </Line>
      <SecondLine>
        {render.map((d, index) => (
          <Avatar
            key={`${index}-2`}
            size={220}
            color={color[index % 5]}
            image={d}
            index={index}
          />
        ))}
      </SecondLine>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  pointer-events: none;
`;

const Line = styled.ul`
  position: absolute;
  display: flex;
  flex-wrap: nowrap;
  gap: 15px;
  animation: ${aniScroll} 20s linear infinite;
`;

const SecondLine = styled.ul`
  position: absolute;
  display: flex;
  flex-wrap: nowrap;
  margin-left: 15px;
  gap: 15px;
  animation: ${aniScroll2} 20s linear infinite;
`;

export default Slider;
