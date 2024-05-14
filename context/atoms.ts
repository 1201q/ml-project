import { SizeType } from "@/types/types";
import { atom } from "jotai";

export const imgSrcAtom = atom<string | null>(null);
export const imgSizeAtom = atom<SizeType | null>(null);
