import styled from 'styled-components';

export const Button = styled.button`
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  height: 2.5rem;
  display: inline-flex;
  cursor: pointer;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: rgb(24, 24, 27);
  border-radius: 6px;
  border: none;
  color: white;
  font-family: 'Roboto', sans-serif;

  &:disabled {
    cursor: not-allowed;
    background-color: rgb(145 145 153);
  }
`;
