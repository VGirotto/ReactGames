import styled from "styled-components";

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
