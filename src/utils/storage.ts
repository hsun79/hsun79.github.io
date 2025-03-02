/**
 * Safe localStorage wrapper that handles access errors
 */
export const safeStorage = {
  getItem(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.warn('Unable to access localStorage:', e);
      return null;
    }
  },
  
  setItem(key: string, value: string): boolean {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (e) {
      console.warn('Unable to write to localStorage:', e);
      return false;
    }
  }
}; 