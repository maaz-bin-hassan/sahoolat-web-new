// components/BuyerExtras.jsx
"use client";

import { useMemo } from "react";

export default function BuyerExtras({
                                      imageUrl,
                                      onImageUrlChange,
                                      buyerId,
                                      onBuyerIdChange,
                                    }) {
  const isValidUrl = useMemo(() => {
    if (!imageUrl) return true;
    try {
      const u = new URL(imageUrl);
      return !!u.protocol && !!u.host;
    } catch {
      return false;
    }
  }, [imageUrl]);

  return (
    <div className="space-y-4 mb-4">
      <label className="block">
        <span className="text-gray-700 font-medium">Buyer ID</span>
        <input
          type="text"
          className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={buyerId || ""}
          onChange={(e) => onBuyerIdChange(e.target.value)}
          placeholder="e.g. 342eb5c4-4297-45da-bc2d-96184a7c8891"
        />
        <span className="block mt-1 text-xs text-gray-500">
          You can paste an internal/UUID or any reference ID for this buyer.
        </span>
      </label>

      <label className="block">
        <span className="text-gray-700 font-medium">Image URL (optional)</span>
        <input
          type="url"
          className={`mt-2 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
            isValidUrl
              ? "border-gray-300 focus:ring-indigo-500"
              : "border-red-300 focus:ring-red-500"
          }`}
          value={imageUrl || ""}
          onChange={(e) => onImageUrlChange(e.target.value)}
          placeholder="https://example.com/avatar.jpg"
        />
        {!isValidUrl && (
          <span className="block mt-1 text-xs text-red-600">
            Please enter a valid URL.
          </span>
        )}
      </label>

      {/* Preview (only when valid http(s) url) */}
      {imageUrl && isValidUrl && /^https?:\/\//i.test(imageUrl) && (
        <div className="mt-2">
          <span className="text-xs text-gray-600">Preview:</span>
          <div className="mt-2 p-2 border rounded-md inline-block">
            <img
              src={imageUrl}
              alt="Buyer preview"
              className="h-24 w-24 object-cover rounded-md"
              onError={(e) => {
                e.currentTarget.src =
                  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='96' height='96'><rect width='100%' height='100%' fill='%23eee'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-family='Arial' font-size='12'>No Image</text></svg>";
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
