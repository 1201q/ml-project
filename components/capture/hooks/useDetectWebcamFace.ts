import { useRef, useEffect, RefObject } from "react";
import * as faceapi from "face-api.js";
import Webcam from "react-webcam";
import { SetState } from "@/types/types";

const useDetectWebcamFace = (
  webcamRef: RefObject<Webcam>,
  canvasRef: RefObject<HTMLCanvasElement>,
  isStop: boolean,
  setScore: SetState<number>,
  setIsTiltingFace: SetState<boolean>
) => {
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!isStop) {
      intervalRef.current = setInterval(detectFace, 150);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isStop]);

  const detectFace = async () => {
    const videoRef = webcamRef.current?.video;
    const detecterRef = canvasRef.current;

    if (videoRef && detecterRef) {
      const detectionPromise: any = faceapi
        .detectSingleFace(
          videoRef as faceapi.TNetInput,
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceLandmarks(true);

      const displaySize = {
        width: videoRef.clientWidth,
        height: videoRef.clientHeight,
      };

      detectionPromise
        .then(async (detections: any) => {
          if (detections) {
            const box = detections?.detection.box;
            const detection = detections?.detection;

            if (
              box &&
              box.x !== null &&
              box.y !== null &&
              box.width !== null &&
              box.height !== null
            ) {
              getIsTiltingFace(calculateFaceAngle(detections?.landmarks));

              const resizedDetection: faceapi.FaceDetection =
                faceapi.resizeResults(detection, displaySize);

              // const resizedLandmark: faceapi.FaceLandmarks =
              //   faceapi.resizeResults(detections, displaySize);

              const context = detecterRef.getContext("2d");
              if (context) {
                context.clearRect(0, 0, detecterRef.width, detecterRef.height);
                const drawBox = new faceapi.draw.DrawBox(resizedDetection.box, {
                  lineWidth: 3,
                  boxColor: "#0339fc",
                });
                drawBox.draw(detecterRef);
                // faceapi.draw.drawFaceLandmarks(detecterRef, resizedLandmark);
              }
              setScore(detection.score * 100);
            }
          } else {
            const context = detecterRef.getContext("2d");
            if (context) {
              context.clearRect(0, 0, detecterRef.width, detecterRef.height);
            }
            setScore(NaN);
          }
        })
        .catch((error: Error) => {
          console.error(error);
        });
    }
  };

  function calculateFaceAngle(mesh: any) {
    const radians = (a1: number, a2: number, b1: number, b2: number) =>
      Math.atan2(b2 - a2, b1 - a1);

    const angle = {
      roll: <number | undefined>undefined,
      pitch: <number | undefined>undefined,
    };

    if (!mesh || !mesh.positions || mesh.positions.length !== 68) return angle;
    const pt = mesh.positions;

    angle.roll = radians(pt[36].x, pt[36].y, pt[45].x, pt[45].y);
    angle.pitch = radians(
      pt[30].x - pt[0].x,
      pt[27].y - pt[0].y,
      pt[16].x - pt[30].x,
      pt[27].y - pt[16].y
    );

    return angle;
  }

  const getIsTiltingFace = (angle: {
    roll: number | undefined;
    pitch: number | undefined;
  }) => {
    if (angle.roll && Math.abs(angle.roll) > 0.24) {
      setIsTiltingFace(true);
    } else {
      setIsTiltingFace(false);
    }
  };
};

export default useDetectWebcamFace;
