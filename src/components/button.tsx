import styled from "styled-components";

const accentColor = "rgb(var(--color-twitter))";

const Button = styled.button<{ $variant: "primary" | "secondary" }>`
  cursor: pointer;
  border-radius: 9999px;
  border-style: solid;
  border-width: 1px;
  background-color: ${(props) =>
    props.$variant === "primary" ? accentColor : "white"};
  border-color: ${accentColor};
  color: ${(props) => (props.$variant === "primary" ? "white" : accentColor)};
  display: inline-flex;
  align-items: center;
  font: inherit;
  font-weight: bold;
  min-height: 36px;
  justify-content: center;
  min-width: 72px;
  outline-style: none;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  padding: 0 30px;
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  text-decoration: none;
  transition: background-color 0.2s;
  &:hover {
    background-color: ${(props) =>
      props.$variant === "primary"
        ? "rgb(26, 145, 218)"
        : "rgba(var(--color-twitter), 0.1)"};
  }
`;

export default Button;