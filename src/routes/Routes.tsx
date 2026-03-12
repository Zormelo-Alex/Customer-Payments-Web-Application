import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import ErrorPage from "../pages/ErrorPage";
import PageNotFound from "../pages/PageNotFound";
import PaymentDashboard from "../pages/PaymentDashboard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<LandingPage />} errorElement={<ErrorPage />} />
      <Route
        path="/payment"
        element={<PaymentDashboard />}
        errorElement={<ErrorPage />}
      />

      <Route path="*" element={<PageNotFound />} />
    </Route>,
  ),
);

export default router;
