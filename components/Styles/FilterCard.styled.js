import styled from "styled-components";

export const FilterCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-style: ridge;
  border-color: rgb(216 213 213 / 38%);
  padding: 10px;
  margin: 10px 0px;
  background-color: snow;
  border-radius: 6px;

  @media (max-width: 768px) {
    padding: 1px;
    margin: 0px;
  }
`;
