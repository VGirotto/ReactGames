import styled from "styled-components";

interface TextFieldProps {
  bold?: boolean;
  size?: string;
}

interface RowProps {
  marginTop?: string;
  justify?: string;
}

interface ColumnProps {
  width?: string;
}

interface ButtonProps {
  bold?: boolean;
  size?: string;
  width?: string;
  bgcolor?: string;
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
  margin: 0px;
`;

export const Row = styled.div<RowProps>`
  margin-top: ${(props) => props.marginTop ?? "0px"};
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: ${(props) => props.justify ?? "center"};
  width: 100%;
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
  width: 100px;
  height: 20px;
  text-align: center;
`;

export const Button = styled.button<ButtonProps>`
  height: 35px;
  width: ${(props) => props.width ?? "180px"};
  font-size: ${(props) => props.size ?? "13px"};
  font-weight: ${(props) => (props.bold ? "700" : "400")};
  background-color: ${(props) => props.bgcolor ?? "#cccccc"};
`;

export const Column = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
`;

export const InnerColumn = styled.div<ColumnProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${(props) => props.width ?? "200px"};
`;

export const Timer = styled.div`
  font-size: 20px;
  left: 198px;
  position: relative;
  margin-bottom: 5px;
`;

export const ErrorSize = styled.h4`
  font-weight: 500;
  color: red;
  font-size: 16px;
  font-style: italic;
  height: 100%;
  margin: 0px;
`;

export const ErrorContainer = styled.div`
  margin-top: 0px;
  margin-left: 175px;
  height: 20px;
`;
