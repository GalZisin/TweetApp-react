import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/actions/userActions';
import { IAuthFunction } from '../../types/types';
import { RootState } from '../../redux/store';
import { useTranslation } from 'react-i18next';
import Alert from '@material-ui/lab/Alert';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be of minimum 8 characters length')
    .required('Password is required'),
});

const Login = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch();
  const history = useHistory();
  const [msg, setMsg] = useState(null);
  const { isAuthenticated, error } = useSelector((state: RootState) => state.auth)



  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values: IAuthFunction) => {
      dispatch(login({ email: values.email, password: values.password }));
    },
  });

  useEffect(() => {
    if (error !== 'Login first to access this resources.') {
      setMsg(error as any)
    }
    if (isAuthenticated) {
      history.push('/');
    } else {
      history.push('/login');
    }
  }, [dispatch, isAuthenticated, error]);

  return (
    <div className="container">
      <div className="loginTitle">{t('login_page_title')}</div>
      {msg ? <Alert severity="error">{msg}</Alert> : null}
      <form onSubmit={formik.handleSubmit}>
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
        <Button className="mt-1" color="primary" variant="contained" fullWidth type="submit" disabled={!formik.isValid}>
          {t('submit')}
        </Button>
      </form>
    </div>
  )
}

export default Login;