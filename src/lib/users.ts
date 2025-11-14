export interface User {
  id: string;
  email: string;
  password: string;
  role: 'admin' | 'master';
  masterId?: string;
  createdAt: string;
}

const USERS_STORAGE_KEY = 'app_users';

export const loadUsers = (): User[] => {
  try {
    const stored = localStorage.getItem(USERS_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading users:', error);
  }
  
  // Default admin user
  return [{
    id: 'admin-1',
    email: 'dlm78@mail.ru',
    password: '123456',
    role: 'admin',
    createdAt: new Date().toISOString()
  }];
};

export const saveUsers = (users: User[]): void => {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Error saving users:', error);
  }
};

export const authenticateUser = (email: string, password: string): User | null => {
  const users = loadUsers();
  const user = users.find(u => u.email === email && u.password === password);
  return user || null;
};

export const createMaster = (email: string, password: string, masterId: string): User => {
  const users = loadUsers();
  const userId = `user-${Date.now()}`;
  const newUser: User = {
    id: userId,
    email,
    password,
    role: 'master',
    masterId,
    createdAt: new Date().toISOString()
  };
  users.push(newUser);
  saveUsers(users);
  
  // Сохраняем userId для связи с профилем мастера
  localStorage.setItem(`master_userId_${masterId}`, userId);
  
  return newUser;
};

export const deleteUser = (userId: string): void => {
  const users = loadUsers();
  const filtered = users.filter(u => u.id !== userId);
  saveUsers(filtered);
};

export const updateUser = (userId: string, updates: Partial<User>): void => {
  const users = loadUsers();
  const updated = users.map(u => u.id === userId ? { ...u, ...updates } : u);
  saveUsers(updated);
};
