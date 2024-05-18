import styled from "styled-components";
import Header from "../Header";
import Terms from "./Terms";
import { motion } from "framer-motion";

const TermsPage = () => {
  return (
    <Container initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Header currentMenu={"이용약관"} />
      <Terms />
    </Container>
  );
};

const Container = styled(motion.div)`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export default TermsPage;
