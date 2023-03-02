import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {FormikHelpers, useFormik} from 'formik';
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {authActions, authSelectors} from "../../store/auth";
import {useActions, useAppDispatch} from "../../utils/redux-utils";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

type FormValuesType = {
    email: string
    password: string
    rememberMe: boolean
}
export const Login = () => {
    let isLogin = useSelector(authSelectors.selectIsLoggedIn)
    const dispatch = useAppDispatch()
    const {login} = useActions(authActions)
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (values.password.length >= 20 && values.password.length < 3) {
                errors.password = 'password should consist 5 or less symbols '
            }
            return errors;
        },
        onSubmit: async (values, formikHelpers: FormikHelpers<FormValuesType>) => {
            const action = await dispatch(login(values))
            if (login.rejected.match(action)) {
                if (action.payload?.fieldsErrors) {
                    const error = action.payload?.fieldsErrors[0]
                    formikHelpers.setFieldError(error.field, error.error)
                } else {
                }
            }
            formik.resetForm()
        },
    })

    if (isLogin) {
        return <Navigate to='/'/>
    }

    console.log(isLogin)
    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div style={{color: 'red'}}>{formik.errors.email}</div>
                        ) : null}
                        <TextField
                            type="password"
                            label="Password"
                            margin="normal"
                            {...formik.getFieldProps('password')}

                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div style={{color: 'red'}}>{formik.errors.password}</div>
                        ) : null}
                        <FormControlLabel label={'Remember me'} control={
                            <Checkbox
                                {...formik.getFieldProps('rememberMe')}
                            />
                        }/>
                        <Button type="submit" variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}
