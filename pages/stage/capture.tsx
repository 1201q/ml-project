import Render from "@/components/Render";

import { isModelDownloadedAtom } from "@/context/atoms";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import * as faceapi from "face-api.js";
import { GetServerSideProps, Redirect } from "next";
import LoadingPage from "@/components/loading";
import CameraPage from "@/components/detect/CameraPage";

function Home() {
  const [isModelDownloaded, setIsModelDownloaded] = useAtom(
    isModelDownloadedAtom
  );
  const init = async () => {
    await Promise.all([
      faceapi.nets.ageGenderNet.loadFromUri("/models"),
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68TinyNet.loadFromUri("/models"),
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
        <Render render={CameraPage} />
      ) : (
        <Render render={LoadingPage} text="모델을 불러오고 있어요" />
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
