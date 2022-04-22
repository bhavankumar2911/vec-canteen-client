import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useGlobalContext } from "../context/global";
import Header from "../components/common/Header";
import Wrapper from "../components/common/Wrapper";
import Cart from "../components/icons/Cart";
import Footer from "../components/common/Footer";

function index() {
  const [menu, setMenu] = useState([]);
  const { addToCart, isPresentInCart, deleteFromCart } = useGlobalContext();

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

  const addOrRemoveFromCart = (item) => {
    const { id } = item;
    if (isPresentInCart(id)) {
      deleteFromCart(id);
      return;
    }

    addToCart(item);
  };

  return (
    <main className="pt-[12vh] bg-gray-50 min-h-screen">
      {/* hero section start */}

      <section>
        <img
          src="/hero-img.jpeg"
          alt="canteen image"
          className=""
          style={{ clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0 82%)" }}
        />
        <h3 className="text-primary font-black text-3xl px-[5%] py-5 leading-[50px]">
          <span className="text-primary bg-secondary p-1">Food</span> never
          fails in bringing{" "}
          <span className="text-primary bg-secondary p-1">people</span>{" "}
          together!
        </h3>
      </section>

      {/* hero section end */}
      <Wrapper>
        <Header />
        <section>
          <h2 className="text-2xl font-semibold my-5 text-center">Menu</h2>
          <ul>
            {menu.map((menuItem, index) => (
              <li
                key={index}
                className="bg-white rounded-xl drop-shadow-md mb-3 flex justify-between overflow-hidden"
              >
                <span className="p-3">
                  <h4>{menuItem.foodName}</h4>
                  <p className="font-semibold">
                    Rs. {new Intl.NumberFormat("en-IN").format(menuItem.price)}
                  </p>
                </span>
                <span
                  data-food-id={menuItem.id}
                  onClick={() => addOrRemoveFromCart(menuItem)}
                  className={`${
                    isPresentInCart(menuItem.id)
                      ? "text-red-500"
                      : "text-green-600"
                  } font-semibold w-[100px] text-xs inline-flex flex-col items-center justify-center pl-6 hover:text-white cursor-pointer ${
                    isPresentInCart(menuItem.id)
                      ? "hover:bg-red-500"
                      : "hover:bg-green-500"
                  }`}
                  style={{
                    clipPath: "polygon(0 0, 100% 0%, 100% 100%, 37% 100%)",
                  }}
                >
                  <Cart />
                  {isPresentInCart(menuItem.id) ? "Remove" : "Add"}
                </span>
              </li>
            ))}
          </ul>
        </section>
        <Footer />
      </Wrapper>
    </main>
  );
}

export default index;
