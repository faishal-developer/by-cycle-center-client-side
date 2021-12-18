import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { CircularProgress, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import { MyContext } from '../../Hooks/AuthProvider';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function Navbar() {
    const { isLoading, user, logOut } = React.useContext( MyContext )
    const [state, setState] = React.useState( {
        top: false,
        left: false,
        bottom: false,
        right: false,
    } );

    const toggleUser = () => {
        console.log( user );
        if ( user?.displayName ) {
            return <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ color: 'white', padding: '10px', fontWeight: 'bold' }}> {user.displayName}</span>
                <button onClick={logOut} color="inherit">Log Out</button>
            </div>
        } else {
            return <div>
                <Link style={{ borderRight: '1px solid white', color: 'white', fontWeight: 'bold' }} to='/login'><Button color="inherit">Login</Button></Link>
                <Link style={{ color: 'white', fontWeight: 'bold' }} to='/register'><Button color="inherit">Register</Button></Link>
            </div>
        }
    }

    const toggleDrawer = ( anchor, open ) => ( event ) => {
        if ( event.type === 'keydown' && ( event.key === 'Tab' || event.key === 'Shift' ) ) {
            return;
        }

        setState( { ...state, [anchor]: open } );
    };

    const headerRoute = ['home', 'products', 'aboutus']
    const navItem = ['HOME', 'PRODUCTS', 'ABOUT US']
    if ( user?.displayName ) {
        headerRoute.push( 'dashboard' )
        navItem.push( 'DASHBOARD' )
    }

    const list = ( anchor ) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer( anchor, false )}
            onKeyDown={toggleDrawer( anchor, false )}
        >
            <List>
                {navItem.map( ( text, index ) => (
                    <Link key={index} to={`/${headerRoute[index]}`}>
                        <ListItem button key={text}>
                            <ListItemText primary={text} />
                        </ListItem>
                    </Link>
                ) )}
            </List>
        </Box>
    );

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar sx={{ minHeight: '70px' }} position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <div key={"left"}>
                                <div onClick={toggleDrawer( "left", true )}><MenuIcon sx={{ color: 'white' }} /></div>
                                <Drawer
                                    anchor={"left"}
                                    open={state["left"]}
                                    onClose={toggleDrawer( "left", false )}
                                >
                                    {list( "left" )}
                                </Drawer>
                            </div>

                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <Link style={{ color: 'white', fontWeight: 'bold' }} to='/'>HOME</Link>
                        </Typography>
                        {
                            isLoading ? <CircularProgress /> : toggleUser()

                        }
                    </Toolbar>
                </AppBar>
            </Box>

        </div>
    );
}
