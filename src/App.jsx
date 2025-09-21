import React, { useEffect, useState } from "react";
import DriverForm from "./components/DriverForm";
import RouteForm from "./components/RouteForm";
import Dashboard from "./components/Dashboard";
import initialData from "./data.json";
import CalendarView from "./components/CalendarView";

const STORAGE_KEY = "drb-data-v1";

export default function App() {
  const [data, setData] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : initialData;
    } catch {
      return initialData;
    }
  });
  const [query, setQuery] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const addDriver = (driver) => {
    setData((s) => ({ ...s, drivers: [...s.drivers, driver] }));
  };
  const addRoute = (route) => {
    setData((s) => ({ ...s, routes: [...s.routes, route] }));
  };
  const assignDriverToRoute = (routeId, driverId) => {
    setData((s) => {
      const routes = s.routes.map((r) =>
        r.id === routeId ? { ...r, assignedDriverId: driverId } : r
      );
      return { ...s, routes };
    });
  };
  const updateDriverStatus = (driverId, status) => {
    setData((s) => {
      const drivers = s.drivers.map((d) =>
        d.id === driverId ? { ...d, status } : d
      );
      return { ...s, drivers };
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-slate-900">
        Driver Scheduling Dashboard
      </h1>
      <p className="text-slate-500">Manage drivers and routes efficiently</p>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
        <div className="bg-white shadow rounded-lg p-4 border border-slate-200">
          <div>Total Drivers</div>
          <div className="text-2xl font-bold">{data.drivers.length}</div>
        </div>
        <div className="bg-white shadow rounded-lg p-4 border border-slate-200">
          <div>Available Drivers</div>
          <div className="text-2xl font-bold">
            {data.drivers.filter((d) => d.status === "Available").length}
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4 border border-slate-200">
          <div>Total Routes</div>
          <div className="text-2xl font-bold">{data.routes.length}</div>
        </div>
        <div className="bg-white shadow rounded-lg p-4 border border-slate-200">
          <div>Unassigned Routes</div>
          <div className="text-2xl font-bold">
            {data.routes.filter((r) => !r.assignedDriverId).length}
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          placeholder="Search drivers or routes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-slate-300"
        />
      </div>

      {/* Forms */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <DriverForm addDriver={addDriver} />
        <RouteForm addRoute={addRoute} />
      </div>

      {/* Dashboard */}
      <Dashboard
        data={data}
        query={query}
        assignDriverToRoute={assignDriverToRoute}
        updateDriverStatus={updateDriverStatus}
      />
      {/* CalendarView */}

      <CalendarView drivers={data.drivers} />
    </div>
  );
}
