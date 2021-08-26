import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import "tippy.js/animations/perspective.css";
import "tippy.js/animations/scale.css";
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Avatar, Fab, useScrollTrigger, Zoom } from '@material-ui/core';
import PropTypes from 'prop-types';
import { AuthContext } from '../context/auth-context';
import axios from 'axios';
import profile from "./profile.png";
import signout from "./signout.jpg";
import setting from "./setting.png";

const LogoutT = ()=> {

  const auth = useContext(AuthContext);
  let storedData = JSON.parse(localStorage.getItem('blogUser'));
  
  const handleClick = () => {
    auth.logout();
    storedData = JSON.parse(localStorage.getItem('blogUser'));
  };
   return (
    <div style={{opacity:"70%"}}>
        <div>
          <Button size="small" href="/profile" >
             <img style={{marginRight:"10px"}} alt="" width="20px" src={profile} />Profile
          </Button>
        </div>
         <hr/>
        <div>
          <Button size="small" href={`/user/edit/${storedData.userId}`} >
             <img style={{marginRight:"10px"}} alt="" width="20px" src={setting} />Settings
          </Button>
        </div>
         <hr/>
        <div>
          <Button size="small" href="/" onClick={handleClick}>
             <img style={{marginRight:"10px"}} alt="" width="20px" src={signout}/>Logout
          </Button>
        </div>
    </div>
    );
}


const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 100,
  },
  toolbar: {
    marginTop:'10px',
    borderBottom: `1px solid ${theme.palette.divider}`,
    background:'lightgrey'
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  backtop: {
    marginTop: -50,
  }
}));

const categories = [
  'Business', 
  'Culture',
  'Design',
  'Health',
  'Politics',
  'Science',
  'Sports',
  'Technology',
  'Travel',
  'Others',
];

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

export default function Header(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const PF = "https://blog-begin.herokuapp.com/file/";
  const [user, setUser] = useState("");

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const auth = useContext(AuthContext);

  let storedData = JSON.parse(localStorage.getItem('blogUser'));
  
  const handleClick = () => {
    auth.logout();
    storedData = JSON.parse(localStorage.getItem('blogUser'));
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (storedData) {
        const res = await axios.get(`https://blog-begin.herokuapp.com/api/user/singleUser/${storedData.userId}`);
        setUser(res.data);
      }
    };
    fetchUser();
  });

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar} id="back-to-top-anchor" >
        <Typography
          component="h2"
          variant="h5"
          noWrap
          color="inherit"
          className={classes.toolbarTitle}
        >
          <a style={{textDecoration:"none", color:"black", fontWeight:"bold",opacity:"70%"}} href="/">BlogTime</a>
        </Typography>
        <Button size="small" href="/">Home</Button>
        {
          storedData 
          &&
          <Button size="small" href="/write" >Write</Button>
        }
        {
          storedData
          ?
          <Tippy content={<LogoutT storeData={storedData} handleClick={handleClick}/>} trigger="click" arrow={false} interactive={true} offset={[5, 20]} theme="light" placement="bottom"  animation="scale">
              <Avatar style={{marginLeft:"20px"}} onClick={handleOpen} src={PF + user} className={classes.large}/>
          </Tippy>
            :
          <>
            <Button size="small" href="/login" >Login</Button>
            <Button size="small" href="/register" >Register</Button>
          </>
        }
      </Toolbar>
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
        {categories.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section}
            variant="body2"
            href={`/category=${section}`}
            className={classes.toolbarLink}
          >
            {section}
          </Link>
        ))}
      </Toolbar>
      <ScrollTop {...props}>
        <Fab color="inherit" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}
