import { Storage } from '../interfaces/Storage';
import { StorageKey } from '../interfaces/StorageKey';

class LocalStorage implements Storage {
  private static instance: LocalStorage;

  private constructor() {}

  public static getInstance(): LocalStorage {
    if (!LocalStorage.instance) {
      LocalStorage.instance = new LocalStorage();
    }

    return LocalStorage.instance;
  }

  public getData<K extends StorageKey, T>(key: K): T | null {
    const data = localStorage.getItem(key) || null;

    if (typeof data === 'string') {
      return JSON.parse(data) as T;
    }
    return null;
  }

  public setData<K extends StorageKey, T>(key: K, data: T) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  public removeData<K extends StorageKey>(key: K) {
    localStorage.removeItem(key);
  }

  public removeAll() {
    localStorage.clear();
  }
}

export default LocalStorage;