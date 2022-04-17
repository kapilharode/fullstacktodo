import { GoogleLogin } from "react-google-login";
import { Button } from "@mui/material";
import { addNewUSer } from "../apiServices/utils";
import Alert from '@mui/material/Alert';
import {useNavigate} from  'react-router-dom'
function UserLoginDetails() {

  const history = useNavigate();

  const responseGoogle = async(res) => {
     const {email,givenName} = res?.profileObj
     const userData={
        user_name: givenName,
        user_email: email,
      }
    await addNewUSer(userData).then((res)=>{
      <Alert severity="success">successfully LogIn user</Alert>
        localStorage.setItem('userIdData', res.data);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('LoginUser', 1);
    }).catch(()=>{
  <Alert severity="warning">Please Try Again</Alert>
    })
    history(`/todo`);
  };
  return (
    <div className="App">
     
      <GoogleLogin
        clientId={
          "232369641473-ug1l7c7ov04c0hj0rqmt0do0ksbauucj.apps.googleusercontent.com"
        }
        onSuccess={responseGoogle}
        render={(renderProps) => (
          <Button onClick={renderProps.onClick} disabled={renderProps.disabled} variant="outlined">
            Login With Google account
          </Button>
        )}
        buttonText="Login"
      >
      </GoogleLogin>
    </div>
  );
}

export default UserLoginDetails;
