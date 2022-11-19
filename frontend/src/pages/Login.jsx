import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/user_context";
import { API_ENDPOINT } from "../utils/constants";

const Login = () => {
  const navigate = useNavigate();
  const {
    loginPayload,
    setLoginPayload,
    setLoading,
    loading,
    resetForm,
    setMyUser
  } = useUserContext();

  const postLoginDetails = () => {
    setLoading(true);

    fetch(`${API_ENDPOINT}auth/login`, {
      method: "POST",
      body: JSON.stringify(loginPayload),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        alert(data.message);
        if (data.success) {
          resetForm();
          setMyUser(data.user)
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          navigate("/");
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //Calls the function
    postLoginDetails();
  };

  const gotoSignUpPage = () => navigate("/register");

  return (
    <div className="flex items-center  h-[80vh] overflow-hidden justify-center">
      <div className="max-w-[500px] p-5 mx-5 w-full shadow-lg">
        <h1 className="text-4xl text-center">Login </h1>
        <form className="w-full p-10" onSubmit={handleSubmit}>
          <label htmlFor="email" className="mb-3 block pl-2 text-2xl">
            Email
          </label>
          <input
            className="block focus:shadow p-4 focus:outline-none text-2xl border w-full"
            type="text"
            id="email"
            name="email"
            value={loginPayload.email}
            required
            readOnly={loading}
            onChange={(e) =>
              setLoginPayload((state) => ({ ...state, email: e.target.value }))
            }
          />

          <label htmlFor="password" className="mt-5 block pl-2 text-2xl">
            Password
          </label>
          <input
            readOnly={loading}
            type="password"
            name="password"
            id="password"
            className="block focus:shadow p-4 focus:outline-none text-2xl  border w-full"
            minLength={5}
            required
            value={loginPayload.password}
            onChange={(e) =>
              setLoginPayload((state) => ({
                ...state,
                password: e.target.value,
              }))
            }
          />
          <div className="flex justify-center">
            <button
              disabled={loading}
              type="submit"
              className="rounded w-full bg-black mt-10 p-5 text-white hover:bg-slate-800 cursor-pointer text-2xl"
            >
              {loading ? "Submitting..." : "SIGN IN"}
            </button>
          </div>
          <p className="mt-5 text-2xl">
            Don't have an account?{" "}
            <span
              className="link cursor-pointer text-blue-400"
              onClick={gotoSignUpPage}
            >
              Sign up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
