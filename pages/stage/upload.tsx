import Render from "@/components/Render";
import UploadPage from "@/components/upload";
import { GetServerSideProps, Redirect } from "next";
import React from "react";

function Home() {
  return <Render render={UploadPage} />;
}

export default Home;
