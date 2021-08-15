import React, { Fragment, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import { logout } from '../../redux/actions/userActions';
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store';
import { useTranslation } from 'react-i18next';

const Logout = () => {
    const { t } = useTranslation()
    const history = useHistory();
    const dispatch = useDispatch();

    const { isAuthenticated, loading, user } = useSelector((state: RootState) => state.auth)

    const logoutHandler = (): void => {
        dispatch(logout());
    }

    useEffect(() => {
        if (!isAuthenticated && !loading) {
            history.push('/');
        }
    }, [dispatch, isAuthenticated, loading, user]);

    return (
        <Fragment>
            <Button color="inherit" onClick={logoutHandler}>{t('logout_nav')}</Button>
        </Fragment>


    )
}
export default Logout;