import { ChangeEvent, useEffect, useState } from "react";
import { createSearchParams, useSearchParams } from "react-router-dom";

type OptionsProps = {
    setDefaultFilterOnMount?: boolean
    sortByParam?: `ASC` | `DESC`
    orderByParam?: string
};

export default function useTableFilterHooks({ setDefaultFilterOnMount = true, sortByParam = `ASC`, orderByParam }: OptionsProps = {}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get(`q`) || ``);
    function handleSearchQuery(e: ChangeEvent<HTMLInputElement>) {
        setSearchQuery(e.target.value);
    }
    // const [sortBy, setSortBy] = useState(sortByParam);
    function handleSort(columnName: string) {
        // if click on the same column, toggle sortType
        if (columnName === getSingleParam(`orderBy`)) {
            // toggle sortType
            updateParam(`sortBy`, getSingleParam(`sortBy`) === `ASC` ? `DESC` : `ASC`)
        } else {
            updateParamByObject({ sortBy: `DESC`, orderBy: columnName })
        }
    }

    const getSingleParam = (name: string) => searchParams.get(name);
    const getAllParam = () => Object.fromEntries(searchParams.entries());
    const updateParam = (key: string, value: string) => {
        setSearchParams(prevSearchParams => createSearchParams({
            ...Object.fromEntries(prevSearchParams.entries()),
            [key]: value
        }));
    };
    const updateParamByObject = (params: { [key: string]: string }) => {
        setSearchParams(prevSearchParams => createSearchParams({
            ...Object.fromEntries(prevSearchParams.entries()),
            ...params
        }));
    };

    useEffect(() => {
        const params = getAllParam();
        if (setDefaultFilterOnMount) {
            setSearchParams(createSearchParams(orderByParam
                ? { q: params?.q || searchQuery, page: params?.page || `1`, limit: params?.limit || `10`, sortBy: sortByParam, orderBy: orderByParam, }
                : { q: params?.q || searchQuery, page: params?.page || `1`, limit: params?.limit || `10`, sortBy: sortByParam }
            ));
        }
    }, [])

    // FOR DEBOUNCE SEARCH QUERY
    useEffect(() => {
        // get all if just the URL param "page" has mounted
        // so it won't double fetching
        if (getSingleParam(`page`)) {
            const timeoutId = setTimeout(() => {
                updateParam(`q`, searchQuery);
            }, 1600);
            return () => { clearTimeout(timeoutId); };
        }
    }, [searchQuery, getSingleParam(`page`)])

    return {
        getSingleParam, getAllParam, updateParam, updateParamByObject, handleSort, setSearchQuery,
        handleSearchQuery,
    };
}