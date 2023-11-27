import React, { FC } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import icons from "../../assets/icons/icons";
import { useSelector } from "react-redux";
import ContainerSearchCard from "../../components/ContainerSearchCard/ContainerSearchCard";

const SearchCardPage: FC = () => {
  return (
    <div className="containerFull">
      <div className="containerPage">
        <Header />
        <ContainerSearchCard />
      </div>

      <Footer />
    </div>
  );
};

export default SearchCardPage;
