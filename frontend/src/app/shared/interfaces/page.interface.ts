export interface Page<T> {
    content: Array<T>;
    pageable?: {
        pageNumber: number,
        pageSize: number,
        sort: {
            sorted: boolean,
            empty: boolean,
            unsorted: boolean
        },
        offset: number,
        paged: boolean,
        unpaged: boolean
    },
    last?: boolean,
    totalPages?: number,
    totalElements?: number;
    size?: number;
    number: number;
}