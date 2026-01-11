import React, { useEffect, useState } from "react";
import "./Home.css";
import Header from "../../Components/Header/Header";
import ExploreMenu from "../../Components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../Components/FoodDisplay/FoodDisplay";
import AppDownload from "../../Components/AppDownload/AppDownload";
import { useLocation, useNavigate } from "react-router-dom";

const Home = () => {
  const [category, setCategory] = useState("All");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const sectionId = location.state?.scrollTo;
    if (!sectionId) return;

    // wait a tick so DOM renders
    const t = setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });

      // clear state so it won't scroll again if user refreshes
      navigate("/", { replace: true, state: {} });
    }, 50);

    return () => clearTimeout(t);
  }, [location.state, navigate]);

  return (
    <div className="home">
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <AppDownload />
    </div>
  );
};

export default Home;
