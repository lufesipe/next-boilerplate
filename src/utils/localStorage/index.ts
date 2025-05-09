export const setLocalStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error setting localStorage:', error);
  }
};

export const getLocalStorage = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  } catch (error) {
    console.error('Error getting localStorage:', error);
    return null;
  }
};
