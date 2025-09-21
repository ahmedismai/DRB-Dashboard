import React from "react";

function RouteCard({ route, drivers, assignDriverToRoute }) {
  const assigned = drivers.find((d) => d.id === route.assignedDriverId);
  return (
    <div className="bg-white p-4 rounded-lg shadow border border-slate-200">
      <div className="flex justify-between items-center">
        <strong>{route.title}</strong>
        <span
          className={`px-2 py-1 text-xs rounded text-white ${
            assigned ? "bg-teal-600" : "bg-slate-500"
          }`}
        >
          {assigned ? "ASSIGNED" : "UNASSIGNED"}
        </span>
      </div>
      <div className="text-slate-500 text-sm mt-1">
        {route.fromTo} • {route.distance}
      </div>
      {assigned && (
        <div className="mt-2 text-sm">
          Assigned Driver: <strong>{assigned.name}</strong>
        </div>
      )}
      <div className="mt-3">
        <select
          value={route.assignedDriverId || ""}
          onChange={(e) =>
            assignDriverToRoute(route.id, e.target.value || null)
          }
          className="w-full border p-2 rounded"
        >
          <option value="">Unassigned</option>
          {drivers.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name} ({d.license || "--"})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function DriverCard({ driver, updateDriverStatus }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow border border-slate-200">
      <div className="flex justify-between items-center">
        <strong>{driver.name}</strong>
        <span
          className={`px-2 py-1 text-xs rounded text-white ${
            driver.status === "Available" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {driver.status.toUpperCase()}
        </span>
      </div>
      <div className="text-slate-500 text-sm mt-1">
        License: {driver.license || "-"}
      </div>
      <div className="text-slate-500 text-sm">Phone: {driver.phone || "-"}</div>
      <div className="mt-3">
        <select
          value={driver.status}
          onChange={(e) => updateDriverStatus(driver.id, e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option>Available</option>
          <option>Busy</option>
        </select>
      </div>
    </div>
  );
}

export default function Dashboard({
  data,
  query,
  assignDriverToRoute,
  updateDriverStatus,
}) {
  const q = (query || "").toLowerCase().trim();
  const routes = data.routes.filter((r) =>
    q
      ? r.title.toLowerCase().includes(q) ||
        (r.fromTo || "").toLowerCase().includes(q)
      : true
  );
  const drivers = data.drivers.filter((d) =>
    q
      ? d.name.toLowerCase().includes(q) ||
        (d.license || "").toLowerCase().includes(q)
      : true
  );

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <section>
        <h2 className="text-xl font-semibold mb-2">Routes Overview</h2>
        {routes.length === 0 ? (
          <p className="text-slate-500">No routes yet.</p>
        ) : (
          routes.map((r) => (
            <RouteCard
              key={r.id}
              route={r}
              drivers={data.drivers}
              assignDriverToRoute={assignDriverToRoute}
            />
          ))
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Drivers Overview</h2>
        {drivers.length === 0 ? (
          <p className="text-slate-500">No drivers yet.</p>
        ) : (
          drivers.map((d) => (
            <DriverCard
              key={d.id}
              driver={d}
              updateDriverStatus={updateDriverStatus}
            />
          ))
        )}
      </section>
    </div>
  );
}
