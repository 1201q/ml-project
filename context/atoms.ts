import { PredictDataType } from "@/types/types";
import { atom } from "jotai";

export const isModelDownloadedAtom = atom(false);
export const capturedImageAtom = atom<{
  src: string;
  width: number;
  height: number;
} | null>(null);
export const uploadedImageAtom = atom<{
  src: string;
  width: number;
  height: number;
  blob?: Blob;
} | null>(null);
export const detectedFaceImageAtom = atom<{
  src: string;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  blob?: Blob;
} | null>(null);

export const predictDataAtom = atom<PredictDataType | null>(null);
