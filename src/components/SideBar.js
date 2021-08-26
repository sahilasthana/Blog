import React , { useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import GitHubIcon from '@material-ui/icons/GitHub';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import Avatar from '@material-ui/core/Avatar';
import user from './user.png';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
  },
  title: {
    marginTop: theme.spacing(3),
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  link: {
    color: '#1976d2',
  }
}));

const name = "Name";

export default function SideBar(props) {
  let state = useRef(JSON.parse(localStorage.getItem('blogUser')));
  const classes = useStyles();
  const { sidebar } = props;
  const PF = "https://blog-begin.herokuapp.com/file/";

  return (
    <Grid item xs={12} md={4}>
      <Paper elevation={0} className={classes.sidebarAboutBox}>
        {
          sidebar.profilePhoto
          ?
          <Avatar alt="Remy Sharp" src={PF + sidebar.profilePhoto} className={classes.large} />
          :
          <img alt="" style={{opacity:"70%", borderRadius:"50%"}} className={classes.large} src={user} />
        }
        <Typography variant="h5" className={classes.title}>
          {name} : {sidebar.fullName}
        </Typography>
        {
          state.current
          ?
          <Button className={classes.title} size="small" href="/profile" style={{color:"white", background:"#66b3ff"}} > Profile Link </Button>
          :
          <div>
          {
            sidebar.about
            &&
            <Typography><div style={{fontSize:"1.4em"}}>{sidebar.title}  :</div> {sidebar.about}</Typography>
          }
          </div>
        }
        {
          (sidebar.github || sidebar.instagram || sidebar.facebook || sidebar.linkedin)
          &&
          <Typography style={{fontSize:"1.2em", fontWeight:"bold"}}className={classes.title} variant="h6" gutterBottom >
            SOCIAL MEDIA :
          </Typography>
        }
        <Grid container spacing={2} >
          {
            sidebar.github
            &&
            <Grid item>
              <Link display="block" variant="body1" href={`https://github.com/${sidebar.github}`}>
                <Grid container direction="row" spacing={1} alignItems="center">
                  <Grid item>
                    <GitHubIcon className={classes.link}/>
                  </Grid>
                </Grid>
              </Link>
            </Grid>
          }
          {
            sidebar.instagram
            &&
            <Grid item>
              <Link display="block" variant="body1" href={`https://www.instagram.com/${sidebar.instagram}`}>
                <Grid container direction="row" spacing={1} alignItems="center">
                  <Grid item>
                    <InstagramIcon className={classes.link}/>
                  </Grid>
                </Grid>
              </Link>
            </Grid>
          }
          {
            sidebar.facebook
            &&
            <Grid item>
              <Link display="block" variant="body1" href={`https://www.facebook.com/${sidebar.facebook}`}>
                <Grid container direction="row" spacing={1} alignItems="center">
                  <Grid item>
                    <FacebookIcon className={classes.link}/>
                  </Grid>
                </Grid>
              </Link>
            </Grid>
          }
          {
            sidebar.linkedin
            &&
            <Grid item>
              <Link display="block" variant="body1" href={`https://www.linkedin.com/in/${sidebar.linkedin}`}>
                <Grid container direction="row" spacing={1} alignItems="center">
                  <Grid item>
                    <LinkedInIcon className={classes.link}/>
                  </Grid>
                </Grid>
              </Link>
            </Grid>
          }
        </Grid>
      </Paper>
    </Grid>
  );
}

SideBar.propTypes = {
  sidebar: PropTypes.object
};
