import { Dispatch, SetStateAction } from "react";

export interface SizeType {
  width: number;
  height: number;
  aspectRatio: number;
}

export type StageType = "select" | "capture" | "import";
export type SetState<T> = Dispatch<SetStateAction<T>>;
