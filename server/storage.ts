import { 
  users, 
  deals,
  type User, 
  type InsertUser, 
  type UpdateUser,
  type Deal,
  type InsertDeal,
  type UpdateDeal,
  type DealWithRelations
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: UpdateUser): Promise<User | undefined>;
  deleteUser(id: number): Promise<boolean>;
  authenticateUser(username: string, password: string): Promise<User | null>;
  
  // Deal methods
  getDeal(id: number): Promise<DealWithRelations | undefined>;
  getAllDeals(): Promise<DealWithRelations[]>;
  getDealsByUserId(userId: number): Promise<DealWithRelations[]>;
  getDealsByStatus(status: string): Promise<DealWithRelations[]>;
  createDeal(deal: InsertDeal): Promise<DealWithRelations>;
  updateDeal(id: number, updates: UpdateDeal): Promise<DealWithRelations | undefined>;
  deleteDeal(id: number): Promise<boolean>;
  approveDeal(id: number, approvedById: number): Promise<DealWithRelations | undefined>;
  rejectDeal(id: number, approvedById: number): Promise<DealWithRelations | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private deals: Map<number, DealWithRelations>;
  private currentUserId: number;
  private currentDealId: number;

  constructor() {
    this.users = new Map();
    this.deals = new Map();
    this.currentUserId = 1;
    this.currentDealId = 1;
    
    this.initializeMockData();
  }

  private initializeMockData() {
    // Initialize users
    const mockUsers = [
      {
        username: 'admin',
        password: 'password',
        role: 'manager' as const,
        name: 'John Manager',
        email: 'admin@vmax.com',
        monthlyTarget: 100,
        achieved: 75,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'sales1',
        password: 'password',
        role: 'salesman' as const,
        name: 'Mike Salesman',
        email: 'mike@vmax.com',
        monthlyTarget: 50,
        achieved: 32,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'sales2',
        password: 'password',
        role: 'salesman' as const,
        name: 'Lisa Sales',
        email: 'lisa@vmax.com',
        monthlyTarget: 45,
        achieved: 28,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'cs1',
        password: 'password',
        role: 'customer-service' as const,
        name: 'Sarah Support',
        email: 'sarah@vmax.com',
        monthlyTarget: 0,
        achieved: 0,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    mockUsers.forEach(userData => {
      const id = this.currentUserId++;
      const user: User = { ...userData, id };
      this.users.set(id, user);
    });

    // Initialize sample deals
    this.initializeMockDeals();
  }

  private initializeMockDeals() {
    const mockDeals = [
      {
        title: 'Premium IPTV Package - Enterprise',
        description: '500+ channels with sports and movie packages',
        customerName: 'ABC Corporation',
        customerEmail: 'contact@abc-corp.com',
        customerPhone: '+1-555-0123',
        amount: '299.99',
        status: 'pending' as const,
        priority: 'high' as const,
        assignedToId: 2, // sales1
        createdById: 2,
        notes: 'Large enterprise client, needs quick approval',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Standard IPTV Package',
        description: '200+ channels basic package',
        customerName: 'John Smith',
        customerEmail: 'john.smith@email.com',
        customerPhone: '+1-555-0456',
        amount: '49.99',
        status: 'approved' as const,
        priority: 'medium' as const,
        assignedToId: 3, // sales2
        createdById: 3,
        approvedById: 1, // admin
        notes: 'Regular customer, approved for monthly billing',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Sports Package Add-on',
        description: 'Premium sports channels package',
        customerName: 'Mike Johnson',
        customerEmail: 'mike.j@email.com',
        customerPhone: '+1-555-0789',
        amount: '19.99',
        status: 'completed' as const,
        priority: 'low' as const,
        assignedToId: 2,
        createdById: 2,
        approvedById: 1,
        notes: 'Add-on to existing package',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    mockDeals.forEach(dealData => {
      const id = this.currentDealId++;
      const createdBy = this.users.get(dealData.createdById)!;
      const assignedTo = dealData.assignedToId ? this.users.get(dealData.assignedToId) : null;
      const approvedBy = dealData.approvedById ? this.users.get(dealData.approvedById) : null;
      
      const deal: DealWithRelations = {
        ...dealData,
        id,
        createdBy,
        assignedTo,
        approvedBy,
      };
      this.deals.set(id, deal);
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, updates: UpdateUser): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { 
      ...user, 
      ...updates, 
      updatedAt: new Date() 
    };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async deleteUser(id: number): Promise<boolean> {
    return this.users.delete(id);
  }

  async authenticateUser(username: string, password: string): Promise<User | null> {
    const user = await this.getUserByUsername(username);
    if (user && user.password === password && user.isActive) {
      return user;
    }
    return null;
  }

  // Deal methods
  async getDeal(id: number): Promise<DealWithRelations | undefined> {
    return this.deals.get(id);
  }

  async getAllDeals(): Promise<DealWithRelations[]> {
    return Array.from(this.deals.values());
  }

  async getDealsByUserId(userId: number): Promise<DealWithRelations[]> {
    return Array.from(this.deals.values()).filter(
      deal => deal.assignedToId === userId || deal.createdById === userId
    );
  }

  async getDealsByStatus(status: string): Promise<DealWithRelations[]> {
    return Array.from(this.deals.values()).filter(
      deal => deal.status === status
    );
  }

  async createDeal(insertDeal: InsertDeal): Promise<DealWithRelations> {
    const id = this.currentDealId++;
    const createdBy = this.users.get(insertDeal.createdById)!;
    const assignedTo = insertDeal.assignedToId ? this.users.get(insertDeal.assignedToId) : null;
    
    const deal: DealWithRelations = {
      ...insertDeal,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy,
      assignedTo,
      approvedBy: null,
    };
    
    this.deals.set(id, deal);
    return deal;
  }

  async updateDeal(id: number, updates: UpdateDeal): Promise<DealWithRelations | undefined> {
    const deal = this.deals.get(id);
    if (!deal) return undefined;
    
    const assignedTo = updates.assignedToId ? this.users.get(updates.assignedToId) : deal.assignedTo;
    
    const updatedDeal: DealWithRelations = {
      ...deal,
      ...updates,
      assignedTo,
      updatedAt: new Date(),
    };
    
    this.deals.set(id, updatedDeal);
    return updatedDeal;
  }

  async deleteDeal(id: number): Promise<boolean> {
    return this.deals.delete(id);
  }

  async approveDeal(id: number, approvedById: number): Promise<DealWithRelations | undefined> {
    const deal = this.deals.get(id);
    if (!deal) return undefined;
    
    const approvedBy = this.users.get(approvedById);
    if (!approvedBy) return undefined;
    
    const updatedDeal: DealWithRelations = {
      ...deal,
      status: 'approved',
      approvedById,
      approvedBy,
      updatedAt: new Date(),
    };
    
    this.deals.set(id, updatedDeal);
    return updatedDeal;
  }

  async rejectDeal(id: number, approvedById: number): Promise<DealWithRelations | undefined> {
    const deal = this.deals.get(id);
    if (!deal) return undefined;
    
    const approvedBy = this.users.get(approvedById);
    if (!approvedBy) return undefined;
    
    const updatedDeal: DealWithRelations = {
      ...deal,
      status: 'rejected',
      approvedById,
      approvedBy,
      updatedAt: new Date(),
    };
    
    this.deals.set(id, updatedDeal);
    return updatedDeal;
  }
}

export const storage = new MemStorage();
