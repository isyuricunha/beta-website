import React from "react";
import "@/app/styles/loading.css";
import cn from "classnames";

type Props = {
  className?: string;
};

const PageLoadingComponent = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "flex h-screen w-screen flex-col items-center justify-center",
        className,
      )}
    >
      <div className="flex flex-col">
        <div className="lds-ellipsis ellipsis-top">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="lds-ellipsis ellipsis-middle">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="lds-ellipsis ellipsis-bottom">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default PageLoadingComponent;
