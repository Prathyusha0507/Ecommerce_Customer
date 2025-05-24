import React, { useEffect } from "react";
import EditProductForm from "./EditProductForm";
import { getItemInfoAsync } from "../../redux/item/itemSlice";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function EditProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const item = useSelector((state) => state.item.selectedItem);
  useEffect(() => {
    dispatch(getItemInfoAsync(id));
  }, [dispatch, id]);
  return <EditProductForm item={item} />;
}

export default EditProduct;
