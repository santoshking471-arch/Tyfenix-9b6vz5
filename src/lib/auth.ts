import type { User } from "@/types";

const STORAGE_KEY = "tyfenix_user";
const USERS_KEY = "tyfenix_users";

const ADMIN_EMAIL = "santoshking471@gmail.com";
const ADMIN_PASS = "Santosh@9368";

const DEFAULT_ADMIN: User = {
  id: "admin_001",
  name: "Santosh King",
  email: ADMIN_EMAIL,
  isAdmin: true,
  addresses: [],
  orders: [],
  createdAt: new Date().toISOString(),
};

export function getUsers(): User[] {
  try {
    const data = localStorage.getItem(USERS_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function saveUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getCurrentUser(): User | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export function setCurrentUser(user: User | null) {
  if (user) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}

export function login(email: string, password: string): { success: boolean; user?: User; error?: string } {
  // Admin login
  if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
    setCurrentUser(DEFAULT_ADMIN);
    return { success: true, user: DEFAULT_ADMIN };
  }

  // Regular user login
  const users = getUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user) return { success: false, error: "No account found with this email." };

  // In mock mode, password = email prefix (simple check)
  const storedPass = localStorage.getItem(`tyfenix_pass_${email}`);
  if (storedPass !== password) return { success: false, error: "Incorrect password." };

  setCurrentUser(user);
  return { success: true, user };
}

export function register(name: string, email: string, password: string, phone?: string): { success: boolean; user?: User; error?: string } {
  if (email === ADMIN_EMAIL) return { success: false, error: "This email is reserved." };

  const users = getUsers();
  const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (exists) return { success: false, error: "An account already exists with this email." };

  const newUser: User = {
    id: `user_${Date.now()}`,
    name,
    email,
    phone,
    isAdmin: false,
    addresses: [],
    orders: [],
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveUsers(users);
  localStorage.setItem(`tyfenix_pass_${email}`, password);
  setCurrentUser(newUser);
  return { success: true, user: newUser };
}

export function logout() {
  setCurrentUser(null);
}

export function socialLogin(provider: string): { success: boolean; user?: User } {
  const mockUser: User = {
    id: `social_${provider}_${Date.now()}`,
    name: provider === "google" ? "Google User" : provider === "facebook" ? "Facebook User" : "Twitter User",
    email: `user_${Date.now()}@${provider}.mock`,
    isAdmin: false,
    addresses: [],
    orders: [],
    createdAt: new Date().toISOString(),
  };
  setCurrentUser(mockUser);
  return { success: true, user: mockUser };
}

export function updateUser(updates: Partial<User>): User | null {
  const current = getCurrentUser();
  if (!current) return null;
  const updated = { ...current, ...updates };
  setCurrentUser(updated);

  // Update in users list
  const users = getUsers();
  const idx = users.findIndex((u) => u.id === current.id);
  if (idx >= 0) {
    users[idx] = updated;
    saveUsers(users);
  }
  return updated;
}
