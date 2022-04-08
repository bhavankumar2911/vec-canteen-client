import React from "react";
import Axios from "axios";

function profile() {
  const handleAccountDelete = async () => {
    try {
      const { data } = await Axios.delete(
        `${process.env.NEXT_PUBLIC_API_HOST}/user`,
        { withCredentials: true }
      );

      alert(data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleAccountLogout = async () => {
    try {
      const { data } = await Axios.get(
        `${process.env.NEXT_PUBLIC_API_HOST}/user/logout`,
        { withCredentials: true }
      );

      alert(data.message);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  return (
    <main>
      <button onClick={handleAccountDelete}>delete</button>
      <button onClick={handleAccountLogout}>logout</button>
    </main>
  );
}

export default profile;
