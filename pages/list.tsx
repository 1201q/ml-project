import { dbService } from "@/utils/firebase";
import {
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";

import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { ExtendedPredictDataType } from "@/types/types";
import { useHydrateAtoms } from "jotai/utils";
import { predictDataAtom } from "@/context/atoms";
import Render from "@/components/Render";
import ResultPage from "@/components/ResultPage";
import ListPage from "@/components/ListPage";

const Predict = ({ data }: { data: ExtendedPredictDataType }) => {
  useHydrateAtoms([[predictDataAtom, data]], { dangerouslyForceHydrate: true });
  return <Render render={ListPage} data={data} />;
};
const getData = async (id: string) => {
  try {
    const docRef = collection(dbService, "predict_results");
    const data = await getDocs(docRef);
    const results: { id: string }[] = [];
    data.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() });
    });
    console.log(results);
    return results;
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
