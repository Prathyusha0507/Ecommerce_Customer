import React from "react";
import "./CustomSelect.css";
function CustomSelect({
  id,
  name,
  label,
  defaultValue,
  register,
  categories,
  event,
}) {
  const options = categories.map((option) => (
    <option key={option.id} value={option.text}>
      {option.text}
    </option>
  ));

  return (
    <div className="form_container">
      {label ? (
        <label className="input_field_label" htmlFor={id}>
          {label}
        </label>
      ) : (
        ""
      )}
      <select
        className="select_container"
        id={id}
        name={name}
        defaultValue={defaultValue}
        {...register}
        onChange={event}
      >
        {options}
      </select>
    </div>
  );
}

export default CustomSelect;
