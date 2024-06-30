import * as React from "react";

export const WidgetContainer = (props) => {
  const { title, children } = props;

  return (
    <div className="px-4 py-3 border border-neutral-200 rounded-lg flex-1">
      <div className="flex flex-col">
        <span className="font-sans text-black text-sm font-extrabold mb-3">
          {title}
        </span>
        {children}
      </div>
    </div>
  );
};
