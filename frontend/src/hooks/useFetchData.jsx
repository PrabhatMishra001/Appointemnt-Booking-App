import { useEffect, useState, useCallback } from 'react';
import { token } from '../config';

const useFetchData = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        console.log(`Fetching data from ${url}`);
        try {
            const res = await fetch(url, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!res.ok) {
                const errorText = await res.text(); // Get the response text if it's not JSON
                console.error('Error response:', errorText);
                throw new Error(errorText);
            }

            const result = await res.json();
            console.log('Response:', result);
            setData(result.data);
        } catch (err) {
            console.error('Error:', err);
            setError(err.message);
        } finally {
            setLoading(false);
            console.log('Loading complete');
        }
    }, [url]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
};

export default useFetchData;
