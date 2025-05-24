import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import CustomButton from "../Custom/CustomButton";
import CustomFormInput from "../Custom/CustomFormInput";
import CustomFormTextArea from "../Custom/CustomFormTextArea";
import CustomSelect from "../Custom/CustomSelect";
import "./EditProductForm.css";
import { updateItemAsync } from "../../redux/item/itemSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Reference from https://www.npmjs.com/package/react-toastify

function EditProductForm({ item }) {
  const location = useLocation();
  const { handleSubmit, register } = useForm({});
  let itemFromPropsOrState = item;
  if (item === null || item === undefined || item.length === 0) {
    itemFromPropsOrState = location.state.item;
  }
  const dispatch = useDispatch();
  const formSubmit = (event) => {
    dispatch(updateItemAsync({ id: itemFromPropsOrState._id, data: event }));
    toast.success("Updated Product!", {
      position: "bottom-right",
      theme: "colored",
      autoClose: 2000,
    });
  };

  const categories = [
    { id: 1, text: "Choose a Category----" },
    { id: 2, text: "Electronics" },
    { id: 3, text: "Home" },
    { id: 4, text: "Books" },
  ];
  return (
    <>
      <form className="item-form-container">
        <div>
          <CustomFormInput
            name="name"
            id="name"
            type="text"
            placeholder="Item Name"
            defaultValue={itemFromPropsOrState?.name}
            label="Item Name:"
            register={{ ...register("name", { required: true }) }}
          />
          <CustomFormInput
            name="price"
            id="price"
            type="number"
            placeholder="Item Price"
            defaultValue={itemFromPropsOrState?.price}
            label="Item Price:"
            register={{ ...register("price", { required: true }) }}
          />
          <CustomFormTextArea
            name="description"
            id="description"
            placeholder="Item Description"
            label="Item Description:"
            defaultValue={itemFromPropsOrState?.description}
            rows="5"
            cols="65"
            register={{ ...register("description", { required: true }) }}
          />
          <CustomFormInput
            name="quantity"
            id="quantity"
            type="number"
            placeholder="Item Quantity"
            defaultValue={itemFromPropsOrState?.quantity}
            label="Item Quantity:"
            register={{ ...register("quantity", { required: true }) }}
          />
          <CustomFormInput
            name="rating"
            id="rating"
            type="number"
            placeholder="Item Rating"
            defaultValue={itemFromPropsOrState?.rating}
            label="Item Rating:"
            register={{ ...register("rating", { required: true }) }}
          />
          <CustomSelect
            id="category"
            name="category"
            label="Item Category:"
            defaultValue={itemFromPropsOrState?.category}
            register={{ ...register("category", { required: true }) }}
            categories={categories}
          />
          <CustomFormInput
            name="images"
            id="images"
            type="text"
            placeholder="Item Image"
            label="Item Image:"
            defaultValue={itemFromPropsOrState?.images[0]}
            register={{ ...register("images", { required: true }) }}
          />

          <CustomButton
            type="submit"
            label="Update"
            event={handleSubmit(formSubmit)}
          />
        </div>
      </form>
      <ToastContainer />
    </>
  );
}

export default EditProductForm;
