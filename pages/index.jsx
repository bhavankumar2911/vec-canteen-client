import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useGlobalContext } from "../context/global";

function index() {
  const [menu, setMenu] = useState([]);
  const { addToCart } = useGlobalContext();

  const fetchMenu = async () => {
    try {
      const { data } = await Axios.get(
        `${process.env.NEXT_PUBLIC_API_HOST}/menu`
      );

      console.log(data);
      setMenu(data.menu.filter((item) => item.isAvailable));
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  useEffect(fetchMenu, []);

  return (
    <main>
      <section>
        <h2>Menu</h2>
        <ul>
          {menu.map((menuItem, index) => (
            <li key={index}>
              <h4>{menuItem.foodName}</h4>
              <p>Rs. {new Intl.NumberFormat("en-IN").format(menuItem.price)}</p>
              <button
                className="bg-primary text-white text-sm py-2 px-5"
                data-food-id={menuItem.id}
                onClick={() => addToCart(menuItem)}
              >
                Add to bag
              </button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default index;
