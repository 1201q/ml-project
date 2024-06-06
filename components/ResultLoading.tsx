import { motion } from "framer-motion";
import styled from "styled-components";
import Header from "./Header";
import { PuffLoader } from "react-spinners";
import { useRouter } from "next/router";
import nextURLPush from "@/utils/nextURLPush";
import { useEffect, useState } from "react";
import { useAtom, useSetAtom } from "jotai";
import { detectedFaceImageAtom, predictDataAtom } from "@/context/atoms";
import dataURLtoBlob from "@/utils/blob";
import axios from "axios";

const ResultLoading = ({ gender }: { gender: "male" | "female" }) => {
  const router = useRouter();
  const [isComplete, setIsComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [detectedFaceImage] = useAtom(detectedFaceImageAtom);
  const [, setPredictData] = useAtom(predictDataAtom);

  useEffect(() => {
    getPredictData(gender);
  }, []);

  const getPredictData = async (gender: "female" | "male") => {
    let url =
      `${process.env.NEXT_PUBLIC_GCP_API_URL}/predict/${gender}` as string;
    const formData = new FormData();

    if (detectedFaceImage?.blob) {
      formData.append("file", detectedFaceImage?.blob);
    } else if (detectedFaceImage?.src) {
      const blob = dataURLtoBlob(detectedFaceImage?.src);
      formData.append("file", blob);
    }

    axios
      .post(url, formData)
      .then((res) => {
        if (res.data.predictions) {
          const data = res.data.predictions;

          setPredictData({ gender: gender, rank: data });
          setIsComplete(true);
        } else {
          setIsComplete(false);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsComplete(false);
        setIsLoading(false);
      });
  };

  return (
    <Container>
      <Header />
      <ContentsContainer>
        {isLoading && !isComplete && (
          <TitleContainer
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <TitleText>예측 결과를</TitleText>
            <TitleText>가져오고 있어요</TitleText>
          </TitleContainer>
        )}
        {!isLoading && isComplete && (
          <TitleContainer
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <TitleText>예측 결과가 나왔어요!</TitleText>
            <SmallText>지금 보러 가보세요!</SmallText>
          </TitleContainer>
        )}
        {!isLoading && !isComplete && (
          <TitleContainer
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <TitleText>분석하는데 실패했어요</TitleText>
            <SmallText>다시 시도해주세요</SmallText>
          </TitleContainer>
        )}

        {isLoading && !isComplete && (
          <LoadingContainer>
            <PuffLoader
              loading={true}
              color="rgb(49,130,246)"
              speedMultiplier={1}
              size={170}
            />
          </LoadingContainer>
        )}
      </ContentsContainer>
      {!isLoading && isComplete && (
        <ButtonContainer
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            onClick={() => {
              nextURLPush(router, "/stage/result", true);
            }}
            bg={"rgb(49, 130, 246)"}
            font={"white"}
            whileHover={{ filter: "brightness(0.8)" }}
            whileTap={{ scale: 0.97, filter: "brightness(0.8)" }}
          >
            결과 보러가기
          </Button>
        </ButtonContainer>
      )}
      {!isLoading && !isComplete && (
        <ButtonContainer
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            onClick={() => {
              router.replace("/stage/capture");
            }}
            bg={"rgb(49, 130, 246)"}
            font={"white"}
            whileHover={{ filter: "brightness(0.8)" }}
            whileTap={{ scale: 0.97, filter: "brightness(0.8)" }}
          >
            다시 하기
          </Button>
        </ButtonContainer>
      )}
    </Container>
  );
};
const Container = styled(motion.div)`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const ContentsContainer = styled.div`
  display: flex;

  flex-direction: column;
  align-items: center;
  padding: 0px 20px;
  height: calc(100% - 60px);
`;

const TitleText = styled(motion.p)`
  font-size: 28px;
  font-weight: 700;
  line-height: 130%;
`;

const SmallText = styled.p`
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0px;
  line-height: 160%;
  margin-top: 10px;
`;

const TitleContainer = styled(motion.div)`
  width: 100%;
  text-align: left;
  margin-top: 20px;
`;

const LoadingContainer = styled.div`
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
`;

const ButtonContainer = styled(motion.div)`
  position: absolute;
  width: calc(100% - 40px);
  bottom: 0;
  margin: 0px 20px 20px 20px;
  display: flex;
  gap: 15px;
  background-color: white;
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

export default ResultLoading;
