import React, { useState } from "react";
import { nanoid } from "../nanoid-shim";

export default function DriverForm({ addDriver }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [license, setLicense] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!name) return alert("Enter name");
    addDriver({ id: nanoid(), name, phone, license, status: "Available" });
    setName("");
    setPhone("");
    setLicense("");
  };

  return (
    <form
      onSubmit={submit}
      className="bg-white p-4 rounded-lg shadow border border-slate-200"
    >
      <h3 className="font-semibold mb-2">Add Driver</h3>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full name"
        className="w-full border p-2 rounded mb-2"
      />
      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone (optional)"
        className="w-full border p-2 rounded mb-2"
      />
      <input
        value={license}
        onChange={(e) => setLicense(e.target.value)}
        placeholder="License no"
        className="w-full border p-2 rounded mb-2"
      />
      <button
        type="submit"
        className="bg-slate-900 text-white px-4 py-2 rounded hover:bg-slate-800"
      >
        Add Driver
      </button>
    </form>
  );
}
