import styled from "styled-components";

export const StyledFilter = styled.p`
  color: rgba(25, 130, 180);
  font-size: min(1.5vw, 15px);
  font-weight: bold;
  margin: 5px;

  &:hover {
    color: orange;
  }
  @media (max-width: 768px) {
    font-size: 10px;
  }
`;
