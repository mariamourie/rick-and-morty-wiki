export interface Info {
    count: number;
    pages: number;
    next: string;
    prev: string
}

export interface Response<T> {
    info: Info;
    results: T[]
}