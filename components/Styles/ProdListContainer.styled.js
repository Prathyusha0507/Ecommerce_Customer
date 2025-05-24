import styled from "styled-components";

export const ProdListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin: 2px;
  overflow: auto;
  @media (max-width: 768px) {
    justify-content: flex-start;
  }

  @media (max-width: 502px) {
    flex-direction: column;
  }
`;
