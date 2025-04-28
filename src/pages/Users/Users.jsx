import React, { useState } from "react";
import UserList from "./UserList";
import UserForm from "./UserForm";

const Users = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const handleSave = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  return (
    <div>
      {showForm ? (
        <UserForm
          onCancel={() => {
            setShowForm(false);
            setEditingUser(null);
          }}
          onSave={handleSave}
          userData={editingUser}
        />
      ) : (
        <UserList setShowForm={setShowForm} setEditingUser={setEditingUser} />
      )}
    </div>
  );
};

export default Users;
