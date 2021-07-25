/**
 *
 * Navigation
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { makeStyles } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import { useHistory, useLocation } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { AddCircleOutlineOutlined, SubjectOutlined } from '@material-ui/icons';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';

import { useInjectSaga } from 'utils/injectSaga';
import saga from './saga';
import { userDataClear } from 'containers/App/actions';

const drawerWidth = 200

const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: '#f9f9f9',
      width: '100%',
      padding: theme.spacing(3),
    },
    root: {
      display: 'flex',
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    active: {
      background: '#f4f4f4'
    },
    title: {
      padding: theme.spacing(2),
    },
    appBar: {
      // width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    heading: {
      flexGrow: 1
    },
    toolbar: theme.mixins.toolbar,
    avatar: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
      marginLeft: theme.spacing(2)
    },
    m10: {
      margin: '10px'
    }
  }
})

export function Navigation({ children, userData, userDataClear }) {
  useInjectSaga({ key: 'navigation', saga });

  const classes = useStyles()
  const history = useHistory()
  const location = useLocation()

  const menuItems = [
    { 
      text: 'My List', 
      icon: <SubjectOutlined color="secondary" />, 
      path: '/home' 
    },
    { 
      text: 'Create Item', 
      icon: <AddCircleOutlineOutlined color="secondary" />, 
      path: '/create' 
    },
  ];

  const getInitials = () => {
    if(userData.name) {
      let names = userData.name.split(' ');
      let initials = '';
      names.forEach(name => {
        initials = initials + name[0];
      });
      return initials;
    } else {
      return '';
    }
    
  }

  return (
    <div className={classes.root}>
      {/* app bar */}
      <AppBar 
        position="fixed" 
        className={classes.appBar}
        elevation={0}
        color="primary"
      >
        <Toolbar>
          <Typography className={classes.heading}>
            Checklist
          </Typography>
          <Button color="inherit" className={classes.m10} onClick={() => userDataClear({})}>Logout</Button>
          <Typography className={classes.m10}>{userData.name}</Typography>
          <Avatar className={classes.avatar}>{getInitials()}</Avatar>
        </Toolbar>
      </AppBar>

      {/* side drawer */}
      {/* <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}
        anchor="left"
      >
        <div>
          <Typography variant="h5" className={classes.title}>
            Checklist
          </Typography>
        </div>

        <List>
          {menuItems.map((item) => (
            <ListItem 
              button 
              key={item.text} 
              onClick={() => history.push(item.path)}
              className={location.pathname == item.path ? classes.active : null}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        
      </Drawer> */}

      {/* main content */}
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        { children }
      </div>
    </div>
  );
}

Navigation.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userData: PropTypes.object,
  userDataClear: PropTypes.func
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    userDataClear: (data) => dispatch(userDataClear(data))
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Navigation);
