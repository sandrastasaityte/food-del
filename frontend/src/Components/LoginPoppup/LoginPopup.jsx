import React, { useContext, useEffect, useMemo, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";

const isEmail = (v = "") => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);

  const [currState, setCurrState] = useState("Login"); // "Login" | "Sign Up"
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [agreed, setAgreed] = useState(false);

  const [data, setData] = useState({ name: "", email: "", password: "" });

  // prevent page scroll behind modal
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // close on Escape
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setShowLogin(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [setShowLogin]);

  // reset errors when switching mode
  useEffect(() => {
    setError("");
    setData((prev) => ({ ...prev, password: "" }));
    setAgreed(false);
  }, [currState]);

  const endpoint = useMemo(
    () => (currState === "Login" ? "/api/user/login" : "/api/user/register"),
    [currState]
  );

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (currState !== "Login" && data.name.trim().length < 2) {
      return "Please enter your name (at least 2 characters).";
    }
    if (!isEmail(data.email)) return "Please enter a valid email address.";
    if (data.password.trim().length < 6) return "Password must be at least 6 characters.";
    if (!agreed) return "Please agree to the terms to continue.";
    return "";
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const msg = validate();
    if (msg) {
      setError(msg);
      return;
    }

    setLoading(true);
    try {
      const payload =
        currState === "Login"
          ? { email: data.email, password: data.password }
          : { name: data.name, email: data.email, password: data.password };

      const res = await axios.post(url + endpoint, payload);

      if (res.data?.success) {
        const token = res.data.token;
        setToken(token);
        localStorage.setItem("token", token);
        setShowLogin(false);
      } else {
        setError(res.data?.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="login-popup"
      role="dialog"
      aria-modal="true"
      aria-label="Login popup"
      onMouseDown={(e) => {
        if (e.target.classList.contains("login-popup")) setShowLogin(false);
      }}
    >
      <form onSubmit={onSubmit} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>

          <button
            type="button"
            className="login-popup-close"
            onClick={() => setShowLogin(false)}
            aria-label="Close login popup"
            disabled={loading}
          >
            <img src={assets.cross_icon} alt="" />
          </button>
        </div>

        <div className="login-popup-inputs">
          {currState !== "Login" && (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your name"
              autoComplete="name"
              disabled={loading}
              required
            />
          )}

          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your email"
            autoComplete="email"
            disabled={loading}
            required
          />

          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            autoComplete={currState === "Login" ? "current-password" : "new-password"}
            disabled={loading}
            required
            minLength={6}
          />
        </div>

        {error && <p className="login-popup-error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Please wait..." : currState === "Sign Up" ? "Create Account" : "Login"}
        </button>

        <div className="login-popup-condition">
          <input
            id="agree"
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            disabled={loading}
          />
          <label htmlFor="agree">By continuing, I agree to the terms of use & privacy policy.</label>
        </div>

        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <button
              type="button"
              className="login-popup-link"
              onClick={() => setCurrState("Sign Up")}
              disabled={loading}
            >
              Click here
            </button>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <button
              type="button"
              className="login-popup-link"
              onClick={() => setCurrState("Login")}
              disabled={loading}
            >
              Login here
            </button>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
