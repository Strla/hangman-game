import {renderHook} from '@testing-library/react-hooks';
import {act} from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import useQuote from '../src/hooks/useQuote';

const mockAxios = new MockAdapter(axios);

describe('useQuote', () => {
    const fetchQuote = async () => {
        const result = await axios.get('https://api.quotable.io/random');
        return ({
            content: result.data.content,
            author: result.data.author,
        });
    };

    it('should fetch quote successfully', async () => {
        const mockData = {
            content: 'Test quote',
            author: 'Test author',
        };
        mockAxios.onGet('https://api.quotable.io/random').reply(200, mockData);

        const {result, waitForNextUpdate} = renderHook(() => useQuote(fetchQuote));

        expect(result.current.status).toBe('pending');
        expect(result.current.quoteData).toBeUndefined();

        await act(async () => {
            await waitForNextUpdate();
        });

        expect(result.current.status).toBe('success');
        expect(result.current.quoteData).toEqual(mockData);
        expect(result.current.error).toBeUndefined();
    });

    it('should handle error', async () => {
        mockAxios.onGet('https://api.quotable.io/random').reply(500);

        const {result, waitForNextUpdate} = renderHook(() => useQuote(fetchQuote));

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
