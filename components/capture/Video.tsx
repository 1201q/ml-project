import { RefObject, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { SetState } from "@/types/types";
import * as faceapi from "face-api.js";

interface VideoPropsType {
  setIsReadyCamera: SetState<boolean>;
  webcamRef: RefObject<Webcam>;
}

const Video: React.FC<VideoPropsType> = ({ setIsReadyCamera, webcamRef }) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [score, setScore] = useState(0);
  let isComponentUnmounted = false;

  useEffect(() => {
    detect();

    return () => {
      isComponentUnmounted = true;
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  const detect = async () => {
    const ref = webcamRef.current?.video;

    if (ref && !timerRef.current) {
      timerRef.current = setInterval(async () => {
        if (isComponentUnmounted) {
          clearInterval(timerRef.current!);
          return;
        }
        const detections = await faceapi
          .detectAllFaces(
            ref as faceapi.TNetInput,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceLandmarks();
        setScore(detections[0]?.detection.classScore * 100);
      }, 100);
    }
  };

  return (
    <>
      <Webcam
        ref={webcamRef}
        mirrored={true}
        videoConstraints={{
          facingMode: "user",
        }}
        screenshotQuality={100}
        screenshotFormat="image/jpeg"
        onCanPlay={() => setIsReadyCamera(true)}
      />
      <p style={{ position: "absolute", top: 0, color: "white" }}>
        {score ? `${score.toFixed()}%` : "없음"}
      </p>
    </>
  );
};

export default Video;
