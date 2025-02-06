// src/services/agent.ts
import axios, { AxiosResponse } from "axios";
import { PdfUploadResponse, MealOut, Meal, BulkMeal } from "../types/recipe";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string): Promise<T> =>
    axiosInstance.get<T>(url).then(responseBody),
  post: <T, B>(url: string, body: B): Promise<T> =>
    axiosInstance.post<T>(url, body).then(responseBody),
  put: <T, B>(url: string, body: B): Promise<T> =>
    axiosInstance.put<T>(url, body).then(responseBody),
  delete: <T>(url: string): Promise<T> =>
    axiosInstance.delete<T>(url).then(responseBody),
};

const Process = {
  uploadPdf: (file: File): Promise<PdfUploadResponse> => {
    const formData = new FormData();
    formData.append("file", file);

    return axiosInstance
      .post<PdfUploadResponse>("/process/pdf", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(responseBody);
  },
};

const Meals = {
  list: (): Promise<MealOut[]> => requests.get<MealOut[]>("/meals"),

  create: (mealData: Meal): Promise<MealOut> =>
    requests.post<MealOut, Meal>("/meals", mealData),

  createBulk: (mealsData: BulkMeal[]): Promise<MealOut[]> =>
    requests.post<MealOut[], BulkMeal[]>("/meals/bulk", mealsData),

  update: (id: number, mealData: Partial<Meal>): Promise<MealOut> =>
    requests.put<MealOut, Partial<Meal>>(`/meals/${id}`, mealData),

  delete: (id: number): Promise<void> => requests.delete<void>(`/meals/${id}`),
};

const agent = {
  Process,
  Meals,
};

export default agent;
