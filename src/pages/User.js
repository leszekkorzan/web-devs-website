import React, {useState, useEffect} from 'react';
import { withRouter } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import WebsiteIcon from '@material-ui/icons/Web';
import GithubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import * as firebase from 'firebase/app';
import 'firebase/database';
if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: "AIzaSyBvvkfXmOi6aN6EZ1Q1wlkiuO6QoIrL-54",
        authDomain: "webaily.firebaseapp.com",
        databaseURL: "https://webaily.firebaseio.com",
        projectId: "webaily",
        storageBucket: "webaily.appspot.com",
        messagingSenderId: "9902598182",
        appId: "1:9902598182:web:caba56c535ea060a7cdee7"
    });
}
const useStyles = makeStyles(theme => ({
    root: {
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
        marginTop: '50px'
    },
    img: {
        width: '150px'
    },
    name: {
        fontWeight: 400,
        marginTop: '20px'
    },
    description: {
        fontWeight: 300,
        width: '310px',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '10px'
    },
    links: {
        marginTop: '50px'
    },
    button: {
        margin: '10px',
        fontWeight: '600'
    },
    error: {
        color: '#f44336',
    }
}));
const User = ({match}) => {
    const classes = useStyles();
    const id = match.params.id;

    const [name, setName] = useState('');
    const [portfolioUrl, setPortfolioUrl] = useState('');
    const [githubUrl, setGithubUrl] = useState('');
    const [twitterUrl, setTwitterUrl] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [bio, setBio] = useState('');
    const [verified, setVerified] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [error] = useState('Not Found');

    const getDB = () => {
        setIsLoading(true);
        firebase.database().ref('users/' + id).once('value').then((snapshot) => {
            if(snapshot.val()){
                setName(snapshot.val().name);
                setPortfolioUrl(snapshot.val().portfolioUrl);
                setGithubUrl(snapshot.val().githubUrl);
                setTwitterUrl(snapshot.val().twitterUrl);
                setPhotoUrl(snapshot.val().profile_picture);
                setBio(snapshot.val().bio);
                if(snapshot.val().verified){
                    setVerified(snapshot.val().verified)
                }
            }
            setIsLoading(false);
        });
    }
    useEffect(() => {
        getDB();
    }, [])
    return(
        <div className={classes.root}>
            {name.length < 3 && isLoading ? (
                <CircularProgress />
            ) : (null)}
            {name.length < 3 && !isLoading ? (
                <Typography variant="h5" className={classes.error}>{error}</Typography>
            ) : (null)}
            {name.length > 3 && !isLoading ? (
                <div>
                    <div>
                        <img className={classes.img} src={photoUrl} alt="profile img"/>
                        <Typography variant="h3" className={classes.name}>
                            {name}
                            {verified === true ? (
                                <VerifiedUserIcon style={{ fontSize: 35, color: '#66bb6a' }}/>
                            ) : (null)}
                        </Typography>
                        <Typography variant="h6" className={classes.description}>
                            {bio}
                        </Typography>
                        <div className={classes.links}>
                            {portfolioUrl.length > 3 ? (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    endIcon={<WebsiteIcon/>}
                                    size="large"
                                    href={portfolioUrl}
                                >
                                    Website
                                </Button>
                            ) : (null)}
                            {githubUrl.length > 3 ? (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    endIcon={<GithubIcon/>}
                                    size="large"
                                    href={githubUrl}
                                >
                                    GitHub
                                </Button>
                            ) : (null)}
                            {twitterUrl.length > 3 ? (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    endIcon={<TwitterIcon/>}
                                    size="large"
                                    href={twitterUrl}
                                >
                                    Twitter
                                </Button>
                            ) : (null)}
                        </div>
                    </div>
                </div>
            ) : (null)}
        </div>
    )
}
export default withRouter(User);