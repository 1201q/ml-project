import Render from "@/components/Render";

import { isModelDownloadedAtom } from "@/context/atoms";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import * as faceapi from "face-api.js";
import ModelLoading from "@/components/ModelLoading";
import CameraPage from "@/components/CameraPage";

function Home() {
  const [isModelDownloaded, setIsModelDownloaded] = useAtom(
    isModelDownloadedAtom
  );
  const init = async () => {
    await Promise.all([faceapi.nets.tinyFaceDetector.loadFromUri("/models")])
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
        <Render render={ModelLoading} text="모델을 불러오고 있어요" />
      )}
    </>
  );
}

export default Home;
