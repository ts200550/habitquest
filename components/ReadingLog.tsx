import React, { useMemo } from 'react';
import { Book } from '../types';
import { BookItem } from './BookItem';

interface ReadingLogProps {
    books: Book[];
    onUpdate: (bookId: string, updates: Partial<Book>) => void;
    onDelete: (bookId: string) => void;
    onNew: () => void;
}

export const ReadingLog: React.FC<ReadingLogProps> = ({ books, onUpdate, onDelete, onNew }) => {
    
    const shelves = useMemo(() => {
        return {
            reading: books.filter(b => b.status === 'Reading'),
            completed: books.filter(b => b.status === 'Completed'),
            wishlist: books.filter(b => b.status === 'Wishlist'),
        };
    }, [books]);

    return (
        <div className="bg-slate-800/80 rounded-xl p-6 shadow-lg border border-slate-700 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold font-oxanium text-white m-0 p-0 border-none">📚 Reading Log</h2>
                <button onClick={onNew} className="font-semibold text-white bg-gradient-to-r from-purple-500 to-indigo-500 px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">New Book</button>
            </div>
            
            {books.length === 0 ? (
                 <p className="text-slate-400 text-center py-4">Your library is empty. Add a book to start tracking!</p>
            ) : (
                <div className="space-y-6">
                    {shelves.reading.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold text-cyan-400 mb-2">Currently Reading</h3>
                            <div className="space-y-3">
                                {shelves.reading.map(book => <BookItem key={book.id} book={book} onUpdate={onUpdate} onDelete={onDelete} />)}
                            </div>
                        </div>
                    )}
                    {shelves.completed.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold text-green-400 mb-2">Completed Shelf</h3>
                            <div className="space-y-3">
                                {shelves.completed.map(book => <BookItem key={book.id} book={book} onUpdate={onUpdate} onDelete={onDelete} />)}
                            </div>
                        </div>
                    )}
                    {shelves.wishlist.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold text-amber-400 mb-2">Wishlist</h3>
                             <div className="space-y-3">
                                {shelves.wishlist.map(book => <BookItem key={book.id} book={book} onUpdate={onUpdate} onDelete={onDelete} />)}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
