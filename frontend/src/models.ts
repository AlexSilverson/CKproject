export interface RemindInfo {
    id: number;
    userId: number;
    before: number[];
    message: string;
    date: string;

}

export interface User {
    id: number;
    jwt: string;
}