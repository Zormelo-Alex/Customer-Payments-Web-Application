import React from "react";

const PageNotFound: React.FC = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-black p-8">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="h-full w-full relative z-10 flex flex-col justify-center items-center">
        <img
          className=""
          src="https://cdni.iconscout.com/illustration/premium/thumb/error-404-page-not-available-illustration-svg-download-png-7706458.png"
          alt=""
        />
        <button
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-200 text-black font-medium hover:bg-gray-300 transition"
          onClick={() => window.history.back()}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
