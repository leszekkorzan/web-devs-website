import React, {useState ,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import UserCard from '../components/UserCard';
import * as firebase from 'firebase/app';
import CircularProgress from '@material-ui/core/CircularProgress';
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
const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 50
    }
});
const Explore = () => {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState('');
    const getDB = () => {
        setIsLoading(true);
        firebase.database().ref('explore/').once('value').then((snapshot) => {
            if(snapshot.val()){
                const snap = snapshot.val();
                setData(Object.values(snap));
            }
            setIsLoading(false);
        });
    }
    useEffect(() => {
        getDB();
    }, [])
    return(
        <div className={classes.root}>
            {isLoading && !data ? (
                <div className={classes.root}>
                    <CircularProgress />
                </div>
            ) : (null)}
            {!isLoading && data ? (
                <div>
                    {data.map(item => {
                        return(
                            <UserCard key={item.id} id={item.id} name={item.name} bio={item.bio} verified={item.verified}/>
                        )
                    })}
                </div>
            ) : (null)}
        </div>
    )
}
export default Explore;