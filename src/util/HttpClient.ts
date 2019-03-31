import axios, {AxiosInstance, AxiosPromise, AxiosRequestConfig} from "axios";

export class HttpClient {
    private readonly _axios: AxiosInstance;
    private lastExecuteTime: number = 0;

    constructor(endpoint: string, timeout: number = 10000, rateLimitInterval: number = 1100) {
        this._axios = axios.create({
            baseURL: endpoint,
            timeout: timeout
        });

        // TOO MANY REQUESTS PREVENT
        this._axios.interceptors.request.use(req => {
            const now = Date.now();
            this.lastExecuteTime += rateLimitInterval;
            const wait = this.lastExecuteTime - now;
            if (wait > 0) {
                return new Promise((resolve => {
                    setTimeout(() => resolve(req), wait)
                }));
            }

            this.lastExecuteTime = now;
            return req;
        });

        // DEBUG
        this._axios.interceptors.request.use(req => {
            console.debug(`Making request to ${req.url}`);
            console.debug("Request data:");
            console.debug(req);
            return req;
        });
        this._axios.interceptors.response.use(res => {
            console.debug(`Request to ${res.request.url} responded with:`);
            console.debug(res);

            return res;
        });

        // ERROR HANDLING
        this._axios.interceptors.response.use(res => res, error => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error(`${error.request.responseURL} responded with a non-2xx status code!`);
            } else if (error.request) {
                // The request was made but no response was received
                console.error(`${error.request.responseURL} did not respond!`)
            } else {
                // Unknown error
                console.error(`${error.request.responseURL} threw an unknown error`);
            }
            console.error("General error:");
            console.error(error);
            console.error("Request:");
            console.error(error.request);
            console.error("Response: ");
            console.error(error.response);

            return Promise.reject(error);
        });
    }

    get axios(): AxiosInstance {
        return this._axios;
    }

    get(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this.axios.get(url, config)
    }

    delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this.axios.delete(url, config)
    }

    head(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this.axios.head(url, config)
    }

    post(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this.axios.post(url, config)
    }

    put(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this.axios.put(url, config)
    }

    patch(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this.axios.patch(url, config)
    }
}
