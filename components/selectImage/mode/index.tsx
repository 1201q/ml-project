import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import Header from "../../Header";
import { useEffect, useState } from "react";

import SelectModeModal from "./SelectModeModal";
import { useSetAtom } from "jotai";
import { imgSizeAtom, imgSrcAtom } from "@/context/atoms";

const SelectImagePage = () => {
  const [isVisibleModal, setIsVisibleModal] = useState(true);
  const setImgSrcAtom = useSetAtom(imgSrcAtom);
  const setImgSizeAtom = useSetAtom(imgSizeAtom);

  useEffect(() => {
    setImgSizeAtom(null);
    setImgSrcAtom(null);
  }, []);

  return (
    <Container>
      <Header currentMenu={"이미지 업로드"} />
      <AnimatePresence>{isVisibleModal && <SelectModeModal />}</AnimatePresence>
    </Container>
  );
};

const Container = styled(motion.div)`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export default SelectImagePage;
