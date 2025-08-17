import { Router, Route, Switch, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from './hooks/use-auth';
import { Toaster } from "./components/ui/toaster";
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';


const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  
  if (!user) {
    return <Redirect to="/login" />;
  }
  
  return <>{children}</>;
}

function AppRouter() {
  const { user } = useAuth();

  return (
    <Router>
      <Switch>
        <Route path="/">
          {user ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
        </Route>
        
        <Route path="/login">
          {user ? <Redirect to="/dashboard" /> : <LoginPage />}
        </Route>
        
        <Route path="/dashboard">
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        </Route>

        
        <Route component={() => <div className="flex items-center justify-center min-h-screen text-lg">404 - Page not found</div>} />
      </Switch>
    </Router>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppRouter />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;