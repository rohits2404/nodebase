import { PAGINATION } from "@/config/constants";
import { useEffect, useState } from "react";

interface UseEntitySearchProps<T extends {
    search: string;
    page: number;
}> {
    params: T;
    setParams: (updater: (prev: T) => T) => void;
    debounceMs?: number;
}

export function useEntitySearch<
    T extends {
        search: string;
        page: number;
    }
>({
    params,
    setParams,
    debounceMs = 500,
}: UseEntitySearchProps<T>) {
    const [localSearch, setLocalSearch] = useState(params.search);

    // Debounced search sync
    useEffect(() => {
        const timer = setTimeout(() => {
            setParams((prev) => {
                if (localSearch === prev.search) return prev;
                return {
                    ...prev,
                    search: localSearch,
                    page: PAGINATION.DEFAULT_PAGE,
                };
            });
        }, debounceMs);
        return () => clearTimeout(timer);
    }, [localSearch, debounceMs, setParams]);

    // Sync external param changes → input
    useEffect(() => {
        setLocalSearch(params.search);
    }, [params.search]);

    return {
        searchValue: localSearch,
        onSearchChange: setLocalSearch,
    };
}