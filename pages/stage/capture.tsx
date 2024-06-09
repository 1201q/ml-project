import Render from "@/components/Render";
import { isModelDownloadedAtom } from "@/context/atoms";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import * as faceapi from "face-api.js";

import dynamic from "next/dynamic";
const ModelLoading = dynamic(() => import("@/components/ModelLoading"), {
  loading: () => (
    <div
      style={{ width: "100%", height: "100%", backgroundColor: "black" }}
    ></div>
  ),
});
const CameraPage = dynamic(() => import("@/components/CameraPage"), {
  loading: () => (
    <div
      style={{ width: "100%", height: "100%", backgroundColor: "black" }}
    ></div>
  ),
});

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
