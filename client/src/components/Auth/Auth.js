import React, { useState } from "react";
import { Avatar, Button, Paper, Grid, Typography, Container } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "./Input";
import Icon from "./Icon";
import { GoogleLogin } from "react-google-login";

import useStyles from "./styles.js";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { signin, signup } from "../../actions/auth";

const initialState = { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" };

const Auth = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState(initialState);

  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(form, history));
    } else {
      dispatch(signin(form, history));
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handChangeMode = () => setIsSignup((pre) => !pre);

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: "AUTH", data: { result, token } });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () => {};

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignup ? "Sign up" : "Sign in"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input name="firstName" label="First Name" autoFocus half handleChange={handleChange} />
                <Input name="lastName" label="Last Name" half handleChange={handleChange} />
              </>
            )}
            <Input name="email" label="Email Address" type="email" handleChange={handleChange} />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              handleShowPassword={handleShowPassword}
              type={showPassword ? "text" : "password"}
            />
            {isSignup && (
              <Input name="confirmPassword" label="Repeat Password" type="password" handleChange={handleChange} />
            )}
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId="390100289195-flj5qfqtlgik9t812s60o10q7i4fblvd.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
          <Grid container justify="center">
            <Grid item>
              <Button onClick={handChangeMode}>
                {isSignup ? "Already have an account? Sign in" : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
