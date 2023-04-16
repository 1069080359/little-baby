/**
 * 封装本地存储工具
 * localCache.getItem('user')
 * sessionCache.setItem('name','rain')
 * sessionCache.getItem('token')
 * localCache.clear()
 */
class MyCache {
  storage: Storage;
  constructor(isLocal = true) {
    this.storage = isLocal ? localStorage : sessionStorage;
  }

  setItem(key: string, value: string) {
    if (typeof value === 'object') value = JSON.stringify(value);
    this.storage.setItem(key, value);
  }

  getItem(key: string) {
    try {
      return JSON.parse(this.storage.getItem(key) || '{}');
    } catch (err) {
      return this.storage.getItem(key);
    }
  }

  removeItem(key: string) {
    this.storage.removeItem(key);
  }

  clear() {
    this.storage.clear();
  }

  key(index: number) {
    return this.storage.key(index);
  }

  length() {
    return this.storage.length;
  }
}

const localCache = new MyCache();
const sessionCache = new MyCache(false);

export { localCache, sessionCache };
