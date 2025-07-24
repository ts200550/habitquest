import React, { useState, useEffect } from 'react';
import { Book, BookStatus } from '../types';
import { ProgressBar } from './ProgressBar';

interface BookItemProps {
    book: Book;
    onUpdate: (bookId: string, updates: Partial<Book>) => void;
    onDelete: (bookId: string) => void;
}

export const BookItem: React.FC<BookItemProps> = ({ book, onUpdate, onDelete }) => {
    const [isEditingNotes, setIsEditingNotes] = useState(false);
    const [notes, setNotes] = useState(book.notes || '');
    const [currentPageInput, setCurrentPageInput] = useState((book.currentPage || 0).toString());
    const [isManagingQuotes, setIsManagingQuotes] = useState(false);
    const [newQuote, setNewQuote] = useState('');

    useEffect(() => {
        setCurrentPageInput((book.currentPage || 0).toString());
    }, [book.currentPage]);
    
    useEffect(() => {
        if (book.status === 'Reading' && book.pageCount && book.currentPage === book.pageCount) {
            onUpdate(book.id, { status: 'Completed' });
        }
    }, [book.currentPage, book.pageCount, book.status, book.id, onUpdate]);

    const handleNotesSave = () => {
        onUpdate(book.id, { notes });
        setIsEditingNotes(false);
    };

    const handlePageUpdate = () => {
        let page = parseInt(currentPageInput, 10);
        if (isNaN(page)) return;
        if (page < 0) page = 0;
        if (book.pageCount && page > book.pageCount) page = book.pageCount;
        
        onUpdate(book.id, { currentPage: page });
    };

    const handleAddQuote = () => {
        if (newQuote.trim()) {
            const updatedQuotes = [...(book.quotes || []), newQuote.trim()];
            onUpdate(book.id, { quotes: updatedQuotes });
            setNewQuote('');
        }
    };

    const showProgress = book.status === 'Reading' && book.pageCount && book.pageCount > 0;

    return (
        <div className="bg-slate-900/70 p-4 rounded-lg border border-slate-700">
            <div className="flex justify-between items-start gap-4">
                <div className="flex-grow">
                    <p className="text-lg font-bold text-white">{book.title}</p>
                    <p className="text-sm text-slate-400">{book.author}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                    <select 
                        value={book.status} 
                        onChange={(e) => onUpdate(book.id, { status: e.target.value as BookStatus })}
                        className="bg-slate-700 text-sm border border-slate-600 rounded-md px-2 py-1 text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    >
                        <option value="Reading">Reading</option>
                        <option value="Completed">Completed</option>
                        <option value="Wishlist">Wishlist</option>
                    </select>
                    <button onClick={() => onDelete(book.id)} className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500 transition-colors text-lg">×</button>
                </div>
            </div>
             {showProgress && (
                 <div className="mt-3">
                    <div className="flex justify-between items-baseline text-xs text-slate-400 mb-1">
                        <span>Progress</span>
                        <span>Page {book.currentPage || 0} / {book.pageCount}</span>
                    </div>
                    <ProgressBar value={book.currentPage || 0} max={book.pageCount || 0} />
                    <div className="flex items-center gap-2 mt-2">
                        <label htmlFor={`page-update-${book.id}`} className="sr-only">Update current page</label>
                        <input
                            id={`page-update-${book.id}`}
                            type="number"
                            value={currentPageInput}
                            onChange={(e) => setCurrentPageInput(e.target.value)}
                            className="w-24 bg-slate-700 border border-slate-600 rounded-md px-2 py-1 text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
                        />
                         <button onClick={handlePageUpdate} className="px-4 py-1 text-xs bg-cyan-600 text-white font-semibold rounded hover:bg-cyan-500 transition-colors">Update</button>
                    </div>
                </div>
            )}
            <div className="mt-3">
                {isEditingNotes ? (
                    <div className="space-y-2">
                        <textarea 
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={3}
                            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
                            placeholder="Your thoughts on the book..."
                        />
                        <div className="flex justify-end gap-2">
                            <button onClick={() => setIsEditingNotes(false)} className="px-3 py-1 text-xs bg-slate-600 rounded">Cancel</button>
                            <button onClick={handleNotesSave} className="px-3 py-1 text-xs bg-cyan-600 rounded">Save Notes</button>
                        </div>
                    </div>
                ) : (
                    <div onClick={() => setIsEditingNotes(true)} className="cursor-pointer p-2 rounded-md hover:bg-slate-800/50">
                        {book.notes ? (
                            <p className="text-sm text-slate-300 italic whitespace-pre-wrap">{book.notes}</p>
                        ) : (
                            <p className="text-sm text-slate-500 italic">Click to add notes...</p>
                        )}
                    </div>
                )}
            </div>
            <div className="mt-4 border-t border-slate-800 pt-3">
                <button onClick={() => setIsManagingQuotes(!isManagingQuotes)} className="text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors w-full text-left flex justify-between items-center">
                    <span>{isManagingQuotes ? '▼' : '▶'} Quotes ({book.quotes?.length || 0})</span>
                </button>

                {isManagingQuotes && (
                    <div className="mt-2 space-y-3 p-3 bg-slate-800/50 rounded-lg">
                        {book.quotes && book.quotes.length > 0 ? (
                            <ul className="space-y-2">
                                {book.quotes.map((quote, index) => (
                                    <li key={index} className="text-sm text-slate-300 italic p-2 bg-slate-900/50 rounded">
                                        "{quote}"
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-slate-500 italic">No quotes added yet.</p>
                        )}
                        <div className="flex gap-2 pt-2 border-t border-slate-700/50">
                            <input
                                type="text"
                                value={newQuote}
                                onChange={e => setNewQuote(e.target.value)}
                                placeholder="Add a quote from the book"
                                className="flex-grow bg-slate-700 border border-slate-600 rounded-md px-2 py-1 text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
                            />
                             <button onClick={handleAddQuote} className="px-3 py-1 text-xs bg-cyan-600 text-white font-semibold rounded hover:bg-cyan-500 transition-colors">Add</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
