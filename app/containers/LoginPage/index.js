/**
 *
 * LoginPage
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { LinearProgress } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { Link } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectLoginPage, makeSelectLoading, makeSelectAPIResponseMessage } from './selectors';
import { getUserLogin, setApiResponseNull } from './actions';
import reducer from './reducer';
import saga from './saga';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link to="" color="inherit">
        dbansal18
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://images.pexels.com/photos/5717429/pexels-photo-5717429.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=2000)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: 'red'
  }
}));

export function LoginPage({login, loading, apiResponseMessage, clearApiResponse}) {
  useInjectReducer({ key: 'loginPage', reducer });
  useInjectSaga({ key: 'loginPage', saga });

  const classes = useStyles();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const preventDefault = event => event.preventDefault();
  const handleSubmit = event => {
    preventDefault(event);
    console.log(username, password);
    login(username, password);
  }

  return (
    <div>
      {loading ? <LinearProgress /> :  ''}
      <Grid container component="main" className={classes.root}>
        <Helmet>
          <title>Checklist</title>
          <meta name="description" content="Description of LoginPage" />
        </Helmet>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            {apiResponseMessage !== 'In Progress'?
                <div className={classes.error}>
                  {apiResponseMessage}
                  <ClearIcon
                    onClick={() => clearApiResponse()}
                  />
                </div>
              : ''}
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="Username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={e => handleSubmit(e)}
                disabled={!(username && password)}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  {/* <Link href="#" variant="body2">
                    Forgot password?
                  </Link> */}
                </Grid>
                <Grid item>
                  <Link to="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  login: PropTypes.func,
  loading: PropTypes.bool,
  apiResponse: PropTypes.object,
  clearApiResponse: PropTypes.func,
  apiResponseMessage: PropTypes.string
};

const mapStateToProps = createStructuredSelector({
  loginPage: makeSelectLoginPage(),
  loading: makeSelectLoading(),
  apiResponseMessage: makeSelectAPIResponseMessage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    login: (usernane, password) => {
      dispatch(getUserLogin(usernane, password));
    },
    clearApiResponse : () => 
      dispatch(setApiResponseNull()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(LoginPage);
