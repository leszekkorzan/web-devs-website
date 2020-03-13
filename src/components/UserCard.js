import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
const useStyles = makeStyles({
    root: {
        maxWidth: 350,
        width: 350,
    }
});
const UserCard = ({id, name, bio}) => {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {bio}
                </Typography>
            </CardContent>
            <CardActions>
                <Button href={"/user/" + id} size="small" color="primary">
                    Check
                </Button>
            </CardActions>
        </Card>
    );
}

export default UserCard;