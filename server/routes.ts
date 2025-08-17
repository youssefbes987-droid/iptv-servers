import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  loginSchema, 
  registerSchema,
  insertUserSchema,
  updateUserSchema,
  insertDealSchema,
  updateDealSchema,
  type User,
  type DealWithRelations 
} from "@shared/schema";
import { z } from "zod";

// Simple middleware to extract user info from auth header (in real app, use proper JWT)
const authenticateUser = async (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'No authorization header' });
  }
  
  const userId = parseInt(authHeader.replace('Bearer ', ''));
  const user = await storage.getUser(userId);
  
  if (!user || !user.isActive) {
    return res.status(401).json({ message: 'Invalid or inactive user' });
  }
  
  req.user = user;
  next();
};

const requireManager = (req: any, res: any, next: any) => {
  if (req.user.role !== 'manager') {
    return res.status(403).json({ message: 'Manager access required' });
  }
  next();
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  app.post('/api/login', async (req, res) => {
    try {
      const { username, password } = loginSchema.parse(req.body);
      
      const user = await storage.authenticateUser(username, password);
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Return user data with auth token (for simplicity, use user ID)
      const { password: _, ...userResponse } = user;
      res.json({ 
        user: userResponse,
        token: user.id.toString()
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid request data' });
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.post('/api/register', authenticateUser, requireManager, async (req, res) => {
    try {
      const userData = registerSchema.parse(req.body);
      
      // Check if username already exists
      const existingUser = await storage.getUserByUsername(userData.username);
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }

      const newUser = await storage.createUser({
        ...userData,
        monthlyTarget: 0,
        achieved: 0,
        isActive: true,
      });

      // Remove password from response
      const { password: _, ...userResponse } = newUser;
      res.status(201).json({ user: userResponse });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid request data', errors: error.errors });
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.post('/api/auth/logout', (req, res) => {
    res.json({ success: true });
  });

  // User management routes
  app.get('/api/users', authenticateUser, async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      // Remove passwords from response
      const usersResponse = users.map(({ password: _, ...user }) => user);
      res.json(usersResponse);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.get('/api/users/:id', authenticateUser, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const user = await storage.getUser(id);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Only managers can view other users, or users can view themselves
      if (req.user.role !== 'manager' && req.user.id !== id) {
        return res.status(403).json({ message: 'Access denied' });
      }

      // Remove password from response
      const { password: _, ...userResponse } = user;
      res.json(userResponse);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.put('/api/users/:id', authenticateUser, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      // Only managers can update other users, or users can update themselves (limited fields)
      if (req.user.role !== 'manager' && req.user.id !== id) {
        return res.status(403).json({ message: 'Access denied' });
      }

      const updateData = updateUserSchema.parse(req.body);
      
      let updatedUser;
      // Non-managers can only update certain fields
      if (req.user.role !== 'manager') {
        const { monthlyTarget, achieved, isActive, ...allowedUpdates } = updateData;
        updatedUser = await storage.updateUser(id, allowedUpdates);
      } else {
        updatedUser = await storage.updateUser(id, updateData);
      }
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Remove password from response
      const { password: _, ...userResponse } = updatedUser;
      res.json(userResponse);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid request data', errors: error.errors });
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.delete('/api/users/:id', authenticateUser, requireManager, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      // Can't delete yourself
      if (req.user.id === id) {
        return res.status(400).json({ message: 'Cannot delete your own account' });
      }

      const success = await storage.deleteUser(id);
      if (!success) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Deal management routes
  app.get('/api/deals', authenticateUser, async (req, res) => {
    try {
      let deals: DealWithRelations[];
      
      const { status, user: userFilter } = req.query;
      
      if (status) {
        deals = await storage.getDealsByStatus(status as string);
      } else if (userFilter) {
        const userId = parseInt(userFilter as string);
        deals = await storage.getDealsByUserId(userId);
      } else {
        deals = await storage.getAllDeals();
      }

      // Filter based on user role
      if (req.user.role !== 'manager') {
        deals = deals.filter(deal => 
          deal.assignedToId === req.user.id || deal.createdById === req.user.id
        );
      }

      res.json(deals);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.get('/api/deals/:id', authenticateUser, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deal = await storage.getDeal(id);
      
      if (!deal) {
        return res.status(404).json({ message: 'Deal not found' });
      }

      // Check access permissions
      if (req.user.role !== 'manager' && 
          deal.assignedToId !== req.user.id && 
          deal.createdById !== req.user.id) {
        return res.status(403).json({ message: 'Access denied' });
      }

      res.json(deal);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.post('/api/deals', authenticateUser, async (req, res) => {
    try {
      const dealData = insertDealSchema.parse(req.body);
      
      const newDeal = await storage.createDeal({
        ...dealData,
        createdById: req.user.id,
      });

      res.status(201).json(newDeal);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid request data', errors: error.errors });
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.put('/api/deals/:id', authenticateUser, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updateData = updateDealSchema.parse(req.body);
      
      const existingDeal = await storage.getDeal(id);
      if (!existingDeal) {
        return res.status(404).json({ message: 'Deal not found' });
      }

      // Check permissions
      if (req.user.role !== 'manager' && 
          existingDeal.assignedToId !== req.user.id && 
          existingDeal.createdById !== req.user.id) {
        return res.status(403).json({ message: 'Access denied' });
      }

      const updatedDeal = await storage.updateDeal(id, updateData);
      if (!updatedDeal) {
        return res.status(404).json({ message: 'Deal not found' });
      }

      res.json(updatedDeal);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid request data', errors: error.errors });
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.delete('/api/deals/:id', authenticateUser, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      const existingDeal = await storage.getDeal(id);
      if (!existingDeal) {
        return res.status(404).json({ message: 'Deal not found' });
      }

      // Only managers or deal creators can delete
      if (req.user.role !== 'manager' && existingDeal.createdById !== req.user.id) {
        return res.status(403).json({ message: 'Access denied' });
      }

      const success = await storage.deleteDeal(id);
      if (!success) {
        return res.status(404).json({ message: 'Deal not found' });
      }

      res.json({ message: 'Deal deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Deal approval routes (Manager only)
  app.post('/api/deals/:id/approve', authenticateUser, requireManager, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      const approvedDeal = await storage.approveDeal(id, req.user.id);
      if (!approvedDeal) {
        return res.status(404).json({ message: 'Deal not found' });
      }

      res.json(approvedDeal);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.post('/api/deals/:id/reject', authenticateUser, requireManager, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      const rejectedDeal = await storage.rejectDeal(id, req.user.id);
      if (!rejectedDeal) {
        return res.status(404).json({ message: 'Deal not found' });
      }

      res.json(rejectedDeal);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
