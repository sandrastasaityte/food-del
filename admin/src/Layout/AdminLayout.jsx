import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { setAuthToken } from "../api/api";
import Navbar from "../Components/Navbar/Navbar";
import Sidebar from "../Components/Sidebar/Sidebar";
import "./AdminLayout.css"; // import consolidated CSS

const AdminLayout = () => {
  const { getToken, isSignedIn, isLoaded } = useAuth();
  const [ready, setReady] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    let alive = true;

    (async () => {
      if (!isLoaded) return; // wait for Clerk
      if (!isSignedIn) {
        setAuthToken(null);
        if (alive) setReady(true); // let ProtectedRoute redirect
        return;
      }
      const token = await getToken();
      if (!alive) return;
      setAuthToken(token);
      setReady(true);
    })();

    return () => {
      alive = false;
    };
  }, [getToken, isSignedIn, isLoaded]);

  if (!ready) {
    return (
      <div style={{ padding: 20 }}>
        <p style={{ opacity: 0.8 }}>Loading admin session…</p>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      <Navbar onToggleSidebar={() => setSidebarOpen((v) => !v)} />
      <div className="app-content">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main
          className="admin-main"
          onClick={() => sidebarOpen && setSidebarOpen(false)}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
