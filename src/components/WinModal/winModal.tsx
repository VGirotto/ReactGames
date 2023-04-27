import { Confetti, Modal, ModalText, ModalTitle } from "./styles";
import { msToMinutes } from "@/utils/formatter";

interface WinModalProps {
  size: number;
  time: number;
}
export default function WinModal(props: WinModalProps) {
  return (
    <>
      <Confetti
        origin={"right"}
        rotate={"150deg"}
        marginTop={280}
        marginRight={-175}
      />
      <Confetti
        origin={"right"}
        rotate={"150deg"}
        marginTop={305}
        marginRight={-200}
      />
      <Confetti
        origin={"right"}
        rotate={"150deg"}
        marginTop={330}
        marginRight={-225}
      />
      <Confetti
        origin={"left"}
        rotate={"210deg"}
        marginTop={280}
        marginRight={175}
      />
      <Confetti
        origin={"left"}
        rotate={"210deg"}
        marginTop={305}
        marginRight={200}
      />
      <Confetti
        origin={"left"}
        rotate={"210deg"}
        marginTop={330}
        marginRight={225}
      />

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
