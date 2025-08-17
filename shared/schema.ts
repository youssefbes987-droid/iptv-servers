import { pgTable, text, serial, integer, boolean, timestamp, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role", { enum: ["manager", "salesman", "customer-service"] }).notNull(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  monthlyTarget: integer("monthly_target").default(0),
  achieved: integer("achieved").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const deals = pgTable("deals", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone"),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  status: text("status", { enum: ["pending", "approved", "rejected", "completed"] }).default("pending"),
  priority: text("priority", { enum: ["low", "medium", "high"] }).default("medium"),
  assignedToId: integer("assigned_to_id").references(() => users.id),
  createdById: integer("created_by_id").references(() => users.id).notNull(),
  approvedById: integer("approved_by_id").references(() => users.id),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  assignedDeals: many(deals, { relationName: "assignedDeals" }),
  createdDeals: many(deals, { relationName: "createdDeals" }),
  approvedDeals: many(deals, { relationName: "approvedDeals" }),
}));

export const dealsRelations = relations(deals, ({ one }) => ({
  assignedTo: one(users, {
    fields: [deals.assignedToId],
    references: [users.id],
    relationName: "assignedDeals",
  }),
  createdBy: one(users, {
    fields: [deals.createdById],
    references: [users.id],
    relationName: "createdDeals",
  }),
  approvedBy: one(users, {
    fields: [deals.approvedById],
    references: [users.id],
    relationName: "approvedDeals",
  }),
}));

// Schemas for validation
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  role: true,
  name: true,
  email: true,
  monthlyTarget: true,
  achieved: true,
  isActive: true,
});

export const updateUserSchema = createInsertSchema(users).pick({
  name: true,
  email: true,
  monthlyTarget: true,
  achieved: true,
  isActive: true,
}).partial();

export const insertDealSchema = createInsertSchema(deals).pick({
  title: true,
  description: true,
  customerName: true,
  customerEmail: true,
  customerPhone: true,
  amount: true,
  status: true,
  priority: true,
  assignedToId: true,
  notes: true,
});

export const updateDealSchema = insertDealSchema.partial();

export const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export const registerSchema = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(6).max(100),
  name: z.string().min(1).max(100),
  email: z.string().email(),
  role: z.enum(["salesman", "customer-service"]),
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertDeal = z.infer<typeof insertDealSchema>;
export type UpdateDeal = z.infer<typeof updateDealSchema>;
export type Deal = typeof deals.$inferSelect;
export type LoginRequest = z.infer<typeof loginSchema>;
export type RegisterRequest = z.infer<typeof registerSchema>;

// Deal with relations
export type DealWithRelations = Deal & {
  assignedTo?: User | null;
  createdBy: User;
  approvedBy?: User | null;
};
