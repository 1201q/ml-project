import { motion } from "framer-motion";
import { FormEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useOutSideClick from "./hooks/useOutSideClick";
import { useAtom } from "jotai";
import { predictDataAtom } from "@/context/atoms";
import { dbService } from "@/utils/firebase";
import { addDoc, collection, doc } from "firebase/firestore";
import { PuffLoader } from "react-spinners";
import { useRouter } from "next/router";
import React from "react";

const ShareModal = () => {
  const router = useRouter();
  const modalRef = useRef(null);
  const [name, setName] = useState("");
  const [predictData, setPredictData] = useAtom(predictDataAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [dbid, setDbId] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (name.length >= 2 && predictData) {
      const data = {
        ...predictData,
        name: name,
      };

      setIsLoading(true);
      const dataRef = collection(dbService, "predict_results");

      try {
        const add = await addDoc(dataRef, data);

        setIsLoading(false);
        setIsComplete(true);
        setDbId(add.id);
      } catch (error) {
        console.log(`실패`, error);
        setIsLoading(false);
        setIsComplete(false);
      }
    }
  };

  useOutSideClick([modalRef], () => {
    router.back();
  });

  useEffect(() => {
    return () => {
      setDbId(null);
    };
  }, []);

  const onCopy = () => {
    const origin = window.location.origin;
    navigator.clipboard
      .writeText(`${origin}/predict/${dbid}`)
      .then(() => alert("URL이 복사됐어요."))
      .catch((err) => console.error("URL 복사 실패:", err));
  };

  const onShare = () => {
    const origin = window.location.origin;
    navigator.share({
      title: `${name}님이 공유 | AI로 연예인 닮은꼴 찾기 - 세상에 나쁜 얼굴은 없다`,
      url: `${origin}/predict/${dbid}`,
    });
  };

  return (
    <Container>
      <ModalContainer
        ref={modalRef}
        onSubmit={onSubmit}
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 300, scale: 0.5, transition: { duration: 0.2 } }}
      >
        {!isLoading && !isComplete && (
          <>
            <TopContainer>
              <TitleText>자신의 이름을 입력해주세요</TitleText>
            </TopContainer>
            <InputContainer>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                minLength={2}
                required
                maxLength={10}
                placeholder="이름 입력"
              />
            </InputContainer>
            <ButtonContainer>
              <Button
                bg={"rgb(49, 130, 246)"}
                font={"white"}
                whileTap={{ scale: 0.97 }}
                whileHover={{ filter: "brightness(0.8)" }}
                type="submit"
              >
                공유하기
              </Button>
            </ButtonContainer>
          </>
        )}
        {isLoading && !isComplete && (
          <LoadingContainer>
            <PuffLoader
              loading={true}
              color="rgb(49,130,246)"
              speedMultiplier={1}
              size={70}
            />
          </LoadingContainer>
        )}
        {!isLoading && isComplete && (
          <>
            <TopContainer>
              <TitleText>링크 생성 완료!</TitleText>
            </TopContainer>
            <ContentsContainer>
              <LinkRow>
                <p>URL 복사하기</p>
                <ContentsButton
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={onCopy}
                >
                  복사하기
                </ContentsButton>
              </LinkRow>
              <LinkRow>
                <p>SNS로 공유하기</p>
                <ContentsButton
                  onClick={onShare}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                >
                  공유하기
                </ContentsButton>
              </LinkRow>
            </ContentsContainer>
            <ButtonContainer>
              <Button
                bg={"rgb(49, 130, 246)"}
                font={"white"}
                whileTap={{ scale: 0.97 }}
                whileHover={{ filter: "brightness(0.8)" }}
                type="button"
                onClick={() => {
                  router.back();
                }}
              >
                닫기
              </Button>
            </ButtonContainer>
          </>
        )}
      </ModalContainer>
    </Container>
  );
};
const Container = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
`;
const ModalContainer = styled(motion.form)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  bottom: 13px;
  width: calc(100% - 26px);

  background-color: white;
  z-index: 100;
  margin: 0px 13px;
  border-radius: 20px;
  overflow: hidden;
`;

const TopContainer = styled.div`
  padding: 30px 21px 10px 21px;
`;
const InputContainer = styled.div`
  height: 44px;
  margin: 15px 20px;

  input {
    height: 100%;
    width: 100%;
    font-size: 18px;
    padding: 12px 12px;
    background-color: #f2f4f6;
    border-radius: 10px;
  }

  input::placeholder {
    font-size: 18px;
  }
`;

const TitleText = styled.p`
  font-size: 22px;
  font-weight: 700;
`;
const ButtonContainer = styled.div`
  width: calc(100% - 40px);
  margin: 0px 20px 20px 20px;
  display: flex;
  gap: 10px;
  background-color: white;
`;
const Button = styled(motion.button)<{ bg: string; font: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 55px;
  border-radius: 15px;
  background-color: ${(props) => props.bg};
  color: ${(props) => props.font};
  font-size: 17px;
  font-weight: 600;
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
`;

const LoadingContainer = styled.div`
  height: 211px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 20px 20px 20px;
`;

const LinkRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 43px;

  p {
    font-size: 15px;
    margin-left: 2px;
  }
`;

const ContentsButton = styled(motion.button)`
  font-size: 13px;
  font-weight: 500;
  background-color: #f2f4f6;
  color: gray;
  border-radius: 7px;
  padding: 5px 10px;
`;

export default React.memo(ShareModal);
