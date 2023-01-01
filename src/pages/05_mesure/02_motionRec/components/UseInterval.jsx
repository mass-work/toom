import { useEffect } from 'react';

const useInterval = (callback, delay) => {
    useEffect(() => {
        const interval = setInterval(() => 
            callback()
        , delay || 0);
        return () => clearInterval(interval);
    }, [callback, delay]);
}

export default useInterval;