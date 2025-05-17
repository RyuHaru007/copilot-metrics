import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import Organization from '@/pages/Organization';
import Languages from '@/pages/Languages';
import Editors from '@/pages/Editors';
import CopilotChat from '@/pages/CopilotChat';
import SeatAnalysis from '@/pages/SeatAnalysis';
// import ApiResponse from '@/pages/ApiResponse';
import PageLayout from '@/components/PageLayout';

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <PageLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="organization" element={<Organization />} />
          <Route path="languages" element={<Languages />} />
          <Route path="editors" element={<Editors />} />
          <Route path="copilot-chat" element={<CopilotChat />} />
          <Route path="seat-analysis" element={<SeatAnalysis />} />
          {/* <Route path="api-response" element={<ApiResponse />} /> */}
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;