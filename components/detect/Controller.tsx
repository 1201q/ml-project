import { SetState } from "@/types/types";
import nextURLPush from "@/utils/nextURLPush";
import { motion } from "framer-motion";
import styled from "styled-components";

type MenuType = {
  menu: string;
  select: boolean;
};

interface PropsType {
  menu: MenuType[];
  setMenu: SetState<MenuType[]>;
}

const Controller: React.FC<PropsType> = ({ menu, setMenu }) => {
  return (
    <Container>
      <CenterMenu></CenterMenu>
      <ControllerBtnContainer
        initial={{ x: menu[0].select ? 41 : -41 }}
        animate={{ x: menu[0].select ? 41 : -41 }}
        transition={{
          duration: 0.15,
        }}
      >
        {menu.map((item, index) => (
          <Menu
            key={item.menu}
            onClick={() => {
              setMenu((prev) => {
                const updatedMenu = prev.map((item, mindex) => {
                  return { ...item, select: mindex === index };
                });
                return updatedMenu;
              });
            }}
            $isselect={item.select}
          >
            {item.menu}
          </Menu>
        ))}
      </ControllerBtnContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 190px;
  position: relative;
`;

const ControllerBtnContainer = styled(motion.button)`
  display: flex;
  margin-top: 20px;
  height: 32px;
  gap: 10px;
`;

const Menu = styled(motion.label)<{ $isselect: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: ${(props) => (props.$isselect ? "white" : "gray")};
  min-width: 72px;
  height: 32px;
  border-radius: 16px;
  cursor: pointer;
`;

const CenterMenu = styled.div`
  background-color: #333333;
  height: 32px;
  min-width: 72px;
  border-radius: 16px;
  position: absolute;
  top: 20px;
`;

export default Controller;
