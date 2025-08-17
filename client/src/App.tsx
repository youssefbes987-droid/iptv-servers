import { Router, Route, Switch, Link, useLocation } from "wouter";
import { useState, createContext, useContext } from "react";
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';

// Simple auth context for the migrated app
interface User {
  id: number;
  username: string;
  role: "manager" | "salesman" | "customer-service";
  name: string;
  email: string;
  monthlyTarget: number;
  achieved: number;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

function App() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Router>
        <Switch>
          <Route path="/" component={LandingPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/dashboard" component={Dashboard} />
          <Route component={() => <div>404 - Page not found</div>} />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;