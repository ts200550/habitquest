import { useState } from 'react';
import { Book } from '../types';

const useLocalStorage = <T,>(key: string, initialValue: T): [T, (value: T | ((prevState: T) => T)) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((prevState: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

export const useReadingLog = () => {
    const [books, setBooks] = useLocalStorage<Book[]>('habitQuest-books', []);

    const addBook = (book: Omit<Book, 'id'>) => {
        const newBook: Book = {
            ...book,
            id: new Date().toISOString(),
        };
        setBooks([...books, newBook]);
    };

    const updateBook = (bookId: string, updates: Partial<Book>) => {
        setBooks(books.map(b => (b.id === bookId ? { ...b, ...updates } : b)));
    };

    const deleteBook = (bookId: string) => {
        setBooks(books.filter(b => b.id !== bookId));
    };

    return {
        books,
        addBook,
        updateBook,
        deleteBook,
    };
};