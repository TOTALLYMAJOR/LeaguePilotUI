import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Schedule from "./pages/Schedule";
import Roster from "./pages/Roster";
import Messages from "./pages/Messages";
import Photos from "./pages/Photos";
import Volunteer from "./pages/Volunteer";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/roster" element={<Roster />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/photos" element={<Photos />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}