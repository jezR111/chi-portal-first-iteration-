import React from "react";

const tileImages = [
  '/public/file.svg',
  '/public/globe.svg',
  '/public/next.svg',
  '/public/vercel.svg',
  '/public/window.svg',
  '/public/file.svg',
  '/public/globe.svg',
  '/public/next.svg',
  '/public/vercel.svg',
];

export function ContentLibraryGrid() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {tileImages.map((img, i) => (
        <div
          key={i}
          className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg p-4 flex flex-col items-center justify-center hover:scale-105 transition-transform cursor-pointer border border-gray-100 group"
        >
          <div className="w-16 h-16 flex items-center justify-center mb-2 rounded-full overflow-hidden bg-white shadow group-hover:shadow-xl transition-shadow">
            <img src={img.replace('/public', '/')} alt={`Content ${i + 1}`} className="w-12 h-12 object-contain" />
          </div>
          <div className="font-semibold text-sm text-center text-gray-700 group-hover:text-blue-600 transition-colors">Content {i + 1}</div>
        </div>
      ))}
    </div>
  );
}
