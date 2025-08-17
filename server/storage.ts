import { users, type User, type InsertUser } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  authenticateUser(username: string, password: string): Promise<User | null>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.currentId = 1;
    
    // Initialize with mock users for the IPTV sales system
    this.initializeMockUsers();
  }

  private initializeMockUsers() {
    const mockUsers = [
      {
        username: 'admin',
        password: 'password',
        role: 'manager' as const,
        name: 'John Manager',
        email: 'admin@vmax.com',
        monthlyTarget: 0,
        achieved: 0,
      },
      {
        username: 'sales1',
        password: 'password',
        role: 'salesman' as const,
        name: 'Mike Salesman',
        email: 'mike@vmax.com',
        monthlyTarget: 50,
        achieved: 32,
      },
      {
        username: 'cs1',
        password: 'password',
        role: 'customer-service' as const,
        name: 'Sarah Support',
        email: 'sarah@vmax.com',
        monthlyTarget: 0,
        achieved: 0,
      },
    ];

    mockUsers.forEach(userData => {
      const id = this.currentId++;
      const user: User = { ...userData, id };
      this.users.set(id, user);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async authenticateUser(username: string, password: string): Promise<User | null> {
    const user = await this.getUserByUsername(username);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }
}

export const storage = new MemStorage();
