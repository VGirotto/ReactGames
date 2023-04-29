import styled, { keyframes } from "styled-components";

interface TextProps {
  active: Boolean;
  color?: string;
}

export const TextContainer = styled.div`
  width: 300px;
  height: 50px;
  position: fixed;
  top: 40%;
  margin-left: auto;
  margin-right: auto;
  z-index: 1005;
`;

const animation = keyframes`
    0% {
      text-shadow: none;
      font-size: 20px;
    }
    50% {
      text-shadow: none;
    }
    99% {
      font-size: 40px;
      text-shadow: 2px 0 #000, -2px 0 #000, 0 2px #000, 0 -2px #000, 1px 1px #000,
        -1px -1px #000, 1px -1px #000, -1px 1px #000;
      opacity: 1;
    }
    100% {
      text-shadow: none;
      font-size: 0px;
      opacity: 0;
    }
`;
export const Text = styled.h1<TextProps>`
  text-align: center;
  color: ${(props) => props.color ?? "#46ccff"};
  animation-name: ${(props) => (props.active ? animation : "")};
  animation-duration: 1.5s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  font-size: ${(props) => (props.active ? "" : "0px")};
`;
