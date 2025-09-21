import React from "react";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function CalendarView({ drivers }) {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">
        Driver Availability (Weekly View)
      </h2>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse w-full text-sm">
          <thead>
            <tr>
              <th className="border px-3 py-2 bg-gray-100 text-left">Driver</th>
              {days.map((day) => (
                <th
                  key={day}
                  className="border px-3 py-2 bg-gray-100 text-center"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver) => (
              <tr key={driver.id}>
                <td className="border px-3 py-2 font-medium">{driver.name}</td>
                {days.map((day, idx) => (
                  <td
                    key={idx}
                    className={`border px-3 py-2 text-center ${
                      driver.status === "Available"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {driver.status}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
