import styled from "styled-components";

interface MazeRowProps {
  size: number;
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
