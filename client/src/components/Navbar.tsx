import React, { Fragment, useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import Logout from './auth/Logout';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store';
import { useHistory } from 'react-router-dom'
import { useTranslation, Trans } from 'react-i18next';
import cookies from 'js-cookie'
import i18next from 'i18next';
import { languages } from '../App'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(3),
    },
    title: {
      flexGrow: 1,
    },
    auth: {
      flexGrow: 1,
    },
    lang: {
      // flexGrow: -1
    }
  }),
);


const Navbar = () => {
  const currentLanguageCode = cookies.get('i18next') || 'en'
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
  const { t } = useTranslation()

  // const { t, i18n } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth)

  const classes = useStyles();
  const [auth, setAuth] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);


  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfile = () => {
    history.push(`/profile/${user?.memberId}`);
  }

  const handleLogin = () => {
    history.push('/login');
  }
  const handleRegister = () => {
    history.push('/register');
  }
  const handleHome = () => {
    history.push('/');
  }
  useEffect(() => {

    if (isAuthenticated) {
      setAuth(true);
      history.push('/');

    }

  }, [dispatch, isAuthenticated]);

  const authLinks = (
    <Fragment>
      <div className={classes.auth} >
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="inherit"
          onClick={handleProfile}
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
        >
        </Menu>
      </div>
      <Logout />
    </Fragment>
  );
  const lang = (
    <Fragment>
      <div className={classes.lang}>
        {languages.map(({ code, name, country_code }) => (
          <button key={country_code} style={{ fontWeight: i18next.language === code ? 'bold' : 'normal' }} type="submit" onClick={() => i18next.changeLanguage(code)}>
            {name}
          </button>
        ))}
      </div>
    </Fragment>
  )
  const guestLinks = (
    <Fragment>
      <Button color="inherit" onClick={handleLogin}>
        {t('login_nav')}
      </Button>
      <Button color="inherit" onClick={handleRegister}>{t('register_nav')}</Button>
    </Fragment>
  );
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {lang}
          <Button color="inherit" onClick={handleHome}>{t('home_nav')}</Button>
          {user && auth ? authLinks : guestLinks}
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default Navbar;