import React, { useState, useContext, useEffect } from "react";
import { SelectProfileContainer } from "../containers/profiles";
import { FirebaseContext } from "../context/firebase";

export default function ManageProfiles() {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const { firebase } = useContext(FirebaseContext);
  const user = firebase.auth().currentUser || {};

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [profile.displayName]);

  return (
    <div>
      <SelectProfileContainer user={user} setProfile={setProfile} />
    </div>
  );
}
