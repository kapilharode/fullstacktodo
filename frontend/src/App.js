import "./App.css";
import UserLoginDetails from "./Todo/containers/UserLoginDetails";
import TodoDetails from "./Todo/containers/TodoDetails";
import { Route, Routes } from "react-router-dom";
function App() {
  const logData=localStorage.getItem('LoginUser')
  console.log(logData,'logData')
  return (
    <div className="App">
      {/* {logData ==null || 0 ? <UserLoginDetails/> : <TodoDetails/>} */}

      <Routes>
        <Route exact path="/" element={<UserLoginDetails/>} />
        <Route exact path="/todo" element={<TodoDetails/>} />
      </Routes>
    </div>
  );
}

export default App;
