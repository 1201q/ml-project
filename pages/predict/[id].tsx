import { dbService } from "@/utils/firebase";
import { doc, getDoc } from "firebase/firestore";

import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { ExtendedPredictDataType } from "@/types/types";
import { useHydrateAtoms } from "jotai/utils";
import { predictDataAtom } from "@/context/atoms";
import Render from "@/components/Render";
import ResultPage from "@/components/ResultPage";

const Predict = ({ data }: { data: ExtendedPredictDataType }) => {
  useHydrateAtoms([[predictDataAtom, data]], { dangerouslyForceHydrate: true });
  return <Render render={ResultPage} isSharePage={true} name={data.name} />;
};
const getData = async (id: string) => {
  try {
    const docRef = doc(dbService, "predict_results", id);
    const data = await getDoc(docRef);

    if (data.data()) {
      return data.data();
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const id = ctx.query.id as string;

  const data = await getData(id);

  if (data) {
    return { props: { data } };
  } else {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};
export default Predict;
