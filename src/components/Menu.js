import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Link from '@material-ui/core/Link';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    home: {
        color: '#fff'
    },
    list: {
        width: '200px'
    },
    link: {
        color: '#212121'
    }
}));
const Menu = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton onClick={() => setOpen(true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        <Link className={classes.home} href="/">
                            Web Devs
                        </Link>
                    </Typography>
                    <IconButton href="/dashboard" edge="end" color="inherit">
                        <AccountCircle/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer open={open} onClose={() => setOpen(false)}>
                <List className={classes.list}>
                    <Link className={classes.link} href="/">
                        <ListItem button>
                            <Typography variant="h6">Home</Typography>
                        </ListItem>
                    </Link>
                    <Link className={classes.link} href="/explore">
                        <ListItem button>
                            <Typography variant="h6">Explore</Typography>
                        </ListItem>
                    </Link>
                    <Link className={classes.link} href="/dashboard">
                        <ListItem button>
                            <Typography variant="h6">Login</Typography>
                        </ListItem>
                    </Link>
                    <hr></hr>
                    <Link className={classes.link} href="https://github.com/web-devs-team">
                        <ListItem button>
                            <Typography variant="h6">GitHub</Typography>
                        </ListItem>
                    </Link>
                    <Link className={classes.link} href="https://dsc-servers.web.app/web-devs">
                        <ListItem button>
                            <Typography variant="h6">Discord</Typography>
                        </ListItem>
                    </Link>
                </List>
            </Drawer>
        </div>
    );
}
export default Menu;