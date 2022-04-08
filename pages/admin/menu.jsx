import React, { useEffect, useState } from "react";
import Axios from "axios";
import MenuTable from "../../components/admin/MenuTable";
import MenuAddForm from "../../components/admin/MenuAddForm";
import MenuEditForm from "../../components/admin/MenuEditForm";

function menu() {
  const [menu, setMenu] = useState([]);
  const [idOfFoodBeingEdited, setIdOfFoodBeingEdited] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  const fetchMenu = async () => {
    try {
      const { data } = await Axios.get(
        `${process.env.NEXT_PUBLIC_API_HOST}/menu`,
        { withCredentials: true }
      );

      console.log(data);
      setMenu(data.menu);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };
  useEffect(fetchMenu, []);
  return (
    <div className="pb-10">
      <div className="w-11/12 mx-auto">
        <h1 className="text-center text-primary text-center font-bold text-2xl my-8">
          Manage menu
        </h1>

        <section className="grid grid-cols-3">
          <div className="relative">
            <span className="block w-[250px] h-[250px] rounded-full bg-primary -translate-x-[140px]"></span>
            <h2 className="absolute text-white font-bold text-3xl top-1/2 -translate-y-1/2">
              ADD FOOD
            </h2>
          </div>
          <div className="col-span-2 text-right">
            <MenuAddForm menu={menu} setMenu={setMenu} />
          </div>
        </section>

        {showEditForm && (
          <section>
            <h2>Edit food</h2>
            <MenuEditForm
              menu={menu}
              setMenu={setMenu}
              idOfFoodBeingEdited={idOfFoodBeingEdited}
            />
          </section>
        )}

        <h3 className="text-2xl font-bold text-primary uppercase text-center my-6">
          menu list
        </h3>
        <MenuTable
          menu={menu}
          setMenu={setMenu}
          setIdOfFoodBeingEdited={setIdOfFoodBeingEdited}
          setShowEditForm={setShowEditForm}
        />
      </div>
    </div>
  );
}

export default menu;
