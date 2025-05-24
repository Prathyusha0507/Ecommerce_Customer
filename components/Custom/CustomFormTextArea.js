import React from "react";
import "./CustomFormTextArea.css";

function CustomFormTextArea({
  id,
  name,
  placeholder,
  label,
  rows,
  defaultValue,
  cols,
  register,
}) {
  return (
    <div className="form_container">
      <label className="input_field_label" htmlFor={id}>
        {label}
      </label>
      <textarea
        className="input_field"
        name={name}
        id={id}
        defaultValue={defaultValue}
        placeholder={placeholder}
        autoComplete="off"
        rows={rows}
        cols={cols}
        {...register}
      ></textarea>
    </div>
  );
}

export default CustomFormTextArea;
