"use client";

import { forwardRef } from "react";

const LogsPanel = forwardRef(function LogsPanel({ log }, ref) {
  return (
    <div className="w-full sm:w-2/3 bg-white rounded-lg shadow p-4 max-h-[800px] overflow-y-auto" ref={ref}>
      <h2 className="text-lg font-semibold mb-2">Socket Messages</h2>
      <div className="space-y-3">
        {log.map((entry, i) => (
          <div
            key={i}
            className={`text-sm whitespace-pre-wrap p-3 rounded-md ${
              entry.type === "sent"
                ? "bg-blue-100 border-l-4 border-blue-500"
                : entry.type === "received"
                  ? "bg-green-100 border-l-4 border-green-500"
                  : entry.type === "error"
                    ? "bg-red-100 border-l-4 border-red-500"
                    : entry.type === "openai"
                      ? "bg-purple-100 border-l-4 border-purple-500"
                      : "bg-gray-100 border-l-4 border-gray-400"
            }`}
          >
            <div className="flex items-center justify-between">
              <strong>{entry.type.toUpperCase()}</strong>
              {entry.category && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-gray-200 text-gray-700">
                  {entry.category}
                </span>
              )}
            </div>
            <pre className="mt-1 whitespace-pre-wrap break-words">
              {typeof entry.content === "string"
                ? entry.content
                : JSON.stringify(entry.content, null, 2)}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
});

export default LogsPanel;
