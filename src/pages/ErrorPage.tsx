import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const error = useRouteError() as Error;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-primary_color capitalize mb-4">
        Oops! {error?.message || "Something went wrong..."}
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        We apologize for the inconvenience. Please try again later.
      </p>
      <img
        src="https://ouch-cdn2.icons8.com/7VvFyC515Y1E1JaSOZBcvEq2iUjaKaojSlBhtCHHmRA/rs:fit:608:456/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvMzU2/LzdjYjEyM2Q1LWQz/NjItNDI3NS1iYjk5/LWNiMDE2Zjk3ODQ3/ZS5zdmc.png"
        alt="Error Illustration"
        className="w-64 h-auto mb-8"
      />
      <button className="btn-gradient text-white font-semibold py-2 px-8 rounded" onClick={() => window.history.back()}>
        Go Back
      </button>
    </div>
  );
};

export default ErrorPage;
