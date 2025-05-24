import { StyledFilter } from "../../Styles/Filter.styled";

export default function Filter(props) {
  return (
    <div className="horizontal-container">
      <input
        style={{ width: "unset" }}
        value={props.category.label}
        type="checkbox"
        checked={props.category.checked}
        onChange={() => props.changeChecked(props.category.id)}
      />
      <StyledFilter>{props.category.label}</StyledFilter>
    </div>
  );
}
