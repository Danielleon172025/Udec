import React, { useState } from "react";
import ProfileList from "./ProfileList";
import ProfileForm from "./ProfileForm";

const Profiles = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingProfile, setEditingProfile] = useState(null);

  const handleSave = () => {
    setShowForm(false);
    setEditingProfile(null);
  };

  return (
    <div>
      {showForm ? (
        <ProfileForm
          onCancel={() => {
            setShowForm(false);
            setEditingProfile(null);
          }}
          onSave={handleSave}
          profileData={editingProfile}
        />
      ) : (
        <ProfileList setShowForm={setShowForm} setEditingProfile={setEditingProfile} />
      )}
    </div>
  );
};

export default Profiles;
