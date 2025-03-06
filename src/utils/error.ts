type ErrorCode =
| "UNAUTHORIZED"
| "NOT_FOUND"
| "SERVER_ERROR"
| "NETWORK_ERROR"
| "API_CLIENT_ERROR";

export class ApiClientError extends Error {
    code: ErrorCode;
    constructor(message:string, code:ErrorCode = "API_CLIENT_ERROR"){
        super(message);
        this.code = code
    }
}