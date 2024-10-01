import styled from 'styled-components';

export const Radio = styled.input`
  ${(props) =>
    props.type === 'radio' &&
    `
    appearance: none;
    background-color: #fff;
    margin: 0;
    font: inherit;
    color: currentColor;
    width: 1.15em;
    height: 1.15em;
    border: 0.15em solid currentColor;
    border-radius: 50%;
    transform: translateY(-0.075em);
    display: grid;
    place-content: center;
 
 &::before {
    content: "";
    width: 0.65em;
    height: 0.65em;
    border-radius: 50%;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em black;
    background-color: CanvasText;
  }

  &:checked::before {
    transform: scale(1);
  }
  
  &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
  }
`}
  margin-right: 6px;
`;
