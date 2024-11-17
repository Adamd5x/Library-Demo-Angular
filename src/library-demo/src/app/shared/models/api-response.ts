import { Page } from "./page";

export interface ApiResponse<TData> {
    success: boolean;
    error?: string;
    code?: string;
    data?: TData | null | undefined;
    page?: Page;
}