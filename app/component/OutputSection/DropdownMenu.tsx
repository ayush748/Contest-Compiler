import React, { useState, useRef, useEffect } from "react";

const DropdownWithHOC: React.FC<{ label: string; children: React.ReactNode }> = ({
  label,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="px-4 py-2 bg-[#3498DB] text-white rounded hover:bg-[#2980B9]"
      >
        {label}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 min-w-[220px] bg-neutral-900 border border-gray-500 rounded shadow-lg z-20 p-2">
          {children}
        </div>
      )}
    </div>
  );
};

export default DropdownWithHOC;
