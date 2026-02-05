import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AppProvider from "./context/AppProvider.jsx";
import GoogleMapsProvider from "./shared/ui/GoogleMapsProvider";

createRoot(document.getElementById("root")).render(
  <GoogleMapsProvider>
    <AppProvider>
      <App />
    </AppProvider>
  </GoogleMapsProvider>,
);
