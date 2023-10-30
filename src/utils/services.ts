import axios, { AxiosError } from "axios";
import { API_URL } from "../../config";

interface ApiResponse {
  error: boolean;
  data: object | string;
  status: number | undefined;
}

export const get = async (
  token: string,
  url: string,
  params: object,
): Promise<ApiResponse> => {
  try {
    const headers = token != "" ? { Authorization: `${token}` } : {};
    const response = await axios.get(`${API_URL}${url}`, {
      headers,
      params,
    });
    return {
      ...response,
      error: false,
    };
  } catch (err) {
    const error = err as Error | AxiosError;
    let message, status;
    if (!axios.isAxiosError(error)) {
      message = error.message;
      status = 500;
    } else {
      message = error.response?.data;
      status = error.response?.status;
    }
    console.error(message);
    return {
      error: true,
      data: message,
      status,
    };
  }
};

export const post = async (
  token: string,
  url: string,
  body: object,
  params: object,
): Promise<ApiResponse> => {
  try {
    const response = await axios.post(`${API_URL}${url}`, body, {
      headers: {
        Authorization: `${token}`,
      },
      params,
    });
    return {
      ...response,
      error: false,
    };
  } catch (err) {
    const error = err as Error | AxiosError;
    let message, status;
    if (!axios.isAxiosError(error)) {
      message = error.message;
      status = 500;
    } else {
      message = error.response?.data;
      status = error.response?.status;
    }
    console.error(message);

    return {
      error: true,
      data: message,
      status,
    };
  }
};
