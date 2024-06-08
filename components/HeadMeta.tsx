import Head from "next/head";
import React from "react";

interface MetaProps {
  title?: string;
  description?: string;
}

const HeadMeta: React.FC<MetaProps> = ({ title, description }) => {
  return (
    <Head>
      <title>
        {title || "AI로 연예인 닮은꼴 찾기 - 세상에 나쁜 얼굴은 없다"}
      </title>
      <meta
        name="description"
        content={description || "AI로 연예인 닮은꼴을 찾아보세요!"}
      />
    </Head>
  );
};
export default HeadMeta;
