import styled from "styled-components";

export const Button = styled.button((props) => ({
  background: "transparent",
  borderRdadius: "3px",
  border: "2px solid #bf4f74",
  color: props.disabled ? "grey" : "#bf4f74",
  margin: "0 1em",
  padding: "0.25em 1em",
  cursor: props.disabled ? "not-allowed" : "pointer",
}));
