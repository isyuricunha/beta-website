import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="w-full pt-10">
      <div className="flex items-center justify-center rounded-t-xl bg-panel-light py-5 text-neutral-300 shadow-sm backdrop-blur-md">
        <p className="font-light">
          &copy; {new Date().getFullYear()} Sean Fong
        </p>
      </div>
    </footer>
  );
};

export default Footer;
