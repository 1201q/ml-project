import styled from "styled-components";
import Refresh from "@/public/refresh.svg";
import { SetState } from "@/types/types";
import { AnimatePresence, motion } from "framer-motion";
import useOutSideClick from "./hooks/useOutSideClick";
import { useRef } from "react";

interface PropsType {
  isCameraSettingModalOpen: boolean;
  setIsCameraSettingModalOpen: SetState<boolean>;
  devices: MediaDeviceInfo[];
  selectDevice: MediaDeviceInfo | undefined;
  setSelectDevice: SetState<MediaDeviceInfo | undefined>;
  isMirrored: boolean;
  setIsMirrored: SetState<boolean>;
}

const CameraSetting: React.FC<PropsType> = ({
  setIsCameraSettingModalOpen,
  isCameraSettingModalOpen,
  devices,
  selectDevice,
  setSelectDevice,
  isMirrored,
  setIsMirrored,
}) => {
  const modalRef = useRef(null);
  useOutSideClick([modalRef], () => {
    setIsCameraSettingModalOpen(false);
  });

  return (
    <Container>
      <CameraChangeBtn
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setIsCameraSettingModalOpen((prev) => !prev);
        }}
      >
        <Refresh width={20} height={20} fill={"white"} />
      </CameraChangeBtn>
      <AnimatePresence>
        {isCameraSettingModalOpen && (
          <Modal
            ref={modalRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
          >
            {devices?.map((option) => (
              <ModalOption
                whileTap={{ scale: 0.95, backgroundColor: "#f2f4f6" }}
                key={option.label}
                $isselect={selectDevice?.deviceId === option?.deviceId}
                onClick={() => {
                  setSelectDevice(option);
                  setIsCameraSettingModalOpen(false);
                }}
              >
                {option.label}{" "}
                {selectDevice?.deviceId === option?.deviceId && "(현재)"}
              </ModalOption>
            ))}
            <ButtonContainer>
              <ModalButton
                isMirroed={!isMirrored}
                onClick={() => {
                  setIsMirrored(false);
                }}
              >
                좌우반전 끄기
              </ModalButton>
              <ModalButton
                isMirroed={isMirrored}
                onClick={() => {
                  setIsMirrored(true);
                }}
              >
                좌우반전 켜기
              </ModalButton>
            </ButtonContainer>
          </Modal>
        )}
      </AnimatePresence>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;
  z-index: 100;
  display: flex;
  flex-direction: column;

  align-items: flex-end;
`;

const CameraChangeBtn = styled(motion.button)`
  width: 42px;
  height: 42px;

  background-color: rgba(0, 0, 0, 0.3);

  border-radius: 50%;

  svg {
    z-index: 400;
  }
`;

const Modal = styled(motion.ul)`
  min-width: 150px;
  height: 100%;
  margin-top: 10px;
  background-color: white;
  border-radius: 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding: 8px 5px;
`;

const ModalOption = styled(motion.li)<{ $isselect: boolean }>`
  display: flex;
  align-items: center;
  height: 20px;
  font-size: 13px;
  cursor: pointer;
  background-color: white;
  border-radius: 7px;
  padding: 5px 8px;
  color: ${(props) => (props.$isselect ? "rgb(49,130,246)" : "black")};
  font-weight: ${(props) => (props.$isselect ? "500" : "300")};
`;

const ButtonContainer = styled.div`
  display: flex;
  margin: 4px 5px;
  gap: 7px;
`;

const ModalButton = styled(motion.button)<{ isMirroed: boolean }>`
  width: calc(100% - 10px);
  padding: 7px 8px;
  border-radius: 7px;
  background-color: ${(props) =>
    props.isMirroed ? "rgb(49, 130, 246)" : "#e8f3ff"};
  text-align: center;
  color: ${(props) => (props.isMirroed ? "white" : "#3182f6")};
`;

export default CameraSetting;
