import {useCallback, useEffect, useState} from 'react';

type QuoteData = {
    content: string;
    author: string;
};

type UseQuoteResult = {
    quoteData: QuoteData | undefined;
    status: 'pending' | 'success' | 'error';
    error: Error | undefined;
    onResolve: (data: QuoteData) => void;
    onReject: (error: Error) => void;
};

const useQuote = (quotePromiseFn: () => Promise<QuoteData>): UseQuoteResult => {
    const [quoteData, setQuoteData] = useState<QuoteData | undefined>(undefined);
    const [status, setStatus] = useState<'pending' | 'success' | 'error'>('pending');
    const [error, setError] = useState<Error | undefined>(undefined);

    const onResolve = useCallback((data: QuoteData) => {
        setQuoteData(data);
        setStatus('success');
    }, []);

    const onReject = useCallback((error: Error) => {
        setError(error);
        setStatus('error');
    }, []);

    useEffect(() => {
        setStatus('pending');
        quotePromiseFn()
            .then((data) => {
                onResolve(data);
            })
            .catch((error) => {
                onReject(error);
            });
    }, [quotePromiseFn, onResolve, onReject]);

    return {quoteData, status, error, onResolve, onReject};
};

export default useQuote;
