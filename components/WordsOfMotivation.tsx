import React, { useState, useMemo, useEffect } from 'react';
import { Book } from '../types';

interface WordsOfMotivationProps {
    books: Book[];
}

interface Quote {
    text: string;
    title: string;
    author: string;
}

export const WordsOfMotivation: React.FC<WordsOfMotivationProps> = ({ books }) => {
    const allQuotes = useMemo<Quote[]>(() => {
        return books.flatMap(book => 
            (book.quotes || []).map(quoteText => ({
                text: quoteText,
                title: book.title,
                author: book.author,
            }))
        );
    }, [books]);

    const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);

    const pickRandomQuote = React.useCallback(() => {
        if (allQuotes.length > 0) {
            const randomIndex = Math.floor(Math.random() * allQuotes.length);
            setCurrentQuote(allQuotes[randomIndex]);
        } else {
            setCurrentQuote(null);
        }
    }, [allQuotes]);

    useEffect(() => {
        pickRandomQuote();
    }, [pickRandomQuote]);

    if (allQuotes.length === 0) {
        return (
             <div className="bg-slate-800/80 rounded-xl p-6 shadow-lg border border-slate-700 backdrop-blur-sm">
                <h2 className="text-xl font-bold font-oxanium text-white mb-2 p-0 border-none">📖 Words of Motivation</h2>
                <div className="text-center bg-slate-900/50 p-4 rounded-lg">
                    <p className="text-slate-300 italic">Add some quotes from your favorite books in the Reading Log to see them here!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-slate-800/80 rounded-xl p-6 shadow-lg border border-slate-700 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold font-oxanium text-white m-0 p-0 border-none">📖 Words of Motivation</h2>
                <button onClick={pickRandomQuote} className="font-semibold text-xs text-white bg-slate-700 px-3 py-1 rounded-lg hover:bg-slate-600 transition-opacity">
                    New Quote
                </button>
            </div>
            
            <div className="text-center bg-slate-900/50 p-6 rounded-lg relative min-h-[150px] flex items-center justify-center">
                <span className="absolute top-2 left-4 text-6xl font-serif text-cyan-500/30 opacity-50">“</span>
                {currentQuote ? (
                    <blockquote className="relative">
                        <p className="text-lg md:text-xl text-slate-200 italic leading-relaxed">
                            {currentQuote.text}
                        </p>
                        <footer className="mt-4 text-right">
                            <p className="font-semibold text-slate-300">
                                - {currentQuote.author}
                            </p>
                            <p className="text-sm text-slate-400">
                                from "{currentQuote.title}"
                            </p>
                        </footer>
                    </blockquote>
                ) : (
                    <p className="text-slate-400">No quote to display.</p>
                )}
                 <span className="absolute bottom-2 right-4 text-6xl font-serif text-cyan-500/30 opacity-50">”</span>
            </div>
        </div>
    );
};
