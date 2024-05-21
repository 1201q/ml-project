import { useEffect } from "react";

const Page = () => {
  useEffect(() => {
    fetch(
      "https://asia-northeast3-deft-falcon-423303-b3.cloudfunctions.net/ml"
    ).then((response) => response.text());
  }, []);
  return <div>1</div>;
};

export default Page;
