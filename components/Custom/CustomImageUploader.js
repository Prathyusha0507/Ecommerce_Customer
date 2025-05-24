import React from "react";

function CustomImageUploader({ register, id, event, name }) {
  return (
    <div className="form_container">
      <label className="input_field_label" htmlFor="images">
        Item Images:
      </label>
      <input
        id={id}
        name={name}
        type="file"
        multiple
        onChange={event()}
        {...register}
      />
    </div>
  );
}

export default CustomImageUploader;
