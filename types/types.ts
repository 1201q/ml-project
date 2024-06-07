import { Dispatch, SetStateAction } from "react";

export interface SizeType {
  width: number;
  height: number;
}

export interface DetectBoxDataType {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type StageType = "select" | "capture" | "import";
export type SetState<T> = Dispatch<SetStateAction<T>>;

export interface PredictDataType {
  rank: PredictionsType[];
  gender: "male" | "female";
}

export interface PredictionsType {
  rank: number;
  name: string;
  probability: number;
}

export interface ExtendedPredictDataType extends PredictDataType {
  name: string;
}
