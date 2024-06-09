import {act, renderHook} from '@testing-library/react-hooks';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import useCachedQuoteSometimes from '../src/hooks/useCachedQuoteSometimes';

const mockAxios = new MockAdapter(axios);

interface Quote {
    content: string;
    author: string;
}

describe('useCachedQuoteSometimes', () => {
    const fetchQuote = async (): Promise<Quote> => {
        const result = await axios.get('https://api.quotable.io/random');
        return {
            content: result.data.content,
            author: result.data.author,
        };
    };

    beforeEach(() => {
        localStorage.clear();
        mockAxios.reset();
    });

    it('should fetch and cache quote successfully', async () => {
        const mockData: Quote = {
            content: 'Test quote',
            author: 'Test author',
        };
        mockAxios.onGet('https://api.quotable.io/random').reply(200, mockData);

        const {result, waitForNextUpdate} = renderHook(() => useCachedQuoteSometimes(fetchQuote));

        expect(result.current.status).toBe('pending');
        expect(result.current.quoteData).toBeUndefined();

        await act(async () => {
            await waitForNextUpdate();
        });

        expect(result.current.status).toBe('success');
        expect(result.current.quoteData).toEqual(mockData);
        expect(result.current.error).toBeUndefined();

        const cachedQuotes: Quote[] = JSON.parse(localStorage.getItem('quotes') || '[]');
        expect(cachedQuotes).toContainEqual(mockData);
    });

    it('should return cached quote when API fails', async () => {
        const mockData: Quote = {
            content: 'Test quote',
            author: 'Test author',
        };
        localStorage.setItem('quotes', JSON.stringify([mockData]));

        mockAxios.onGet('https://api.quotable.io/random').reply(500);

        const {result, waitForNextUpdate} = renderHook(() => useCachedQuoteSometimes(fetchQuote));

        expect(result.current.status).toBe('pending');
        expect(result.current.quoteData).toBeUndefined();

        await act(async () => {
            await waitForNextUpdate();
        });

        expect(result.current.status).toBe('success');
        expect(result.current.quoteData).toEqual(mockData);
        expect(result.current.error).toBeUndefined();
    });

    it('should handle error when no cached quotes available', async () => {
        mockAxios.onGet('https://api.quotable.io/random').reply(500);

        const {result, waitForNextUpdate} = renderHook(() => useCachedQuoteSometimes(fetchQuote));

        expect(result.current.status).toBe('pending');
        expect(result.current.quoteData).toBeUndefined();

        await act(async () => {
            await waitForNextUpdate();
        });

        expect(result.current.status).toBe('error');
        expect(result.current.quoteData).toBeUndefined();
        expect(result.current.error).toBeDefined();
    });
});
