import styled, { keyframes } from "styled-components";

interface ConfettiProps {
  origin: string;
  rotate: string;
  marginTop: number;
  marginRight: number;
}

export const Modal = styled.div`
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-width: 1px;
  border-radius: 2%;
  border-color: black;
  border-style: outset;
  text-align: center;
  z-index: 1000;
`;

export const ModalTitle = styled.div`
  background-color: azure;
  color: darkcyan;
  font-size: 22px;
  font-weight: 500;
  padding: 20px 80px;
  border-style: solid;
  border-color: black;
  border-width: 1px;
  text-decoration: underline;
`;

export const ModalText = styled.div`
  background-color: darkcyan;
  color: white;
  font-size: 16px;
  font-weight: 400;
  padding: 50px 80px;
  border-style: solid;
  border-color: black;
  border-width: 1px;
`;

const confettiAnimation = (margin: number) => keyframes`
    from {
      width: 10px;
      margin-right: ${margin}px;
    }
    to {
      width: 50px;
      margin-right: ${margin - (margin >= 0 ? -20 : 20)}px;
    }
`;

export const Confetti = styled.div<ConfettiProps>`
  top: ${(props) => props.marginTop}px;
  position: fixed;
  background-color: orange;
  height: 5px;
  animation-name: ${(props) => confettiAnimation(props.marginRight)};
  animation-duration: 1.5s;
  animation-iteration-count: 3;
  transform-origin: ${(props) => props.origin};
  transform: rotate(${(props) => props.rotate});
  z-index: 1001;
  border-radius: 50px;
`;
