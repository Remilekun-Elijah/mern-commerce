import React from "react";
import { PageNavbar } from "../components";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <>
      <PageNavbar />
      <main className="errorPage">
        <div className="pageHero"></div>
        <section className="error">
          <h1>404</h1>
          <h3>Sorry, the page cannot be found</h3>
          <Link to="/" className="error__btn">
            back home
          </Link>
        </section>
      </main>
    </>
  );
};

export default ErrorPage;
