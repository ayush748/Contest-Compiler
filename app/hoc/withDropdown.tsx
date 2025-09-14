import React, {
  useEffect,
  useState,
  useRef,
  ComponentType,
  FC,
  ReactNode,
} from "react";

// Props injected by the HOC
export interface DropdownInjectedProps {
  isOpen: boolean;
  toggleDropdown: () => void;
  children?: ReactNode; // 👈 allow modal content via children
}

function withDropdown<P extends object>(
  WrapperComponent: ComponentType<P & DropdownInjectedProps>
): FC<P & { children?: ReactNode }> {
  const HOC: FC<P & { children?: ReactNode }> = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const toggleDropdown = () => setIsOpen((prev) => !prev);

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
      <div ref={dropdownRef}>
        <WrapperComponent
          {...(props as P)}
          isOpen={isOpen}
          toggleDropdown={toggleDropdown}
        >
          {props.children}
        </WrapperComponent>
      </div>
    );
  };

  HOC.displayName = `withDropdown(${
    WrapperComponent.displayName || WrapperComponent.name || "Component"
  })`;

  return HOC;
}

export default withDropdown;
