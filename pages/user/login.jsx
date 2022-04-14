import React, { useState } from "react";
import Axios from "axios";
import Button from "../../components/common/Button";
import { useRouter } from "next/router";

const inputClasses =
  "border border-gray-300 rounded-lg p-2 w-full outline-primary";
const inputGroupClasses = "mb-3";
const labelClasses = "mb-1 inline-block";

function login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const router = useRouter();

  const handleDataForm = (e) => {
    const field = e.target.name;
    const fieldValue = e.target.value;

    if (field == "username") setFormData({ ...formData, username: fieldValue });
    else setFormData({ ...formData, password: fieldValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await Axios.post(
        `${process.env.NEXT_PUBLIC_API_HOST}/user/login`,
        { ...formData },
        { withCredentials: true }
      );

      router.push("/user/profile");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <main className="pb-5">
      <h1 className="text-center text-3xl text-primary font-bold py-5">
        Login
      </h1>
      <form onSubmit={handleSubmit} className="p-3 w-11/12 mx-auto">
        <div className={inputGroupClasses}>
          <label htmlFor="username" className={labelClasses}>
            Username
          </label>
          <br />
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleDataForm}
            className={inputClasses}
          />
        </div>
        <div className={inputGroupClasses}>
          <label htmlFor="password" className={labelClasses}>
            Password
          </label>
          <br />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleDataForm}
            className={inputClasses}
          />
        </div>
        <span className="pt-3 block">
          <Button type="submit" text="Login" />
        </span>
      </form>
    </main>
  );
}

export default login;
