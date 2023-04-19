import styled from 'styled-components';

interface TextFieldProps {
    bold?: boolean;
    size?: string;
}

interface RowProps {
    marginTop?: string;
}

export const Title = styled.h1`
    font-size: 40px;
    color: darkslategray;
    text-align: center;
`;

export const TextField = styled.h3<TextFieldProps>`
    font-size: ${props => (props.size ?? '20px')};
    color: black;
    font-weight: ${props => (props.bold ? '700' : '400')};
    text-align: center;
`;

export const Row = styled.div<RowProps>`
    margin-top: ${props => props.marginTop ?? "0px"};
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`;

export const InputNumberField = styled.input.attrs(props => ({
    type: "number",
    defaultValue: props.defaultValue,
}))`
    margin-left: 20px;
    width: 45px;
    height: 20px;
    padding-left: 30px;
`;

export const InputTextField = styled.input.attrs(({
    type: "text",
    placeholder: "AWSD"
}))`
    width: 20%;
    height: 20px;
    text-align: center;
`;

export const Button = styled.button`
    height: 35px;
    width: 180px;
    font-weight: 700;
`;

export const CellComponent = styled.div`
    background-color: ${props => props.color};
    height: 20px;
    width: 20px;
`;

export const Table = styled.div`
    margin-top: 30px;
`;

export const Column = styled.div`
    background-color: yellow;
    display: flex;
    flex-direction: column;
`;

export const ErrorSize = styled.h4`
    margin-left: 10px;
    font-weight: 500;
    color: red;
    font-size: 16px;
    font-style: italic;
`;