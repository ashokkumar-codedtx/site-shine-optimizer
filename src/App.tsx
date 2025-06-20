import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { Layout } from "@/components/Layout";
import ReaderHome from "./pages/ReaderHome";
import NewsDetail from "./pages/NewsDetail";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import { PostList } from "./pages/admin/PostList";
import { UserList } from "./pages/admin/UserList";
import { CommentsList } from "./pages/admin/CommentsList";
import { LikesList } from "./pages/admin/LikesList";
import { ActivityLogs } from "./pages/admin/ActivityLogs";
import Settings from "./pages/admin/Settings";
import ACLControl from "./pages/admin/ACLControl";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: string[] }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  const { user } = useAuth();
  
  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
      <Route path="/" element={<Layout><ReaderHome /></Layout>} />
      <Route path="/news/:id" element={<Layout><NewsDetail /></Layout>} />
      <Route 
        path="/admin/*" 
        element={
          <ProtectedRoute allowedRoles={['admin', 'creator']}>
            <Layout>
              <Routes>
                <Route index element={<AdminDashboard />} />
                <Route path="posts" element={<PostList />} />
                <Route path="users" element={<UserList />} />
                <Route path="comments" element={<CommentsList />} />
                <Route path="likes" element={<LikesList />} />
                <Route path="logs" element={<ActivityLogs />} />
                <Route path="settings" element={<Settings />} />
                <Route path="acl" element={<ACLControl />} />
                <Route path="*" element={<AdminDashboard />} />
              </Routes>
            </Layout>
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
