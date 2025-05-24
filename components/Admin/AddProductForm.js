import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import CustomButton from "../Custom/CustomButton";
import CustomFormInput from "../Custom/CustomFormInput";
import CustomFormTextArea from "../Custom/CustomFormTextArea";
import CustomSelect from "../Custom/CustomSelect";
import "./AddProductForm.css";
import { addNewItemAsync } from "../../redux/item/itemSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { object, string, number } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
function AddProductForm() {
  /* Reference from https://www.npmjs.com/package/yup and https://www.youtube.com/watch?v=K4r6nw6aeg4 */
  const schema = object({
    name: string().required("Name is required"),
    price: number().required("Price is required"),
    description: string().required("Description is required"),
    quantity: number().required("Quantity is required"),
    images: string().required("Image url is required").url("Invalid Image url"),
  });
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const dispatch = useDispatch();
  const formSubmit = (event) => {
    event = {
      ...event,
    };
    dispatch(addNewItemAsync(event));
    reset();
    toast.success("Added Product!", {
      position: "bottom-right",
      theme: "colored",
      autoClose: 2000,
    });
  };

  const clearForm = () => {
    reset();
  };

  const categories = [
    { id: 1, text: "Choose a Category----" },
    { id: 2, text: "Electronics" },
    { id: 3, text: "Home" },
    { id: 4, text: "Books" },
    { id: 5, text: "Food" },
    { id: 6, text: "Fashion" },
    { id: 7, text: "Toys" },
    { id: 8, text: "Pets" },
    { id: 9, text: "Health" },
    { id: 10, text: "Outdoor" },
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
            label="Item Name:"
            register={{ ...register("name", { required: true }) }}
            errorMessage={errors.name?.message}
          />
          <CustomFormInput
            name="price"
            id="price"
            type="number"
            placeholder="Item Price"
            label="Item Price:"
            register={{ ...register("price", { required: true }) }}
            errorMessage={errors.price?.message}
          />
          <CustomFormTextArea
            name="description"
            id="description"
            placeholder="Item Description"
            label="Item Description:"
            rows="5"
            cols="65"
            register={{ ...register("description", { required: true }) }}
            errorMessage={errors.description?.message}
          />
          <CustomFormInput
            name="quantity"
            id="quantity"
            type="number"
            placeholder="Item Quantity"
            label="Item Quantity:"
            register={{ ...register("quantity", { required: true }) }}
            errorMessage={errors.quantity?.message}
          />
          <CustomSelect
            id="category"
            name="category"
            label="Item Category:"
            register={{ ...register("category", { required: true }) }}
            categories={categories}
          />
          <CustomFormInput
            name="images"
            id="images"
            type="text"
            placeholder="Item Image"
            label="Item Image:"
            register={{ ...register("images", { required: true }) }}
            errorMessage={errors.images?.message}
          />

          <CustomButton
            type="submit"
            label="Create"
            event={handleSubmit(formSubmit)}
          />
        </div>
      </form>
      <ToastContainer />
    </>
  );
}

export default AddProductForm;
