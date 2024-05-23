import Render from "@/components/Render";
import UploadPage from "@/components/upload";
import { GetServerSideProps, Redirect } from "next";
import React from "react";

function Home() {
  return <Render render={UploadPage} />;
}

// export const getServerSideProps: GetServerSideProps = async (
//   ctx: any
// ): Promise<{ redirect: Redirect }> => {
//   const access = ctx?.query.access ? true : false;

//   if (!access) {
//     return { redirect: { destination: "/terms", permanent: false } };
//   }

//   return { redirect: { destination: "", permanent: false } };
// };
export default Home;
