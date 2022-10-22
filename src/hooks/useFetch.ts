import { useEffect, useState } from 'react';

export const useFetch = <T = undefined>(url: string, initialValue: T) => {
    const [data, setData] = useState(initialValue);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            setIsPending(true);

            try {
                const res = await fetch(url, { signal: controller.signal });
                if (!res.ok) {
                    throw new Error(res.statusText);
                }
                const json = await res.json();

                setIsPending(false);
                setData(json);
                setError('');
            } catch (err: any) {
                if (err.name === 'AbortError') {
                    console.log('the fetch was aborted');
                } else {
                    setIsPending(false);
                    setError('Could not fetch the data');
                    console.log(err.message);
                }
            }
        };

        fetchData();

        // cleanup function
        return () => {
            controller.abort();
        };
    }, [url]);

    return { data, isPending, error };
};
