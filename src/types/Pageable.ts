interface Sort {
    direction: string;
    nullHandling: string;
    ascending: boolean;
    property: string;
    ignoreCase: boolean;
}

interface PageableDetails {
    offset: number;
    sort: Sort[];
    paged: boolean;
    pageNumber: number;
    pageSize: number;
    unpaged: boolean;
}

export default interface Pageable<T> {
    totalElements: number;
    totalPages: number;
    size: number;
    content: T[];
    number: number;
    sort: Sort[];
    numberOfElements: number;
    pageable: PageableDetails;
    first: boolean;
    last: boolean;
    empty: boolean;
}
