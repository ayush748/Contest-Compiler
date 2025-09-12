"use client";
import { useState } from "react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative h-full">
      {/* Button to toggle sidebar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-4 left-4 z-50 px-3 py-2 bg-gray-800 text-white rounded"
      >
        Problem
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white transition-all duration-300 ${
          isOpen ? "w-1/2" : "w-16"
        }`}
      >
        {/* Content */}
        <div className="p-4">
          {isOpen ? (
            <div>
              <h2 className="text-xl font-bold mb-4">Paste Problem Statement</h2>
              <p>
                Here the problem will come. It covers half of the screen when
                open.
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-4 mt-16">
              
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
