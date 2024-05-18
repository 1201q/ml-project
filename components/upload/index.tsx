import Header from "@/components/Header";
import { imgSizeAtom, imgSrcAtom } from "@/context/atoms";
import { motion } from "framer-motion";
import { useAtomValue } from "jotai";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import * as faceapi from "face-api.js";

const UploadPage = () => {
  const imgSrc = useAtomValue(imgSrcAtom);
  const imgSize = useAtomValue(imgSizeAtom);
  const imgRef = useRef<HTMLImageElement>(null);
  const recogBoxRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    detect();
  }, []);

  const detect = async () => {
    const ref = imgRef.current;
    const canvasRef = recogBoxRef.current;

    if (ref && canvasRef && imgSize) {
      const displaySize = {
        width: ref.clientWidth,
        height: ref.clientHeight,
      };

      faceapi.matchDimensions(canvasRef, displaySize);

      const detections = await faceapi
        .detectAllFaces(
          ref as faceapi.TNetInput,
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceLandmarks();

      const resizedDetections = faceapi.resizeResults(detections, displaySize);

      const context = canvasRef.getContext("2d");
      if (context) {
        context.clearRect(0, 0, canvasRef.width, canvasRef.height);
        faceapi.draw.drawDetections(canvasRef, resizedDetections);
      }
    }
  };

  return (
    <Container>
      <Header currentMenu="이미지 업로드" />
      {imgSrc && imgSize && (
        <ImageContainer width={imgSize?.width} height={imgSize?.height}>
          <Image
            ref={imgRef}
            src={imgSrc}
            alt="captureImage"
            fill
            style={{
              objectFit: "cover",
              borderRadius: "15px",
            }}
          />
          <canvas
            ref={recogBoxRef}
            style={{ position: "absolute", top: 0, left: 0, zIndex: 10000 }}
          />
        </ImageContainer>
      )}
    </Container>
  );
};

const Container = styled(motion.div)`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ImageContainer = styled.div<{ width: number; height: number }>`
  aspect-ratio: ${(props) => props.width / props.height};
  width: calc(100% - 40px);
  max-height: calc(100% - 80px);
  margin: 20px 20px;
  position: relative;

  @media screen and (max-width: 450px) {
    max-height: calc(100% - 200px);
  }
`;

export default UploadPage;
