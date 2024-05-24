import { SizeType } from "@/types/types";
import { atom } from "jotai";

export const imgSrcAtom = atom<string | null>(null);
export const imgSizeAtom = atom<SizeType | null>(null);

export const isModelDownloadedAtom = atom(false);
export const capturedImageAtom = atom<
  { src: string; width: number; height: number } | undefined
>(undefined);
export const detectedFaceImageAtom = atom<
  | { src: string; width: number; height: number; x: number; y: number }
  | undefined
>(undefined);
export const detectedFaceDataAtom = atom<any | undefined>(undefined);

export const uploadedImageAtom = atom<
  { src: string; width: number; height: number } | undefined
>(undefined);
