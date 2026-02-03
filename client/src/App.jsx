import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./features/home/pages/Home";
import Login from "./features/auth/pages/Login";
import Signup from "./features/auth/pages/Signup";
import OAuthSuccess from "./features/auth/pages/OAuthSuccess";
import OAuthCallback from "./features/auth/pages/OAuthCallback";
import AppLayout from "./layout/AppLayout";
import Profile from "./features/profile/pages/Profile";
import MoviePage from "./features/movies/pages/MoviePage";
import AuthLayout from "./layout/AuthLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/movies/:tmdbId" element={<MoviePage />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/auth/google/callback" element={<OAuthCallback />} />
          <Route path="/auth/facebook/callback" element={<OAuthCallback />} />
          <Route path="/oauth-success" element={<OAuthSuccess />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
