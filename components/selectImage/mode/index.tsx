import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import Header from "../../Header";
import { useState } from "react";

import SelectModeModal from "./SelectModeModal";

const SelectImagePage = () => {
  const [isVisibleModal, setIsVisibleModal] = useState(true);

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
