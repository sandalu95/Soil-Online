import * as React from "react";
import { Link } from "react-router-dom";

export const NumberWidget = (props) => {
  const { title, value, icon, buttonText, buttonLink } = props;

  return (
    <div className="flex flex-row px-4 py-3 border border-neutral-200 rounded-lg flex-1 justify-between">
      <div className="flex flex-col">
        <span className="font-sans text-neutral-400 text-sm font-bold mb-1">
          {title}
        </span>
        <span className="font-sans text-black text-xl font-extrabold mb-1">
          {value}
        </span>
        <Link to={buttonLink}>
          <div className="flex flex-row items-center">
            <span className="font-sans bg-primary-50 text-[10px] p-1 rounded text-primary-800 font-semibold mr-2">
              {buttonText}
            </span>

            <span className="font-sans text-neutral-400 text-xs">
              Click for more details
            </span>
          </div>
        </Link>
      </div>
      <div className="flex items-center">
        <div className="rounded-full p-4 flex items-center justify-center bg-primary-50">
          {icon}
        </div>
      </div>
    </div>
  );
};
