import React, { FC } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import DeceasedInfoUser from "../../components/DeceasedInfoUser/DeceasedInfoUser";
import { useParams } from "react-router-dom";

const DeceasedPage: FC = (props) => {
  const { id } = useParams();
  return (
    <div className="containerFull">
      <div className="containerPage">
        <Header />
        <DeceasedInfoUser id={id} />
      </div>

      <Footer />
    </div>
  );
};

export default DeceasedPage;
