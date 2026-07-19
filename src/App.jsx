import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext.jsx";
import Layout from "./components/Layout.jsx";

// Parent pages
import ParentHome from "./pages/parent/Home.jsx";
import ParentSchedule from "./pages/parent/Schedule.jsx";
import ParentRSVP from "./pages/parent/RSVP.jsx";
import ParentMessages from "./pages/parent/Messages.jsx";
import ParentRoster from "./pages/parent/Roster.jsx";
import ParentPhotos from "./pages/parent/Photos.jsx";
import ParentVolunteers from "./pages/parent/Volunteers.jsx";
import ParentReplay from "./pages/parent/Replay.jsx";
import ParentWallet from "./pages/parent/Wallet.jsx";

// Coach pages
import CoachDashboard from "./pages/coach/Dashboard.jsx";
import CoachCalendar from "./pages/coach/Calendar.jsx";
import CoachAttendance from "./pages/coach/Attendance.jsx";
import CoachMessages from "./pages/coach/Messages.jsx";
import CoachReplay from "./pages/coach/ParentReplay.jsx";
import CoachRookieAssist from "./pages/coach/RookieAssist.jsx";
import CoachAIWorkspace from "./pages/coach/AIWorkspace.jsx";
import CoachRoster from "./pages/coach/Roster.jsx";
import CoachWeather from "./pages/coach/Weather.jsx";

// Admin pages
import AdminOverview from "./pages/admin/Overview.jsx";
import AdminRegistrations from "./pages/admin/Registrations.jsx";
import AdminFamilyAccess from "./pages/admin/FamilyAccess.jsx";
import AdminTeams from "./pages/admin/Teams.jsx";
import AdminImports from "./pages/admin/Imports.jsx";
import AdminInvitations from "./pages/admin/Invitations.jsx";
import AdminSchedule from "./pages/admin/Schedule.jsx";
import AdminCommunications from "./pages/admin/Communications.jsx";
import AdminSafety from "./pages/admin/Safety.jsx";
import AdminMedia from "./pages/admin/Media.jsx";
import AdminSponsors from "./pages/admin/Sponsors.jsx";
import AdminBranding from "./pages/admin/Branding.jsx";
import AdminReports from "./pages/admin/Reports.jsx";
import AdminSecurity from "./pages/admin/Security.jsx";

function LayoutRoute({ children }) {
  return <Layout>{children}</Layout>;
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/parent" replace />} />

          {/* Parent */}
          <Route path="/parent" element={<LayoutRoute><ParentHome /></LayoutRoute>} />
          <Route path="/parent/schedule" element={<LayoutRoute><ParentSchedule /></LayoutRoute>} />
          <Route path="/parent/rsvp" element={<LayoutRoute><ParentRSVP /></LayoutRoute>} />
          <Route path="/parent/messages" element={<LayoutRoute><ParentMessages /></LayoutRoute>} />
          <Route path="/parent/roster" element={<LayoutRoute><ParentRoster /></LayoutRoute>} />
          <Route path="/parent/photos" element={<LayoutRoute><ParentPhotos /></LayoutRoute>} />
          <Route path="/parent/volunteers" element={<LayoutRoute><ParentVolunteers /></LayoutRoute>} />
          <Route path="/parent/replay" element={<LayoutRoute><ParentReplay /></LayoutRoute>} />
          <Route path="/parent/wallet" element={<LayoutRoute><ParentWallet /></LayoutRoute>} />

          {/* Coach */}
          <Route path="/coach" element={<LayoutRoute><CoachDashboard /></LayoutRoute>} />
          <Route path="/coach/calendar" element={<LayoutRoute><CoachCalendar /></LayoutRoute>} />
          <Route path="/coach/attendance" element={<LayoutRoute><CoachAttendance /></LayoutRoute>} />
          <Route path="/coach/messages" element={<LayoutRoute><CoachMessages /></LayoutRoute>} />
          <Route path="/coach/replay" element={<LayoutRoute><CoachReplay /></LayoutRoute>} />
          <Route path="/coach/rookie-assist" element={<LayoutRoute><CoachRookieAssist /></LayoutRoute>} />
          <Route path="/coach/ai-workspace" element={<LayoutRoute><CoachAIWorkspace /></LayoutRoute>} />
          <Route path="/coach/roster" element={<LayoutRoute><CoachRoster /></LayoutRoute>} />
          <Route path="/coach/weather" element={<LayoutRoute><CoachWeather /></LayoutRoute>} />

          {/* Admin */}
          <Route path="/admin" element={<LayoutRoute><AdminOverview /></LayoutRoute>} />
          <Route path="/admin/registrations" element={<LayoutRoute><AdminRegistrations /></LayoutRoute>} />
          <Route path="/admin/family-access" element={<LayoutRoute><AdminFamilyAccess /></LayoutRoute>} />
          <Route path="/admin/teams" element={<LayoutRoute><AdminTeams /></LayoutRoute>} />
          <Route path="/admin/imports" element={<LayoutRoute><AdminImports /></LayoutRoute>} />
          <Route path="/admin/invitations" element={<LayoutRoute><AdminInvitations /></LayoutRoute>} />
          <Route path="/admin/schedule" element={<LayoutRoute><AdminSchedule /></LayoutRoute>} />
          <Route path="/admin/communications" element={<LayoutRoute><AdminCommunications /></LayoutRoute>} />
          <Route path="/admin/safety" element={<LayoutRoute><AdminSafety /></LayoutRoute>} />
          <Route path="/admin/media" element={<LayoutRoute><AdminMedia /></LayoutRoute>} />
          <Route path="/admin/sponsors" element={<LayoutRoute><AdminSponsors /></LayoutRoute>} />
          <Route path="/admin/branding" element={<LayoutRoute><AdminBranding /></LayoutRoute>} />
          <Route path="/admin/reports" element={<LayoutRoute><AdminReports /></LayoutRoute>} />
          <Route path="/admin/security" element={<LayoutRoute><AdminSecurity /></LayoutRoute>} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}
