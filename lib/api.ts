import axios, { AxiosError } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  // headers: {
  //   'Content-Type': 'application/json',
  // },
});


export const apiError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      'Something went wrong';

    throw new Error(message);
  }

  throw new Error('Unexpected error occurred');
};

// let isRefreshing = false;
// let failedQueue: any[] = [];

// const processQueue = (error: any) => {
//   failedQueue.forEach((p) => p.reject(error));
//   failedQueue = [];
// };

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // Access token expired
//     if (
//       error.response?.status === 401 &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;

//       if (isRefreshing) {
//         return new Promise((_, reject) => {
//           failedQueue.push({ reject });
//         });
//       }

//       isRefreshing = true;

//       try {
//         await api.post("/api/auth/refresh");
//         isRefreshing = false;
//         return api(originalRequest);
//       } catch (err) {
//         isRefreshing = false;
//         processQueue(err);

//         // Refresh failed → logout
//         window.location.href = "/login";
//         return Promise.reject(err);
//       }
//     }

//     return Promise.reject(error);
//   }
// );
