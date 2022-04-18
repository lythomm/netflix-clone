import React from "react";
import {
  Container,
  Title,
  List,
  Item,
  Picture,
  PictureToEdit,
  Name,
} from "./styles/profiles";
import { MdOutlineModeEdit } from "react-icons/md";

export default function Profiles({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}

Profiles.Title = function ProfilesTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

Profiles.List = function ProfilesList({ children, ...restProps }) {
  return <List {...restProps}>{children}</List>;
};

Profiles.User = function ProfilesUser({ children, ...restProps }) {
  return <Item {...restProps}>{children}</Item>;
};

Profiles.Picture = function ProfilesPicture({ src, ...restProps }) {
  return (
    <Picture
      {...restProps}
      src={src ? `/images/users/${src}.png` : "/images/misc/loading.gif"}
    />
  );
};

Profiles.PictureToEdit = function ProfilesPictureToEdit({ src, ...restProps }) {
  return (
    <>
      {/* <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
        }}
      > */}
      <div
        style={{
          position: "absolute",
          zIndex: 1,
          marginTop: "35px",
          marginLeft: "35px",
          color: "white",
          cursor: "pointer",
        }}
      >
        <MdOutlineModeEdit
          style={{
            width: "80px",
            height: "80px",
          }}
        />
      </div>
      {/* </div> */}
      <PictureToEdit
        {...restProps}
        src={src ? `/images/users/${src}.png` : "/images/misc/loading.gif"}
      />
    </>
  );
};

Profiles.Name = function ProfilesName({ children, ...restProps }) {
  return <Name {...restProps}>{children}</Name>;
};
