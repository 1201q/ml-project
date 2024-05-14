import Render from "@/components/Render";
import React from "react";
import { GetServerSideProps, GetServerSidePropsContext, Redirect } from "next";
import { getIsCorrectCookie } from "@/utils/cookies";

function Terms() {
  return <Render />;
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
): Promise<{ redirect: Redirect } | { props: any }> => {
  const cookies = ctx.req.headers.cookie;
  const isAgreeTerms = getIsCorrectCookie(cookies, "terms", "true");

  if (isAgreeTerms) {
    return { redirect: { destination: "/select_image", permanent: false } };
  }

  return {
    props: {},
  };
};

export default Terms;
