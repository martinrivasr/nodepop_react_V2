import axios, { isAxiosError } from "axios";
import { ApiClientError } from "../utils/error";
import storage from "../utils/storage";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});


const token = storage.get("auth");
if (token) {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
}

api.interceptors.response.use(undefined, (error) =>{
    const apiError = new ApiClientError("Api Client Error");

    if (error instanceof Error){
        apiError.message = error.message;

        if (isAxiosError<{ message:string }>(error)){
            apiError.message =
            error.response?.data.message ??
            error.response?.statusText ??
            apiError.message;
            const errorCode = error.code;
            const errorStatus = error.response?.status ?? error.status;

            if(errorCode === "ERR_NETWORK"){
                apiError.code = "NETWORK_ERROR";
            }
            if (typeof errorStatus === "number"){
                if(errorStatus === 401){
                    apiError.code = "UNAUTHORIZED";
                } else if (errorStatus === 404){
                    apiError.code = "NOT_FOUND";
                } else if (errorStatus >= 500){
                    apiError.code = "SERVER_ERROR"
                }
            }
        }
    }
    return Promise.reject(apiError);
});

export function isApiClientError(error:unknown): error is ApiClientError{
    return error instanceof ApiClientError
}

export const setAuthorizationHeader = (accessToken:string) => {
    api.defaults.headers["Authorization"] = `bearer ${accessToken}`
};

export const removeAuthorizationheader = () =>{     
    delete api.defaults.headers["Authorization"];
}
