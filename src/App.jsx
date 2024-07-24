import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./component/layout/defaultLayout";
import SignIn from "./pages/signIn";
import Signup from "./pages/signUp";
import Dashboard from "./pages/dashboard";
import ErrorPage from "./pages/errorPage";
import HandleTasks from "./pages/handleTasks";
import Settings from "./pages/settings";
import DashboardMainPage from "./pages/DashboardMainPage";
import Reports from "./pages/reports";
import HandleSubTasks from "./pages/hanldeSubTasks";
import UserActivity from "./pages/userActivity";
import InvitedTasks from "./pages/InvitedTasks";
import TaskNotes from "./pages/TaskNotes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <DefaultLayout>
              <SignIn />
            </DefaultLayout>
          }
        />
        <Route
          path="/signup"
          element={
            <DefaultLayout>
              <Signup />
            </DefaultLayout>
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/manage-tasks" element={<HandleTasks />} />
        <Route path="/manage-sub-tasks" element={<HandleSubTasks />} />
        <Route path="/activity" element={<UserActivity />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/invitations" element={<InvitedTasks />} />
        <Route
          path="*"
          element={
            <DefaultLayout>
              <ErrorPage />
            </DefaultLayout>
          }
        />

        <Route path="/" element={<DashboardMainPage />} />

        <Route path="/tasknotes/:taskId" element={<TaskNotes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
