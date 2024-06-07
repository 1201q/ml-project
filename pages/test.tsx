import { dbService } from "@/utils/firebase";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { useEffect } from "react";

const Test = ({ data1 }) => {
  console.log(data1);
  return <div>!</div>;
};

const data = async () => {
  try {
    const docRef = doc(dbService, "predict_results", "lOBaLNxT6JFIsL7bpDd2");
    const data = await getDoc(docRef);

    console.log(data.data());

    if (data.data()) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getServerSideProps = async () => {
  const data1 = await data();
  return { props: { data1 } };
};

export default Test;
