import secureAxios from "./secureAxios";

export const fetchTodoData = async () => {
  try {
    const response = await secureAxios.get("todo-details/");
    return response || [];
  } catch (error) {
    return 0;
  }
};

export const addNewUSer = async (userData) => {
  try {
    const formData = new FormData();
    formData.append("userData", JSON.stringify(userData));
    const response = await secureAxios.post("users-login/", formData);
    return response;
  } catch (error) {
    return 0;
  }
};
export const addTodoData = async (todoData) => {
  try {
    const formData = new FormData();
    formData.append("todoData", JSON.stringify(todoData));
    const response = await secureAxios.post("todo-details/", formData);
    return response;
  } catch (error) {
    return 0;
  }
};

export const getTodoData = async (userEmail) => {
  try {
    const formData = new FormData();
    formData.append("userIdData", JSON.stringify(userEmail));
    const response = await secureAxios.post("todo-details-data/",formData);
    return response.data || [];
  } catch (error) {
    return 0;
  }
};

export const checkTodoData = async (exportData) => {
  try {
    const response = await secureAxios.put("todo-details/", exportData);
    return response.data;
  } catch (error) {
    return 0;
  }
};

export const deleteTodoData = async (id) => {
  try {
    const response = await secureAxios.delete(`todo-details/${id}`);
    return response.data;
  } catch (error) {
    return 0;
  }
};

export const deleteTasks = async (userDeleteId) => {
  try {
    const formData = new FormData();
    formData.append("userDeleteId", JSON.stringify(userDeleteId));
    const response = await secureAxios.post("delete-tasks/", formData);
    return response;
  } catch (error) {
    return 0;
  }
};


