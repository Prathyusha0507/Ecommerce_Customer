import FilterCard from "./filterCard";

export default function Filters(props) {
  return (
    <div className="flexbox-container">
      <div>
        <FilterCard
          key="Categories"
          name="Categories"
          filter={props.categories}
          changeChecked={props.changeCategory}
        />
        <FilterCard
          key="Prices"
          name="Prices"
          filter={props.prices}
          changeChecked={props.changePrice}
        />
        <FilterCard
          key="Ratings"
          name="Ratings"
          filter={props.ratings}
          changeChecked={props.changeRating}
        />
      </div>
    </div>
  );
}
