import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import GithubIcon from '@material-ui/icons/GitHub';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database'
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
    loginBtn: {
        fontWeight: 'bold'
    },
    infoForm: {
        margin: '20px'
    },
    option: {
        margin: '10px'
    },
    error: {
        color: '#f44336'
    },
    title: {
        marginBottom: '50px'
    },
    chip: {
        margin: '5px'
    }
}));
const Dashboard = () => {
    const classes = useStyles();

    const [isLogged, setIsLogged] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [userData, setUserData] = useState('');

    const [isEditShow, setIsEditShow] = useState(false);
    const [isPrivacyShow, setIsPrivacyShow] = useState(false);

    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [portfolioUrl, setPortfolioUrl] = useState('');
    const [githubUrl, setGithubUrl] = useState('');
    const [twitterUrl, setTwitterUrl] = useState('');
    const [verified, setVerified] = useState(false);

    const [dbLoaded, setDbLoaded] = useState(false);
    const [dbLoaded2, setDbLoaded2] = useState(false);

    const [checked, setChecked] = useState(false);

    const [chipData, setChipData] = useState([]);

    const [addSkills, setAddSkills] = useState('');

    const handleDelete = chipToDelete => () => {
        setChipData(chips => chips.filter(chip => chip.label !== chipToDelete.label));
    };
    const addSkill = () => {
        if(addSkills.length > 1 && chipData.length < 11){
            const even = (element) => element.label === addSkills;
            if(addSkills.length > 1 && !chipData.some(even)){
                chipData.push({"label" : addSkills})
                setAddSkills('');
            }
        }
    }
    const auth = () => {
        setIsLoading(true);
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setIsLogged(true);
                setUserData(user);
            } else {
                setIsLogged(false);
                setUserData('');
            }
            setIsLoading(false);
        })
    }
    const login = () => {
        setError('');
        const provider = new firebase.auth.GithubAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result) => {
            auth();
        }).catch(error => {
            if(error !== "auth/cancelled-popup-request"){
                setError(error.message);
            }
        })
    }
    const signOut = () => {
        setIsEditShow(false);
        firebase.auth().signOut();
    }
    useEffect(() => {
        document.title = 'Dashboard - Web Devs';
        auth();
    }, [])
    const ShowEdit = () => {
        if(!isEditShow){
            setIsEditShow(true);
            getFieldsDB();
        }
    }
    const ShowPrivacy = () => {
        if(!isPrivacyShow){
            setIsPrivacyShow(true);
            getExploreDB();
        }
    }
    const getFieldsDB = () => {
        firebase.database().ref('users/' + userData.uid).once('value').then((snapshot) => {
            if(snapshot.val()){
                setName(snapshot.val().name);
                setPortfolioUrl(snapshot.val().portfolioUrl);
                setGithubUrl(snapshot.val().githubUrl);
                setTwitterUrl(snapshot.val().twitterUrl);
                setBio(snapshot.val().bio);
                if(snapshot.val().verified){
                    setVerified(snapshot.val().verified)
                }
                if(snapshot.val().skills){
                    setChipData(snapshot.val().skills);
                }
            }
            setDbLoaded(true);
        });
    }
    const getExploreDB = () => {
        firebase.database().ref('explore/' + userData.uid).once('value').then((snapshot) => {
            if(snapshot.val()){
                setChecked(true);
            }else{
                setChecked(false);
            }
            setDbLoaded2(true);
        });
    }
    const updateDB = () => {
        const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
        const twregex = /twitter\.com/;
        const ghregex = /github\.com/;
        if(portfolioUrl.length > 0 && !regex.test(portfolioUrl)){
            return;
        }
        if(githubUrl.length > 0 && !ghregex.test(githubUrl)){
            return;
        }
        if(twitterUrl.length > 0 && !twregex.test(twitterUrl)){
            return;
        }
        firebase.database().ref('users/' + userData.uid).set({
            name: name,
            portfolioUrl: portfolioUrl,
            githubUrl: githubUrl,
            twitterUrl: twitterUrl,
            profile_picture : userData.photoURL,
            bio: bio,
            skills: chipData
        }, (error) => {
            setIsEditShow(false);
            setDbLoaded(false);
        });
    }
    const updateExploreDB = () => {
        if(checked === true){
            if(name.length > 3){
                firebase.database().ref('explore/' + userData.uid).set({
                    name: name,
                    bio: bio,
                    id: userData.uid,
                    verified: verified
                }, (error) => {
                    setIsPrivacyShow(false);
                    setDbLoaded2(false);
                    setIsEditShow(false);
                    setDbLoaded(false);
                });
            }

        }else{
            firebase.database().ref('explore/' + userData.uid).remove()
            .then(function() {
                setIsPrivacyShow(false);
                setDbLoaded2(false);
                setIsEditShow(false);
                setDbLoaded(false);
            })
        }

    }
    const handleChangeCheckbox = event => {
        setChecked(event.target.checked);
    };
    return(
        <div className={classes.root}>
            {!isLogged && isLoading ? (
                <CircularProgress />
            ) : (null)}

            {!isLogged && !isLoading ? (
                <div>
                    <Typography className={classes.title} variant="h4">Login to Mange Your Acoount</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<GithubIcon />}
                        size="large"
                        className={classes.loginBtn}
                        onClick={() => login()}
                    >
                        Login
                    </Button>
                    <Typography className={classes.error}>{error}</Typography>
                </div>
            ) : (null)}

            {!isLoading && isLogged && userData ?(
                <div>
                    <div>
                        <Button className={classes.option} color="primary" variant="contained" onClick={() => {signOut()}}>logout</Button>
                        <Button className={classes.option} disabled={isEditShow} color="primary" variant="contained" onClick={() => {ShowEdit()}}>Edit Your Profile</Button>
                        <Button href={"/user/" + userData.uid} className={classes.option} color="primary" variant="contained">My Profile</Button>
                    </div>
                    {isEditShow && dbLoaded ? (
                        <div>
                            <Typography variant="h5" className={classes.infoForm}>
                                Edit your informations
                            </Typography>
                            <div className={classes.option}>
                                <TextField disabled={isPrivacyShow} label="Your Name and Surname" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className={classes.option}>
                                <TextField disabled={isPrivacyShow} label="Portfolio URL" variant="outlined" value={portfolioUrl} onChange={(e) => setPortfolioUrl(e.target.value)} />
                            </div>
                            <div className={classes.option}>
                                <TextField disabled={isPrivacyShow} label="GitHub URL" variant="outlined" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} />
                            </div>
                            <div className={classes.option}>
                                <TextField disabled={isPrivacyShow} label="Twitter URL" variant="outlined" value={twitterUrl} onChange={(e) => setTwitterUrl(e.target.value)} />
                            </div>
                            <div className={classes.option}>
                                <TextField disabled={isPrivacyShow} inputProps={{ maxLength: 100 }} multiline rows="4" rowsMax="4" label="Your Bio" variant="outlined" value={bio} onChange={(e) => setBio(e.target.value)} />
                            </div>
                            <div className={classes.option}>
                                <Typography variant="h6">
                                    Skills
                                    {` (${chipData.length} / 10)`}
                                </Typography>
                                <div className={classes.option}>
                                    <TextField disabled={isPrivacyShow} inputProps={{ maxLength: 20 }} label="Type skill and press enter" variant="outlined" value={addSkills} onChange={e => setAddSkills(e.target.value)} onKeyDown={e => e.key === 'Enter' ? addSkill() : null } />
                                </div>
                                {chipData.map(data => {
                                    return (
                                        <Chip
                                            disabled={isPrivacyShow}
                                            key={data.label}
                                            label={data.label}
                                            onDelete={handleDelete(data)}
                                            className={classes.chip}
                                        />
                                    );
                                })}
                            </div>
                            <div className={classes.option}>
                                <Button disabled={isPrivacyShow} color="primary" variant="contained" onClick={() => updateDB()}>Update</Button>
                            </div>
                            <Button className={classes.option} disabled={isPrivacyShow} color="primary" variant="contained" onClick={() => {ShowPrivacy()}}>Privacy Settings</Button>
                            {name.length < 1 ? (
                                <Typography className={classes.error}>Your profile will be unactive, due to missing name field!</Typography>
                            ) : (null)}
                        </div>
                    ) : (null)}
                    {isPrivacyShow && dbLoaded2 ? (
                        <div>
                            <Checkbox
                                checked={checked}
                                onChange={handleChangeCheckbox}
                                color="primary"
                            />
                            <Typography>Add your profile to Explore category</Typography>
                            <div className={classes.option}>
                                <Button color="primary" variant="contained" onClick={() => updateExploreDB()}>OK</Button>
                            </div>
                        </div>
                    ) : (null)}
                </div>
            ) : (null)}
        </div>
    )
}
export default Dashboard;