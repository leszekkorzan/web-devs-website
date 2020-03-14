import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import logo from '../logo.png';

const useStyles = makeStyles(theme => ({
    root: {
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center'
    },
    mainLogo: {
        width: '650px'
    },
    mainDescription: {
        fontWeight: '400'
    }
}));
const Home =  () => {
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <img className={classes.mainLogo} src={logo} alt="Web-Devs Logo"/>
            <Typography variant="h5" className={classes.mainDescription}>
                Best place to share your dev-profile!
            </Typography>
            
        </div>
    )
}
export default Home;