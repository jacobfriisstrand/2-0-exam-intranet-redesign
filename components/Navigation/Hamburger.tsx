"use client";

interface HamburgerProps {
  isOpened: boolean;
  openMenu: () => void;
}

function Hamburger({ isOpened, openMenu: onClick }: HamburgerProps) {
  return (
    <button
      aria-expanded={isOpened}
      aria-controls="primary-navigation"
      aria-haspopup="true"
      className="size-6 lg:hidden"
      onClick={onClick}
    >
      <div className="grid justify-items-center gap-1">
        <span
          className={`h-[1px] w-4 bg-white transition duration-200 ease-in ${
            isOpened ? "translate-y-[5px] rotate-45 delay-200" : ""
          }`}
        />
        <span
          className={`h-[1px] w-4 bg-white transition duration-500 ease-in-out ${
            isOpened ? "scale-0 transition " : "delay-200"
          }`}
        />
        <span
          className={`h-[1px] w-4 bg-white transition duration-200 ease-in ${
            isOpened ? "-translate-y-[5px] -rotate-45 delay-200 " : ""
          }`}
        />
      </div>
    </button>
  );
}

export default Hamburger;
