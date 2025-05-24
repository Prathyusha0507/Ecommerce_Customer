import styled from "styled-components";

export const ProdCard = styled.div`
  background-color: snow;
  margin: 5px;
  width: 23%;
  height: 400px;
  border-style: ridge;
  border-color: rgb(216 213 213 / 38%);
  border-radius: 10px;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 48%;
  }

  @media (max-width: 502px) {
    width: 100%;
    height: auto;
  }
`;
