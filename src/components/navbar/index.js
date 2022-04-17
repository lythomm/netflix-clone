import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../../context/firebase";
import "./navbar.css";
import logo from "../../logo.svg";

const Navbar = () => {
  const { firebase } = useContext(FirebaseContext);
  const user = firebase.auth().currentUser || {};
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 150) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <img className="nav__logo" src={logo} alt="netflix_logo" />
      <img
        className="nav__avatar"
        src={`/images/users/${user.photoURL}.png`}
        alt="avatar"
      />
    </div>
  );
};

export default Navbar;
