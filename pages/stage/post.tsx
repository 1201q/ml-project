import Render from "@/components/Render";
import ResultLoading from "@/components/ResultLoading";
import { GetServerSideProps } from "next";

const Post = ({ gender }: { gender: "male" | "female" }) => {
  return <Render render={ResultLoading} gender={gender} />;
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: any
): Promise<any> => {
  const gender = ctx?.query.gender;

  if (gender) {
    return { props: { gender: gender } };
  } else {
    return { redirect: { destination: "/", permanent: false } };
  }
};

export default Post;
