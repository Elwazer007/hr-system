import apiClient from ".";
import { Employee } from "../types/employees";

export const fetchEmployees = async () => {
  try {
    const response = await apiClient.get("/employees");
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch employees");
  }
};

export const addEmployee = async (employee: Employee) => {
  try {
    const response = await apiClient.post("/employees/", employee);
    return response;
  } catch (error) {
    throw new Error("An Error while adding employee");
  }
};

export const fetchEmployee = async (id: number | string) => {
  try {
    const response = await apiClient.get(`/employees/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch employee");
  }
};

export const editEmployee = async (id: number | string, employee: Employee) => {
  try {
    const response = await apiClient.put(`/employees/${id}/`, employee);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to edit employee");
  }
};

export const addAttendance = async (id: number | null, date: string) => {
  try {
    const response = await apiClient.post(`/attendance/`, {
      employee: id,
      date,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add attendance");
  }
};
