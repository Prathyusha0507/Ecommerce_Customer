import { FilterCardContainer } from "../../Styles/FilterCard.styled";
import Filter from "./filter";
import "./FilterCard.css";

export default function FilterCard(props) {
  return (
    <FilterCardContainer key={props.name}>
      <h4 className="filter-heading" style={{ fontWeight: "bold" }}>
        {props.name}
      </h4>
      {props.filter.map((cat) => (
        <Filter
          key={cat.id}
          category={cat}
          changeChecked={props.changeChecked}
        />
      ))}
    </FilterCardContainer>
  );
}
