import { Modal, ModalText, ModalTitle } from "./styles";
import { msToMinutes } from "@/utils/formatter";

interface WinModalProps {
  size: number;
  time: number;
}
export default function WinModal(props: WinModalProps) {
  return (
    <>
      <Modal>
        <ModalTitle>
          You did it!
          <br />
          Congratulations!
        </ModalTitle>

        <ModalText>
          Your time was {msToMinutes(props.time)} <br />
          in a maze {props.size}x{props.size}
        </ModalText>
      </Modal>
    </>
  );
}
