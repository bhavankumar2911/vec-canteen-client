import React, { useState, useEffect } from "react";
import Axios from "axios";

function MenuEditForm({ menu, setMenu, idOfFoodBeingEdited }) {
  const [formData, setFormData] = useState({
    foodName: "",
    price: "",
    isAvailable: true,
  });

  const handleDataChange = (e) => {
    const field = e.target.name;
    const fieldValue = e.target.value;

    if (field == "foodName") {
      setFormData({ ...formData, foodName: fieldValue });
    } else if (field == "price") {
      setFormData({ ...formData, price: fieldValue });
    } else {
      setFormData({
        ...formData,
        isAvailable: fieldValue == "yes" ? true : false,
      });
    }
  };

  const fetchFood = async () => {
    if (!idOfFoodBeingEdited) return;

    try {
      const { data } = await Axios.get(
        `${process.env.NEXT_PUBLIC_API_HOST}/menu/${idOfFoodBeingEdited}`,
        { withCredentials: true }
      );

      const { food } = data;

      setFormData({ ...food });
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  useEffect(fetchFood, [idOfFoodBeingEdited]);

  const handleFormSubmission = async (e) => {
    e.preventDefault();

    try {
      const { data } = await Axios.patch(
        `${process.env.NEXT_PUBLIC_API_HOST}/menu/${idOfFoodBeingEdited}`,
        { ...formData },
        { withCredentials: true }
      );

      console.log(data);
      const { foodName, price, isAvailable } = formData;

      const newMenu = menu.map((foodItem) => {
        if (foodItem.id == idOfFoodBeingEdited) {
          return {
            ...foodItem,
            foodName: foodName,
            price: price,
            isAvailable: isAvailable,
          };
        } else return foodItem;
      });

      console.log(newMenu);
      setMenu([...newMenu]);
      alert(data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleFormSubmission}>
      <div>
        <label htmlFor="foodName">Food name</label>
        <br />
        <input
          type="text"
          name="foodName"
          value={formData.foodName}
          onChange={handleDataChange}
        />
      </div>
      <div>
        <label htmlFor="price">Price</label>
        <br />
        <input
          type="number"
          name="price"
          min={0}
          value={formData.price}
          onChange={handleDataChange}
        />
      </div>
      <div>
        <input
          type="radio"
          name="isAvailable"
          value="yes"
          checked={formData.isAvailable}
          onChange={handleDataChange}
        />
        <span>Yes</span>
        <input
          type="radio"
          name="isAvailable"
          value="no"
          checked={!formData.isAvailable}
          onChange={handleDataChange}
        />
        <span>No</span>
      </div>
      <button type="submit">Edit</button>
    </form>
  );
}

export default MenuEditForm;
