import React, { useState } from "react";
import DeviceList from "./DeviceList";
import DeviceForm from "./DeviceForm";

const Devices = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingDevice, setEditingDevice] = useState(null);

  const handleSave = () => {
    setShowForm(false);
    setEditingDevice(null);
  };

  return (
    <div>
      {showForm ? (
        <DeviceForm
          onCancel={() => {
            setShowForm(false);
            setEditingDevice(null);
          }}
          onSave={handleSave}
          deviceData={editingDevice}
        />
      ) : (
        <DeviceList setShowForm={setShowForm} setEditingDevice={setEditingDevice} />
      )}
    </div>
  );
};

export default Devices;
