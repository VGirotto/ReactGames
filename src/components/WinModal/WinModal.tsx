import { Modal, ModalText, ModalTitle } from "./styles";

export interface WinModalProps {
  size: number;
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
          Your time was 00:00 <br />
          in a maze {props.size}x{props.size}
        </ModalText>
      </Modal>
    </>
  );
}
