import Render from "@/components/Render";
import CapturePage from "@/components/capture";
import { isModelDownloadedAtom } from "@/context/atoms";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import * as faceapi from "face-api.js";
import { GetServerSideProps, Redirect } from "next";
import LoadingPage from "@/components/loading";

function Home() {
  const [isModelDownloaded, setIsModelDownloaded] = useAtom(
    isModelDownloadedAtom
  );
  const init = async () => {
    console.log("실행");
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
    ])
      .then(() => {
        console.log("로드완료");
        setIsModelDownloaded(true);
      })
      .catch(() => {
        console.log("로드실패");
        setIsModelDownloaded(false);
      });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      {isModelDownloaded ? (
        <Render render={CapturePage} />
      ) : (
        <Render render={LoadingPage} text="모델을 다운로드 중이에요" />
      )}
    </>
  );
}

// export const getServerSideProps: GetServerSideProps = async (
//   ctx: any
// ): Promise<any> => {
//   // const access = ctx?.query.access ? true : false;
//   // if (!access) {
//   //   return { redirect: { destination: "/terms", permanent: false } };
//   // }
//   // return { redirect: { destination: "", permanent: false } };
// };
export default Home;
