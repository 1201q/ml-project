import { SizeType } from "@/types/types";
import { atom } from "jotai";

export const imgSrcAtom = atom<string | null>(null);
export const imgSizeAtom = atom<SizeType | null>(null);

export const isModelDownloadedAtom = atom(false);

export const capturedImageAtom = atom<
  { src: string; width: number; height: number } | undefined
>(undefined);
