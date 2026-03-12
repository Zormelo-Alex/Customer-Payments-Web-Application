import type React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes";

const App: React.FC = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
