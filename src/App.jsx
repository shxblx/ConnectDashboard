import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import UserManagement from "./components/UserManagement";
import TaskManagement from "./components/TaskManagement";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Navigate to="analytics" replace />} />
          <Route path="analytics" element={<AnalyticsDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="tasks" element={<TaskManagement />} />
        </Route>
        <Route
          path="/"
          element={<Navigate to="/dashboard/analytics" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
