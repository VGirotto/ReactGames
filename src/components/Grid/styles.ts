import styled from "styled-components";

interface MazeRowProps {
  size: number;
}

interface BgColorProps {
  bgcolor: string;
}

export const MazeRow = styled.div<MazeRowProps>`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  height: calc(100% / ${(props) => props.size});
`;

export const CellComponent = styled.div`
  background-color: ${(props) => props.color};
  height: 100%;
  width: 100%;
`;

export const Table = styled.div`
  width: 100%;
  height: 100%;
`;

export const Frame = styled.div`
  border: 2px solid black;
  width: 500px;
  height: 500px;
  overflow: hidden;
  background-color: darkcyan;
`;

export const Player = styled.div<BgColorProps>`
  height: 100%;
  width: 100%;
  background-color: ${props => props.bgcolor};
  position: relative;

  &::after {
    content: "";
    background-color: red;
    height: 50%;
    width: 50%;
    position: absolute;
    left: 25%;
    top: 25%;
  }
`;

export const PlayerLegs = styled.div`
  height: 20%;
  width: 20%;
  background-color: red;
  position: absolute;
  left: 25%;
  top: 75%;

  &::after {
    content: "";
    background-color: red;
    height: 100%;
    width: 90%;
    position: absolute;
    left: 160%;
    top: 0%;
  }
`;

export const PlayerEyes = styled.div`
  height: 5%;
  width: 5%;
  background-color: black;
  position: absolute;
  left: 40%;
  top: 40%;
  z-index: 1;

  &::after {
    content: "";
    background-color: black;
    height: 100%;
    width: 100%;
    position: absolute;
    left: 350%;
    top: 0%;
  }
`;

export const EndCell = styled.div<BgColorProps>`
  height: 100%;
  width: 100%;
  background-color: ${props => props.bgcolor};
  position: relative;

  &::before {
    content: "";
    background-color: orange ;
    height: 50%;
    width: 50%;
    position: absolute;
    left: 25%;
    top: 30%;
    border-radius: 50%;
  }

  &::after {
    content: "";
    background-color: orange;
    height: 50%;
    width: 50%;
    position: absolute;
    left: 25%;
    top: 50%;
  }
`;