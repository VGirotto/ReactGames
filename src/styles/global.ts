import styled from "styled-components";

interface TextFieldProps {
  bold?: boolean;
  size?: string;
}

interface RowProps {
  marginTop?: string;
}

interface MazeRowProps {
  size: number;
}

export const Title = styled.h1`
  font-size: 40px;
  color: darkslategray;
  text-align: center;
`;

export const TextField = styled.h3<TextFieldProps>`
  font-size: ${(props) => props.size ?? "20px"};
  color: black;
  font-weight: ${(props) => (props.bold ? "700" : "400")};
  text-align: center;
`;

export const Row = styled.div<RowProps>`
  margin-top: ${(props) => props.marginTop ?? "0px"};
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export const InputNumberField = styled.input.attrs((props) => ({
  type: "number",
  defaultValue: props.defaultValue,
}))`
  margin-left: 20px;
  width: 45px;
  height: 20px;
  padding-left: 30px;
`;

export const InputTextField = styled.input.attrs({
  type: "text",
  placeholder: "AWSD",
})`
  width: 20%;
  height: 20px;
  text-align: center;
`;

export const Button = styled.button`
  height: 35px;
  width: 180px;
  font-weight: 700;
`;

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

export const Column = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  display: flex;
  justify-items: center;
  flex-direction: column;
  align-items: center;
`;

export const Timer = styled.div`
  font-size: 20px;
  left: 198px;
  position: relative;
  margin-bottom: 5px;
`;

export const ErrorSize = styled.h4`
  margin-left: 10px;
  font-weight: 500;
  color: red;
  font-size: 16px;
  font-style: italic;
`;
