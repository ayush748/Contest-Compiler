"use client";

import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export type Hint =
  | { type: "conceptual"; hint: string }
  | { type: "Algorithmic"; hint: string }
  | { type: "implementation"; hint: string }
  | { type: "other"; hint: string }
  | { type: "topics"; hint: string[] };

interface HintsListProps {
  hints: Hint[];
}

export const HintsList: React.FC<HintsListProps> = ({ hints }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [iconOffset, setIconOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const toggleHint = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const handleMouseEnter = (index: number) => {
    setHoverIndex(index);
    const x = Math.random() > 0.5 ? 80 : -80; // dodge left or right
    const y = Math.floor(Math.random() * 41) - 20; // -20px to +20px vertical
    setIconOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
    setIconOffset({ x: 0, y: 0 });
  };

  return (
    <div className="space-y-3">
      {hints.map((hint, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={index}
            className="rounded-lg  shadow-sm bg-black border border-neutral-900 text-white"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3 select-none">
              <span className="text-xs capitalize">{hint.type} Hint</span>

              {/* Eye is the only clickable target */}
              <div
                className="transition-transform duration-300 ease-in-out cursor-pointer text-white"
                style={
                  hoverIndex === index
                    ? { transform: `translate(${iconOffset.x}px, ${iconOffset.y}px)` }
                    : { transform: "translate(0,0)" }
                }
                onClick={() => toggleHint(index)}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                {isOpen ? (
                  <AiOutlineEyeInvisible className="w-6 h-6 text-white" />
                ) : (
                  <AiOutlineEye className="w-6 h-6 text-white" />
                )}
              </div>
            </div>

            {/* Dropdown content */}
            {isOpen && (
              <div className="p-3 border-t border-neutral-900 bg-black text-white rounded-b-lg">
                {hint.type === "topics" ? (
                  <ul className="list-disc list-inside">
                    {hint.hint.map((topic, i) => (
                      <li key={i}>{topic}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="font-thin">{hint.hint}</p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
