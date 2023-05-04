import { Box, Button, TextField } from '@mui/material'
import React , {useRef} from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../../Store/authReducer';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailValue = emailInputRef.current.value
    const passwordValue = passwordInputRef.current.value

    if(emailValue && passwordValue !== ""){
      dispatch(userLogin({ email: emailValue, password: passwordValue }))
        .then((res) => res.meta.requestStatus === "fulfilled" ? navigate("/chat") : null)
        .catch((err) => console.log(err));
      console.log("Log In")
      console.log(emailValue , passwordValue)
    }

  }
  
  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      style={{
        padding: "15px 0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box style={{}}>
        <h2>Log In</h2>
      </Box>
      <Box style={{}}>
        <TextField
          type="email"
          margin="normal"
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          inputRef={emailInputRef}
          InputProps={{
            required: true,
          }}
        />
        <TextField
          type="text"
          margin="normal"
          fullWidth
          id="password"
          label="Password"
          name="password"
          inputRef={passwordInputRef}
        />
        <p style={{ alignItems: "left" }}>
          <Link to="/signup">Sign Up</Link>
        </p>
      </Box>
      <Box style={{}}>
        <Button
          fullWidth
          size="large"
          style={{}}
          type="submit"
          variant="contained"
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default Login