import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../../context/firebase";
import "./navbar.css";
import logo from "../../logo.svg";
import Header from "../header";

export default function Navbar() {
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
      window.removeEventListener("scroll", this);
    };
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <img className="nav__logo" src={logo} alt="netflix_logo" />
      <div className="nav__avatar">
        <Header.Profile>
          <Header.Picture src={user.photoURL} />
          <Header.Dropdown>
            <Header.Group>
              <Header.Picture src={user.photoURL} />
              <Header.TextLink>{user.displayName}</Header.TextLink>
            </Header.Group>
            <Header.Group>
              <Header.TextLink onClick={() => firebase.auth().signOut()}>
                Sign out
              </Header.TextLink>
            </Header.Group>
          </Header.Dropdown>
        </Header.Profile>
      </div>
    </div>
  );
}
