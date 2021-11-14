import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import StarsIcon from '@mui/icons-material/Stars';

import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import {
    Switch,
    Route,
    Link,
    useRouteMatch,
    NavLink,
} from "react-router-dom";
import Payment from './Payment/Payment';
import MyOrders from './MyOrders/MyOrders';
import GIveReview from './GiveReview/GIveReview';
import ManageAllOrders from './ManageAllOrders/ManageAllOrders';
import AddProduct from './AddProduct/AddProduct';
import MakeAdmin from './MakeAdmin/MakeAdmin';
import { MyContext } from '../Hooks/AuthProvider';
import { CircularProgress } from '@mui/material';



const drawerWidth = 240;

function Dashboard( props ) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState( false );
    const { url, path } = useRouteMatch();
    const { user, isLoading } = React.useContext( MyContext )
    console.log( user );
    const handleDrawerToggle = () => {
        setMobileOpen( !mobileOpen );
    };


    let userDashBoardIcon = [<AddShoppingCartIcon />, <CreditCardIcon />, <StarsIcon />]

    let adminDashBoardIcon = [<ManageSearchIcon />, <ManageAccountsIcon />, <ProductionQuantityLimitsIcon />]

    const dashboardRoutes = ['myorders', 'payment', 'givereview', 'manageAllProducts', 'makeAdmin', 'addProduct']
    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                <Link key={'home'} to={`/`}>
                    <ListItem button>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Home'} />
                    </ListItem>
                </Link>
                {['My Orders', 'Payment', 'Review'].map( ( text, index ) => (
                    <NavLink activeStyle={{ color: 'tomato' }} key={text} to={`${url}/${dashboardRoutes[index]}`}>
                        <ListItem button>
                            <ListItemIcon>
                                {userDashBoardIcon[index]}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    </NavLink>
                ) )}
            </List>
            <Divider />
            <List>
                {( !isLoading && user.role === 'admin' ) && ['Manage All Products', 'Make Admin', 'Add Product'].map( ( text, index ) => (
                    <NavLink activeStyle={{ color: 'tomato' }} to={`${url}/${dashboardRoutes[index + 3]}`}>
                        <ListItem button key={text}>
                            <ListItemIcon>
                                {adminDashBoardIcon[index]}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    </NavLink>
                ) )}
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;
    if ( isLoading ) {
        return <CircularProgress />
    }
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <Switch>
                    <Route path={`${path}/myorders`}>
                        <MyOrders />
                    </Route>
                    <Route exact path={`${path}`}>
                        <MyOrders />
                    </Route>
                    <Route path={`${path}/makeAdmin`}>
                        <MakeAdmin />
                    </Route>
                    <Route path={`${path}/givereview`}>
                        <GIveReview />
                    </Route>
                    <Route path={`${path}/manageAllProducts`}>
                        <ManageAllOrders />
                    </Route>
                    <Route path={`${path}/payment`}>
                        <Payment />
                    </Route>
                    <Route path={`${path}/addProduct`}>
                        <AddProduct />
                    </Route>
                </Switch>
            </Box>
        </Box>
    );
}

export default Dashboard;
