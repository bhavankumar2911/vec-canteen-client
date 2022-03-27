import React, { useState } from "react";
import Axios from "axios";

const inputClasses = "border border-primary";

function login() {
  const [formData, setFormData] = useState({ username: "", password: "" });

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

      alert(data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <br />
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleDataForm}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleDataForm}
            className={inputClasses}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </main>
  );
}

export default login;
