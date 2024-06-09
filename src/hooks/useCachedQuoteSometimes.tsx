import {useEffect, useState} from 'react';
import useQuote from './useQuote';

interface Quote {
    content: string;
    author: string;
}

const useCachedQuoteSometimes = (quotePromiseFn: () => Promise<Quote>) => {
    const [cachedQuotes, setCachedQuotes] = useState<Quote[]>([]);
    const {status, quoteData, error} = useQuote(quotePromiseFn);

    useEffect(() => {
        if (status === 'success' && quoteData) {
            const storedQuotes: Quote[] = JSON.parse(localStorage.getItem('quotes') || '[]');
            if (!storedQuotes.find(quote => quote.content === quoteData.content)) {
                const updatedQuotes = [...storedQuotes, quoteData];
                localStorage.setItem('quotes', JSON.stringify(updatedQuotes));
                setCachedQuotes(updatedQuotes);
            }
        }
    }, [status, quoteData]);

    useEffect(() => {
        const storedQuotes: Quote[] = JSON.parse(localStorage.getItem('quotes') || '[]');
        setCachedQuotes(storedQuotes);
    }, []);

    const getCachedQuote = () => {
        if (cachedQuotes.length > 0) {
            const randomQuote = cachedQuotes[Math.floor(Math.random() * cachedQuotes.length)];
            return {status: 'success', quoteData: randomQuote, error: undefined};
        }
        return {status: 'error', quoteData: undefined, error: new Error('No cached quotes available')};
    };

    if (status === 'error' && cachedQuotes.length > 0) {
        return getCachedQuote();
    }

    return {status, quoteData, error};
};

export default useCachedQuoteSometimes;
