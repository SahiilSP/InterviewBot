import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import logo from '../images/logo.png';
import { useNavigate } from 'react-router-dom';

const pages = ['Demo', 'Evaluation', 'About', 'Contact'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function NavBar({ logged }) {

    const navigate = useNavigate();

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
        // navigate('/');
    };

    const handleProfile = ()=>{
        handleCloseUserMenu()
        navigate('/user/profile');
    }

    const handleLogout = ()=>{
        localStorage.clear()
        handleCloseUserMenu()
        navigate('/')
    }

    const usernm = localStorage.getItem('username')
    console.log(logged, usernm);
    return (
        <AppBar position="static" sx={{ bgcolor: '#c1dbd9' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ color: '#03354e' }}>
                    <Avatar src={logo} sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, borderRadius: 0, height: '60px', width: 'auto' }} />
                    {/* <img src={logo} alt='Logo Interview Bot'></img> */}
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 6,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.1rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Interview Bot
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, color: "03354e" }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="#03354e"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                                color: '#03354e',
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center" sx={{ color: '#03354e', textDecorationLine: 'underline' }}>{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 'normal',
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Interview Bot
                    </Typography>
                    <Box sx={{ flexGrow: 1, justifyContent: 'end', display: { xs: 'none', md: 'flex' }, color: 'inherit', mr: 12 }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: '#03354e', display: 'block', ml: 3 }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    {logged === false ?
                        <Button href='/login' variant="contained" sx={{ border: '1px solid white', bgcolor: 'white', color: 'black', ":hover": { bgcolor: 'gray' } }}>
                            Sign In
                        </Button>
                        :
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="open settings">
                                <IconButton color='black' onClick={handleOpenUserMenu} sx={{ p: 0.5, width: 'fit-content', borderRadius: 1, backgroundColor: 'white', border: '1px solid black' }}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                    <Typography
                                        variant="h4"
                                        component="a"
                                        sx={{
                                            fontWeight: '200',
                                            fontSize: '1.2rem',
                                            color: 'black',
                                            padding: '0 7px'
                                        }}
                                    >
                                        {usernm.length > 10 ? usernm.substring(0,10) : usernm}
                                    </Typography>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px', color: 'inherit' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {/* {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu} >
                                        <Typography textAlign="center" sx={{ color: '#03354e' }}>{setting}</Typography>
                                    </MenuItem>
                                ))} */}
                                <MenuItem onClick={handleProfile} >
                                    <Typography textAlign="center" sx={{ color: '#03354e' }}>Profile</Typography>
                                </MenuItem>
                                <MenuItem onClick={handleLogout} >
                                    <Typography textAlign="center" sx={{ color: '#03354e' }}>Logout</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default NavBar;