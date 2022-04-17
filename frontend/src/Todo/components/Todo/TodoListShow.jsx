import { Button, Checkbox } from "@mui/material";
import { useEffect, useState } from "react";
import { checkTodoData, deleteTodoData } from "../../apiServices/utils";
import DeleteIcon from '@mui/icons-material/Delete';
const TodoListShow = (props) => {
  const { todoData, fetchData } = props;
  const [stateData,setStateData] = useState([0,1])
  
  const checkHandle = async (ids, isState) => {
    let isStateData = isState == 1 ? 0 : 1;
    await checkTodoData({ ids, isStateData: isStateData }).then((res) => {
      fetchData([0,1])
    });
  };

  const handleChange = (event) => {
    const isStateData = event === "all" ? [0, 1] : event === "done" ? [0] : [1];
    setStateData(isStateData)
    fetchData(isStateData);
  };

  const handleDelete=async(id)=>{
    await deleteTodoData(id).then((res)=>{
        fetchData(stateData)
    })
  }

  return (
    <div>
      <div>
        <Button
          variant="contained"
          color="success"
          style={{ margin: "20px" }}
          onClick={() => handleChange("all")}
        >
          {" "}
          All{" "}
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => handleChange("done")}
        >
          {" "}
          Done{" "}
        </Button>
        <Button
          variant="contained"
          color="success"
          style={{ margin: "20px" }}
          onClick={() => handleChange("todo")}
        >
          {" "}
          Todo{" "}
        </Button>
      </div>

      <ul style={{ listStyle: "none" }}>
        {todoData.map((data) => {
          const { id, is_state, todo_data } = data;
          return (
            <li
            key={id}
              style={{
                border: "1px solid",
                textAlign: "center",
                width: "50%",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "15px",
              }}
            >
              <div
                style={{
                  padding: "10px",
                  display: "flex",
                  justifyContent :'space-between'
                }}
              >
                <div style={{marginTop:'10px'}}>
                <label style={{textDecoration: !!is_state && 'line-through',color: !!is_state ? 'red' : 'black'}}> {todo_data} </label>
                </div>
                <div>
                <Checkbox
                  onChange={() => {
                    checkHandle(id, is_state);
                  }}
                  defaultChecked={!!is_state}
                />
                <DeleteIcon  onClick={() => {
                    handleDelete(id)
                  }}/>
                  </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoListShow;
