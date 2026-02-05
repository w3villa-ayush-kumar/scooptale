import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import Home from "./features/home/pages/Home";
import Login from "./features/auth/pages/Login";
import Signup from "./features/auth/pages/Signup";
import OAuthSuccess from "./features/auth/pages/OAuthSuccess";
// import OAuthCallback from "./features/auth/pages/OAuthCallback";
import AppLayout from "./layout/AppLayout";
import Profile from "./features/profile/pages/Profile";
import MoviePage from "./features/movies/pages/MoviePage";
import AuthLayout from "./layout/AuthLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import Shelves from "./features/shelves/pages/Shelves";
import Plans from "./features/billing/pages/Plans";
import BillingSuccess from "./features/billing/pages/BillingSuccess";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        richColors
        closeButton
        expand={false}
        toastOptions={{ duration: 4000 }}
      />
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/movies/:tmdbId" element={<MoviePage />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-movies"
            element={
              <ProtectedRoute>
                <Shelves />
              </ProtectedRoute>
            }
          />

          <Route
            path="/plans"
            element={
              <ProtectedRoute>
                <Plans />
              </ProtectedRoute>
            }
          />

          <Route
            path="/billing/success"
            element={
              <ProtectedRoute>
                <BillingSuccess />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/auth/google/callback" element={<OAuthCallback />} /> */}
          {/* <Route path="/auth/facebook/callback" element={<OAuthCallback />} /> */}
          <Route path="/oauth-success" element={<OAuthSuccess />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
