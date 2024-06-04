import Render from "@/components/Render";
import ResultPage from "@/components/ResultPage";
import { predictDataAtom } from "@/context/atoms";
import { useAtom } from "jotai";

const Result = () => {
  return <Render render={ResultPage} />;
};

export default Result;
