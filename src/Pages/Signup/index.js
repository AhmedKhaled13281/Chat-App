import { Box, Button, TextField } from '@mui/material'
import React , {useRef} from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userRegister } from '../../Store/authReducer';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const userNameInput = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailValue = emailInputRef.current.value
    const passwordValue = passwordInputRef.current.value
    const userNameValue = userNameInput.current.value

    if(userNameValue && emailValue && passwordValue !== ""){
      dispatch(userRegister({email : emailValue , password : passwordValue , username : userNameValue}))
        .then((res) => res.meta.requestStatus === "fulfilled" ? navigate("/") : null)
        .catch((err) => console.log(err));
      console.log("Sign Up")
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
        <h2>Sign Up</h2>
      </Box>
      <Box style={{}}>
      <TextField
          type="text"
          margin="normal"
          fullWidth
          id="username"
          label="User Name"
          name="username"
          inputRef={userNameInput}
          InputProps={{
            required: true,
          }}
        />
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
          type="password"
          margin="normal"
          fullWidth
          id="password"
          label="Password"
          name="password"
          inputRef={passwordInputRef}
        />
        <p>
          <Link to="/">Log In</Link>
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

export default SignUp