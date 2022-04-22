import React, { useState, useEffect } from "react";
import { Header, Profiles } from "../components";
import * as ROUTES from "../constants/routes";
import logo from "../logo.svg";
import "./profiles.css";
import { Link, useLocation } from "react-router-dom";
import { getAuth, updateProfile } from "firebase/auth";
import { AvatarSelector } from "../components";

export function SelectProfileContainer({ user, setProfile }) {
  const [manage, setManage] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [selectAvatar, setSelectAvatar] = useState(false)

  const actualLocation = useLocation().pathname;

  useEffect(() => {
    if (actualLocation === "/browse") {
      setManage(false);
    } else if (actualLocation === "/manageProfiles") {
      setManage(true);
    }
  }, [actualLocation]);

  const changeUsername = () => {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: newUsername,
    })
      .then(() => {
        setIsEditing(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const setAvatarSelectorToFalse = () => {
    setSelectAvatar(false)
  }

  return (
    <>
      <Header bg={false}>
        <Header.Frame>
          <Header.Logo to={ROUTES.HOME} src={logo} alt="Netflix" />
        </Header.Frame>
      </Header>

      {!manage && !isEditing && (
        <>
          <Profiles>
            <Profiles.Title>Who's Watching ?</Profiles.Title>
            <Profiles.List>
              <Profiles.User
                onClick={() =>
                  setProfile({
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                  })
                }
              >
                <Profiles.Picture src={user.photoURL} />
                <Profiles.Name>{user.displayName}</Profiles.Name>
              </Profiles.User>
            </Profiles.List>
          </Profiles>

          <div className="profiles__edit">
            <Link
              style={{ letterSpacing: "2px" }}
              to={ROUTES.MANAGE_PROFILES}
              className="profiles__edit-title"
            >
              Edit Profiles
            </Link>
          </div>
        </>
      )}

      {manage && !isEditing && (
        <>
          <Profiles>
            <Profiles.Title>Manage Profiles</Profiles.Title>
            <Profiles.List>
              <Profiles.User onClick={() => setIsEditing(true)}>
                <Profiles.PictureToEdit src={user.photoURL} />
                <Profiles.Name>{user.displayName}</Profiles.Name>
              </Profiles.User>
            </Profiles.List>
          </Profiles>

          <div className="profiles__manageBtn">
            <Link
              onClick={() => setIsEditing(false)}
              to={ROUTES.BROWSE}
              className="profiles__manageBtnTitle"
              style={{ letterSpacing: "2px" }}
            >
              Cancel
            </Link>
          </div>
        </>
      )}

      {isEditing && actualLocation === "/manageProfiles" && !selectAvatar && (
        <div className="edit">
          <div className="edit__header">
            <h1 style={{ fontSize: "4rem" }}>Edit Profile</h1>
          </div>
          <div className="edit__body">
            <div>
              <img
                className="edit__body-avatar"
                src={`/images/users/${user.photoURL}.png`}
                alt="avatar"
                onClick={() => setSelectAvatar(true)}
              />
            </div>
            <div className="edit__body-inputs">
              <input
                type="text"
                value={newUsername}
                placeholder={user.displayName}
                onChange={(e) => setNewUsername(e.target.value)}
              />
            </div>
          </div>
          <div className="edit__footer">
            <button
              type="button"
              className="edit__footer-btnSAVE"
              onClick={() => changeUsername()}
            >
              Save
            </button>
            <button
              type="button"
              className="edit__footer-btnCANCEL"
              onClick={() => { setIsEditing(false); setSelectAvatar(false); }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {selectAvatar && (
        <>
          <AvatarSelector user={user} setAvatarSelectorToFalse={setAvatarSelectorToFalse} />
        </>
      )}
    </>
  );
}
