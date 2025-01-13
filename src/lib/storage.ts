import { AES, enc } from 'crypto-js';

const STORAGE_KEY = 'nurolab_settings';
const ENCRYPTION_KEY = 'nurolab_secure_storage'; // In production, use environment variable

interface StorageData {
  theme: 'light' | 'dark' | 'system';
  language: string;
  fontSize: 'small' | 'medium' | 'large';
  animations: boolean;
  notifications: boolean;
  [key: string]: any;
}

class SecureStorage {
  private static instance: SecureStorage;
  private data: StorageData;

  private constructor() {
    this.data = this.loadFromStorage();
  }

  public static getInstance(): SecureStorage {
    if (!SecureStorage.instance) {
      SecureStorage.instance = new SecureStorage();
    }
    return SecureStorage.instance;
  }

  private encrypt(data: any): string {
    return AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString();
  }

  private decrypt(encryptedData: string): any {
    try {
      const bytes = AES.decrypt(encryptedData, ENCRYPTION_KEY);
      return JSON.parse(bytes.toString(enc.Utf8));
    } catch {
      return null;
    }
  }

  private loadFromStorage(): StorageData {
    if (typeof window === 'undefined') return this.getDefaultSettings();

    const encrypted = localStorage.getItem(STORAGE_KEY);
    if (!encrypted) return this.getDefaultSettings();

    const decrypted = this.decrypt(encrypted);
    return decrypted || this.getDefaultSettings();
  }

  private saveToStorage(): void {
    if (typeof window === 'undefined') return;
    const encrypted = this.encrypt(this.data);
    localStorage.setItem(STORAGE_KEY, encrypted);
  }

  private getDefaultSettings(): StorageData {
    return {
      theme: 'system',
      language: 'en',
      fontSize: 'medium',
      animations: true,
      notifications: true,
    };
  }

  public get<T>(key: keyof StorageData): T {
    return this.data[key] as T;
  }

  public set<T>(key: keyof StorageData, value: T): void {
    this.data[key] = value;
    this.saveToStorage();
  }

  public clear(): void {
    this.data = this.getDefaultSettings();
    this.saveToStorage();
  }

  public getAllSettings(): StorageData {
    return { ...this.data };
  }
}

export const storage = SecureStorage.getInstance();
