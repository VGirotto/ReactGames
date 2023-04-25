import { Text, TextContainer } from "@/components/AnimatedTexts/styles";

interface AnimatedTextProps {
  text: string;

  active: Boolean;

  color?: string;
}

export default function AnimatedText(props: AnimatedTextProps) {
  return (
    <TextContainer>
      <Text active={props.active} color={props.color}>
        {props.text}
      </Text>
    </TextContainer>
  );
}
