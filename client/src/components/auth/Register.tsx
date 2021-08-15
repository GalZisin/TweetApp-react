import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../redux/actions/userActions';
import { RootState } from '../../redux/store';
import { useTranslation } from 'react-i18next';
import Alert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom'
import { IAuthFunction } from '../../types/types';

const validationSchema = yup.object({
    name: yup
        .string()
        .required('name is required'),
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .matches(/\d+/, 'Password must contain at least one digit.')
        .matches(/[A-Z]+/, 'Password must contain at least one upper case.')
        .required('Password is required')
});

const Register = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch();
    const history = useHistory();
    const [msg, setMsg] = useState(null);
    const { isAuthenticated, error } = useSelector((state: RootState) => state.auth)

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values: IAuthFunction) => {
            dispatch(register({ name: values.name, email: values.email, password: values.password }));
        },
    });
    useEffect(() => {

        if (isAuthenticated) {
            history.push('/');
        } else {
            history.push('/register');
        }
        // Check for register error
        if (error !== '') {
            setMsg(error as any);
        } else {
            setMsg(null);
        }
    }, [dispatch, error, isAuthenticated]);

    return (
        <div className="container">
            <div className="registerTitle">{t('login_page_title')}</div>
            {msg ? <Alert severity="error">{msg}</Alert> : null}
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="name"
                    name="name"
                    label={t('name')}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    className="formInput"
                />
                <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label={t('email')}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    className="formInput"
                />
                <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label={t('password')}
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    className="formInput"
                />
                <Button className="mt-1" color="primary" variant="contained" fullWidth type="submit">
                    {t('submit')}
                </Button>
            </form>
        </div>
    )
}

export default Register;