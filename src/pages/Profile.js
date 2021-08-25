import React, { useEffect, useState } from 'react';
import axios from 'axios';
import backgroundprofile from './backgroundprofile.png';
import profile from './profile.png';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import GitHubIcon from '@material-ui/icons/GitHub';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
  },
  title: {
    marginTop: theme.spacing(1),
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  link: {
    color: '#1976d2',
  }
}));

function Profile() {
  const classes = useStyles();
  const storedData = JSON.parse(localStorage.getItem('blogUser'));
  const [user, setUser] = useState({});
  const path = storedData.userId;
  const [fullName, setFullName] = useState("");
  const [about, setAbout] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [profilePhoto,setProfilePhoto] = useState("");
  const PF = "https://blog-begin.herokuapp.com//file/";

  useEffect(() => {
    const getUser = async () => {
        const res = await axios.get(`https://blog-begin.herokuapp.com//api/auth/?userId=${path}`);
        setUser(res.data.user);
        setFullName(res.data.user.fullName);
        setAbout(res.data.user.about);
        setInstagram(res.data.user.instagram);
        setFacebook(res.data.user.facebook);
        setLinkedin(res.data.user.linkedin);
        setGithub(res.data.user.github);
        setProfilePhoto(res.data.user.profilePhoto);
    }
    getUser();
  }, [path]);
  return(
    <div>
    <img alt="" style={{width:"100%", height:"200px"}} src={backgroundprofile}/>
    <div style={{ display:"flex"}}>
      <div style={{paddingLeft:"20px",width:"250px", height:"250", marginTop:"-100px"}}>
      {
         profilePhoto
         ?
         <img style={{borderRadius:"50%" ,background:"white"}} width="100%" height="100%" alt="Remy Sharp" src={PF + profilePhoto} />
         :
         <img alt="" style={{borderRadius:"50%"}} width="100%" height="100%" src={profile} />
      }
      </div>
        <div  style={{marginLeft:"50px", width:"30%", fontSize:"1.5em", alignSelf: "flex-start"}}>
             <h1> {fullName} </h1>
        </div>
      </div>
        <div style={{  display:"flex", justifyContent:"center" ,marginBottom:"20px"}}>
          
              <Button href={`/user/edit/${storedData.userId}`} style={{background:"#66b3ff", height:"40px",padding:"10px", marginRight:"20px", color:"white"}}>Update Profile</Button>
              <Button href={`/user=${user.username}/posts`} style={{background:"#ff4d4d", height:"40px",padding:"10px", color:"white"}}>Posts</Button>
       </div>
   
        <div style={{ background:"#F5F5F5",padding:"5px"}}>
          <Grid style={{display:"flex",paddingTop:"15px", justifyContent:"center"}} container spacing={2} >
          {
            github
            &&
            <Grid item>
              <Link display="block" variant="body1" href={`https://github.com/${github}`}>
                <Grid container direction="row" spacing={1} alignItems="center">
                  <Grid item>
                    <div style={{display:"flex"}}>
                    <GitHubIcon className={classes.link}/>
                    <h5 style={{marginTop:"0px", paddingLeft:"10px"}}>{github}</h5>
                    </div>
                  </Grid>
                </Grid>
              </Link>
            </Grid>
          }
          {
            instagram
            &&
            <Grid item>
              <Link display="block" variant="body1" href={`https://www.instagram.com/${instagram}`}>
                <Grid container direction="row" spacing={1} alignItems="center">
                  <Grid item>
                   <div style={{display:"flex"}}>
                    <InstagramIcon className={classes.link}/>
                    <h5 style={{marginTop:"0px", paddingLeft:"10px"}}>{instagram}</h5>
                    </div>
                  </Grid>
                </Grid>
              </Link>
            </Grid>
          }
          {
            facebook
            &&
            <Grid item>
              <Link display="block" variant="body1" href={`https://www.facebook.com/${facebook}`}>
                <Grid container direction="row" spacing={1} alignItems="center">
                  <Grid item>
                    <div style={{display:"flex"}}>
                    <FacebookIcon className={classes.link}/>
                    <h5 style={{marginTop:"0px", paddingLeft:"10px"}}>{facebook}</h5>
                    </div>
                  </Grid>
                </Grid>
              </Link>
            </Grid>
          }
          {
            linkedin
            &&
            <Grid item>
              <Link display="block" variant="body1" href={`https://www.linkedin.com/in/${linkedin}`}>
                <Grid container direction="row" spacing={1} alignItems="center">
                  <Grid item>
                    <div style={{display:"flex"}}>
                    <LinkedInIcon className={classes.link}/>
                    <h5 style={{marginTop:"0px", paddingLeft:"10px"}}>{linkedin}</h5>
                    </div>
                  </Grid>
                </Grid>
              </Link>
            </Grid>
          }
        </Grid>
      </div>
    <div style={{padding:"50px"}}>
     <h1>ABOUT:</h1>
     <p style={{background:"#F5F5F5", padding:"10px", fontSize:"1.3em"}}>{about}</p>
    </div>
    </div>
  );
}

export default Profile;