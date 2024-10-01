import styled from 'styled-components';

export const Text = styled.p<{ size?: string }>`
  font-weight: ${(props) =>
    props.size == 'large' ? '700' : props.size == 'medium' ? '500' : '0'};
  font-size: ${(props) =>
    props.size == 'large' ? '2rem' : props.size == 'medium' ? '1.5rem' : '0'};
`;
