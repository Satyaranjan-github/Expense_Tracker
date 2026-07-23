export class ApiResponse<T = null> {
    success: boolean;
    message: string;
    data?: T;
    timestamp: string;

    constructor(success: boolean, message: string, data?: T) {
        this.success = success;
        this.message = message;
        this.data = data as T;
        this.timestamp = new Date().toISOString();
    }
}
