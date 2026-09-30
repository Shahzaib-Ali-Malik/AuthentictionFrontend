import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setAccessToken } from '../features/Auth/state/AuthReducer'
import { useMemo } from 'react' // 1. Import useMemo

export const useApi = () => {
    const dispatch = useDispatch()
    const { accessToken } = useSelector(store => store.authReducer)

    // 2. Wrap axios.create in useMemo so it stays stable across renders
    const api = useMemo(() => {
        const instance = axios.create({
            baseURL: import.meta.env.PROD ? '' : 'http://localhost:5173/api',
            withCredentials: true
        });

        instance.interceptors.request.use(
            config => {
                config.headers.Authorization = `Bearer ${accessToken}`
                return config
            }
        );

        instance.interceptors.response.use(
            (response) => response,
            async (error) => {
                const req = error.config;
                if (error.response?.status === 401 && !req._retry && !req.url.includes('/auth/refresh')) {
                    req._retry = true;
                    try {
                        const res = await instance.post('/auth/refresh');
                        dispatch(setAccessToken(res.data.data.accessToken));
                        req.headers.Authorization = `Bearer ${res.data.data.accessToken}`;
                        return instance(req);
                    } catch (refreshError) {
                        return Promise.reject(refreshError);
                    }
                }

                // Error formatting logic...
                const responseData = error.response?.data;
                const validationArray = responseData?.errors?.errors || responseData?.errors;
                let customErrors = {};
                if (Array.isArray(validationArray) && validationArray.length > 0) {
                    customErrors = { msg: validationArray[0].msg, path: validationArray[0].path };
                } else {
                    customErrors = { msg: responseData?.message || "An unexpected error occurred", path: "general" };
                }
                return Promise.reject(customErrors);
            }
        );

        return instance;
    }, [accessToken, dispatch]); // Re-create only if token changes

    return api;
}