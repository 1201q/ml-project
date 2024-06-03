import { useRef, useEffect, RefObject } from "react";
import * as faceapi from "face-api.js";
import Webcam from "react-webcam";

interface PropsType {
  webcamRef: RefObject<Webcam>;
  canvasRef: RefObject<HTMLCanvasElement>;
  isStop: boolean;
}

const useDetectCamera = ({ webcamRef, canvasRef, isStop }: PropsType) => {
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  useEffect(() => {
    if (!isStop) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    }

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isStop]);

  const animate = (time: number) => {
    if (previousTimeRef.current != undefined) {
      const deltaTime = time - previousTimeRef.current;

      if (deltaTime >= 50) {
        detectFace();
        previousTimeRef.current = time;
      }
    } else {
      previousTimeRef.current = time;
    }
    requestRef.current = requestAnimationFrame(animate);
  };

  const detectFace = async () => {
    const videoRef = webcamRef.current?.video;
    const detecterRef = canvasRef.current;

    if (videoRef && detecterRef) {
      const detectionPromise: any = faceapi.detectSingleFace(
        videoRef as faceapi.TNetInput,
        new faceapi.TinyFaceDetectorOptions({ scoreThreshold: 0.45 })
      );

      const displaySize = {
        width: videoRef.clientWidth,
        height: videoRef.clientHeight,
      };

      detectionPromise
        .then(async (detections: any) => {
          if (detections) {
            const box = detections?.box;

            if (
              box &&
              box.x !== null &&
              box.y !== null &&
              box.width !== null &&
              box.height !== null
            ) {
              const resizedDetection: faceapi.FaceDetection =
                faceapi.resizeResults(detections, displaySize);

              const context = detecterRef.getContext("2d");
              if (context) {
                context.clearRect(0, 0, detecterRef.width, detecterRef.height);
                const drawBox = new faceapi.draw.DrawBox(resizedDetection.box, {
                  lineWidth: 1,
                  boxColor: "white",
                });
                drawBox.draw(detecterRef);
              }
            }
          } else {
            const context = detecterRef.getContext("2d");
            if (context) {
              context.clearRect(0, 0, detecterRef.width, detecterRef.height);
            }
          }
        })
        .catch((error: Error) => {
          console.error(error);
        });
    }
  };
};

export default useDetectCamera;
