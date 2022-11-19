import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/user_context";
import { API_ENDPOINT } from "../utils/constants";

const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const {
    signUpPayload,
    setSignUpPayload,
    setLoading,
    loading,
    resetForm,
  } = useUserContext();

  useEffect(() => {
    if (signUpPayload.password && signUpPayload.confirmPassword) {
      if (signUpPayload.password !== signUpPayload.confirmPassword) {
        setError("Password does not match!");
      } else setError("");
    } else setError("");
  }, [signUpPayload.password, signUpPayload.confirmPassword]);

  const handleChange = ({ target: { name, value } }) => {
    setSignUpPayload((state) => ({ ...state, [name]: value }));
  };

  const postSignUpDetails = () => {
    setLoading(true);

    fetch(`${API_ENDPOINT}auth/signup`, {
      method: "POST",
      body: JSON.stringify(signUpPayload),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        alert(data.message);
        if (data.success) {
          resetForm("signup");
          alert(data.message);
          navigate("/login");
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //Call it within the submit function
    postSignUpDetails(e);
  };
  const gotoLoginPage = () => navigate("/login");

  return (
    <div className="flex items-center  h-[89vh] overflow-hidden justify-center">
      <div className="max-w-[500px] p-5 mx-5 w-full shadow-lg">
        <h1 className="text-4xl text-center">Sign Up </h1>
        <form className="w-full p-10" onSubmit={handleSubmit}>
          <label htmlFor="email" className="mb-3 block pl-2 text-2xl">
            Email Address
          </label>
          <input
            className="block focus:shadow mb-4 p-4 focus:outline-none text-2xl border w-full"
            readOnly={loading}
            type="email"
            name="email"
            id="email"
            required
            value={signUpPayload.email}
            onChange={handleChange}
          />
          <label htmlFor="username" className="mb-3 block pl-2 text-2xl">
            Username
          </label>
          <input
            className="block focus:shadow p-4 mb-4 focus:outline-none text-2xl  border w-full"
            readOnly={loading}
            type="text"
            id="username"
            name="username"
            required
            value={signUpPayload.username}
            onChange={handleChange}
          />

<label htmlFor="addressOne" className="mb-3 block pl-2 text-2xl">
            Home Address
          </label>
          <input
            className="block focus:shadow p-4 mb-4 focus:outline-none text-2xl  border w-full"
            readOnly={loading}
            type="text"
            id="addressOne"
            name="addressOne"
            required
            value={signUpPayload.addressOne}
            onChange={handleChange}
          />

          <label htmlFor="tel" className="mb-3 block pl-2 text-2xl">
            Phone Number
          </label>
          <input
            className="block focus:shadow mb-4 p-4 focus:outline-none text-2xl border w-full"
            type="tel"
            name="phone"
            id="tel"
            value={signUpPayload.phone}
            onChange={handleChange}
            readOnly={loading}
          />
          <label htmlFor="password" className="mb-3 block pl-2 text-2xl">
            Password
          </label>
          <input
            className="block focus:shadow mb-4 p-4 focus:outline-none text-2xl border w-full"
            readOnly={loading}
            type="password"
            name="password"
            id="password"
            minLength={5}
            required
            value={signUpPayload.password}
            onChange={handleChange}
          />
          <label htmlFor="repeatPassword" className="mb-3 block pl-2 text-2xl">
            Repeat Password
          </label>
          <input
            className="block focus:shadow mb-4 p-4 focus:outline-none text-2xl border w-full"
            readOnly={loading}
            type="password"
            name="confirmPassword"
            id="repeatPassword"
            minLength={5}
            required
            value={signUpPayload.confirmPassword}
            onChange={handleChange}
          />
          <p className="text-2xl text-red-600">{error}</p>

          <div className="flex justify-center">
            <button
              disabled={loading || error}
              type="submit"
              className="rounded w-full bg-black mt-10 p-5 text-white hover:bg-slate-800 cursor-pointer text-2xl"
            >
              {loading ? "Submitting..." : "SIGN UP"}
            </button>
          </div>
          <p className="mt-5 text-2xl">
            Already have an account?{" "}
            <span
              className="link cursor-pointer text-blue-400"
              onClick={gotoLoginPage}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
