export interface User {
  id: string;
  email: string;
  password: string;
  role: 'admin' | 'master';
  masterId?: string;
  createdAt: string;
}

const USERS_STORAGE_KEY = 'app_users';

// Импортируем функции санитизации
import { sanitizeString, isValidEmail } from './sanitize';

export const loadUsers = (): User[] => {
  try {
    const stored = localStorage.getItem(USERS_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Валидация загруженных данных
      if (Array.isArray(parsed)) {
        return parsed.filter(u => 
          u.id && u.email && u.password && u.role && u.createdAt
        );
      }
    }
  } catch (error) {
    console.error('Error loading users:', error);
  }
  
  // Default users
  return [
    {
      id: 'admin-1',
      email: 'dlm78@mail.ru',
      password: '123456',
      role: 'admin',
      createdAt: new Date().toISOString()
    },
    {
      id: 'master-1',
      email: 'milatrade@mail.ru',
      password: 'Master2024!',
      role: 'master',
      masterId: '1',
      createdAt: new Date().toISOString()
    }
  ];
};

export const saveUsers = (users: User[]): void => {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Error saving users:', error);
  }
};

export const authenticateUser = (email: string, password: string): User | null => {
  // Дополнительная санитизация на всякий случай
  const sanitizedEmail = sanitizeString(email, 255).toLowerCase();
  const sanitizedPassword = sanitizeString(password, 255);
  
  if (!isValidEmail(sanitizedEmail)) {
    return null;
  }
  
  const users = loadUsers();
  const user = users.find(u => 
    u.email.toLowerCase() === sanitizedEmail && 
    u.password === sanitizedPassword
  );
  return user || null;
};

export const createMaster = (email: string, password: string, masterId: string): User => {
  // Санитизация входных данных
  const sanitizedEmail = sanitizeString(email, 255).toLowerCase();
  const sanitizedPassword = sanitizeString(password, 255);
  const sanitizedMasterId = sanitizeString(masterId, 50);
  
  if (!isValidEmail(sanitizedEmail)) {
    throw new Error('Invalid email format');
  }
  
  if (sanitizedPassword.length < 6) {
    throw new Error('Password must be at least 6 characters');
  }
  
  const users = loadUsers();
  const userId = `user-${Date.now()}`;
  const newUser: User = {
    id: userId,
    email: sanitizedEmail,
    password: sanitizedPassword,
    role: 'master',
    masterId: sanitizedMasterId,
    createdAt: new Date().toISOString()
  };
  users.push(newUser);
  saveUsers(users);
  
  // Сохраняем userId для связи с профилем мастера
  localStorage.setItem(`master_userId_${sanitizedMasterId}`, userId);
  
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
