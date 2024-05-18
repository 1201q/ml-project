import { SizeType } from "@/types/types";
import { atom } from "jotai";
import * as faceapi from "face-api.js";

export const imgSrcAtom = atom<string | null>(null);
export const imgSizeAtom = atom<SizeType | null>(null);

export const isModelDownloadedAtom = atom(false);
