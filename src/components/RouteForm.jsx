import React, { useState } from "react";
import { nanoid } from "../nanoid-shim";

export default function RouteForm({ addRoute }) {
  const [title, setTitle] = useState("");
  const [fromTo, setFromTo] = useState("");
  const [distance, setDistance] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!title) return alert("Enter route title");
    addRoute({ id: nanoid(), title, fromTo, distance, assignedDriverId: null });
    setTitle("");
    setFromTo("");
    setDistance("");
  };

  return (
    <form
      onSubmit={submit}
      className="bg-white p-4 rounded-lg shadow border border-slate-200"
    >
      <h3 className="font-semibold mb-2">Add Route</h3>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Route title"
        className="w-full border p-2 rounded mb-2"
      />
      <input
        value={fromTo}
        onChange={(e) => setFromTo(e.target.value)}
        placeholder="From → To (optional)"
        className="w-full border p-2 rounded mb-2"
      />
      <input
        value={distance}
        onChange={(e) => setDistance(e.target.value)}
        placeholder="Distance (e.g. 25 km)"
        className="w-full border p-2 rounded mb-2"
      />
      <button
        type="submit"
        className="bg-slate-900 text-white px-4 py-2 rounded hover:bg-slate-800"
      >
        Add Route
      </button>
    </form>
  );
}
