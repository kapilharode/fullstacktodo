import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import {
  addTodoData,
  deleteTasks,
  fetchTodoData,
  getTodoData,
} from "../../apiServices/utils";
import TodoListShow from "./TodoListShow";
import { GoogleLogout } from "react-google-login";
import Alert from "@mui/material/Alert";
import toast, { Toaster } from "react-hot-toast";

const TodoAddData = () => {
  const [todoInput, setTodoInput] = useState();
  const [todoData, setTodoData] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    fetchData([0, 1]);
  }, []);

  const fetchData = async (isStateData) => {
    const userIds = parseInt(localStorage.getItem("userIdData"));
    const userEmail = localStorage.getItem("userEmail");
    console.log(userEmail, "userEmail");
    const todo = await getTodoData(userEmail);
    const todoFilterData = todo.filter((data) => {
      return data.is_state != isStateData;
    });
    setTodoData(todoFilterData);
  };

  const handleAdd = async () => {
    const userIds = parseInt(localStorage.getItem("userIdData"));
    const todoData = {
      todo_data: todoInput,
      is_state: 0,
      user_id: userIds,
    };
    await addTodoData(todoData).then((res) => {
      fetchData([0, 1]);
      toast.success("Successfully Added Task !");
      setTodoInput("");
    });
  };

  const logout = () => {
    localStorage.clear();
    history("/");
  };

  const handleDelete = async (id) => {
    let idsData = [];
    todoData
      .filter((data) => data.is_state != id)
      .map((idData) => {
        idsData.push(idData.id);
      });
    console.log(idsData);
    if (idsData.length > 0) {
      await deleteTasks(idsData).then((res) => {
        fetchData([0, 1]);
        toast.success("Successfully Delete !");
      });
    } else {
      toast("Task Not Done Yet");
    }
  };

  return (
    <div>
      <TextField
        id="standard-error"
        label="New Todo"
        placeholder="Please Enter Todo Title"
        variant="standard"
        value={todoInput}
        onChange={(val) => {
          setTodoInput(val.target.value);
        }}
        style={{ width: "47%" }}
      />

      <div>
        {todoInput?.length > 0 && (
          <Button
            variant="contained"
            color="success"
            onClick={() => handleAdd()}
            style={{ marginTop: "20px", width:'30%' }}
          >
            Add New Task{" "}
          </Button>
        )}
      </div>
      <TodoListShow todoData={todoData} fetchData={fetchData} />
      {todoData.length > 0 && (
        <>
          {" "}
          <Button
            variant="contained"
            color="success"
            onClick={() => handleDelete([0, 1])}
          >
            Delete all Task
          </Button>{" "}
          <Button
            variant="contained"
            color="success"
            onClick={() => handleDelete([0])}
          >
            Delete all Done Task
          </Button>
        </>
      )}
      <div style={{ margin: "30px" }}>
        <GoogleLogout
          clientId={
            "232369641473-ug1l7c7ov04c0hj0rqmt0do0ksbauucj.apps.googleusercontent.com"
          }
          buttonText="Logout"
          onLogoutSuccess={() => {
            logout();
          }}
        >
          logout
        </GoogleLogout>
      </div>
    </div>
  );
};

export default TodoAddData;
