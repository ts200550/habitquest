import React, { useState } from 'react';
import { Book, BookStatus } from '../types';

interface AddBookModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddBook: (book: Omit<Book, 'id'>) => void;
}

export const AddBookModal: React.FC<AddBookModalProps> = ({ isOpen, onClose, onAddBook }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [status, setStatus] = useState<BookStatus>('Wishlist');
    const [notes, setNotes] = useState('');
    const [pageCount, setPageCount] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!title || !author) return;

        onAddBook({ 
            title, 
            author, 
            status, 
            notes, 
            pageCount: pageCount ? parseInt(pageCount, 10) : undefined,
            currentPage: 0,
        });
        setTitle('');
        setAuthor('');
        setStatus('Wishlist');
        setNotes('');
        setPageCount('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-slate-800 rounded-xl p-8 shadow-2xl border border-slate-700 w-full max-w-lg" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold font-oxanium text-white mb-6">Add New Book</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-semibold text-slate-300 mb-1">Title</label>
                            <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
                        </div>
                        <div>
                            <label htmlFor="author" className="block text-sm font-semibold text-slate-300 mb-1">Author</label>
                            <input type="text" id="author" value={author} onChange={e => setAuthor(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
                        </div>
                    </div>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                           <label htmlFor="pageCount" className="block text-sm font-semibold text-slate-300 mb-1">Total Pages (Optional)</label>
                           <input type="number" id="pageCount" value={pageCount} min="1" onChange={e => setPageCount(e.target.value)} className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                        </div>
                        <div>
                            <label htmlFor="status" className="block text-sm font-semibold text-slate-300 mb-1">Status</label>
                            <select id="status" value={status} onChange={e => setStatus(e.target.value as BookStatus)} className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500">
                                <option>Wishlist</option>
                                <option>Reading</option>
                                <option>Completed</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="notes" className="block text-sm font-semibold text-slate-300 mb-1">Notes (Optional)</label>
                        <textarea id="notes" value={notes} onChange={e => setNotes(e.target.value)} rows={3} className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"></textarea>
                    </div>
                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="px-6 py-2 bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-500 transition-colors">Cancel</button>
                        <button type="submit" className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity">Add Book</button>
                    </div>
                </form>
            </div>
        </div>
    );
};