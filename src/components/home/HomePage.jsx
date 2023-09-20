import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { API_URLS } from "../Services/ApiUrls";
import { CustomAlert } from "../customAlerts/customAlert";
import EditIcon from '@mui/icons-material/Edit';
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../Redux/actionCreators/index";
import LogoutIcon from '@mui/icons-material/Logout';


export const HomePage = () => {
    const user = useSelector(state => state.user)
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [alert, setAlert] = useState();
    const dispatch = useDispatch()

    const { userLogIn } = bindActionCreators(actionCreators, dispatch)

    const initialValues = {
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email().required("This Field is required"),
        first_name: Yup.string().required("This Field is required"),
        last_name: Yup.string().required("This Field is required"),
    });

    const showAlert = (message, type) => {
        setAlert({
            message: message,
            type: type,
        });
        setTimeout(() => {
            setAlert({});
        }, 2000);
    };

    const onSubmit = async (fields, setFieldValue) => {
        setIsSubmitting(true);
        try {
            let { isSuccess, data } = await API_URLS.updateUserDetails(user._id, fields);
            // saving user data in redux state
            //   userLogIn(res.data);
            if (isSuccess) {
                showAlert("User updated Successfully", "success");
                userLogIn({ ...data, token: user.token })
                setDisabled(true)
            }
        } catch (error) {
            let err =
                typeof error.message === "object"
                    ? "Some error occurred"
                    : error.message;
            showAlert(err, "danger");
        }
        setIsSubmitting(false);
    };

    const LogOut = () => {
        userLogIn({})
    }
    return (
        <div style={{ display: "flex", flexDirection: 'column', alignItems: "center", margin: "auto", paddingTop: '20px', gap: '50px' }}>
            <div style={{ width: '100%', display: "flex", justifyContent: "flex-end" }}>
                <Button onClick={LogOut}><LogoutIcon /></Button>
            </div>
            <h3>User Details
                <button style={{ border: 'none', background: 'inherit' }}
                    onClick={() => { setDisabled(!disabled) }}>
                    <EditIcon />
                </button>
            </h3>
            {alert && <CustomAlert alert={alert} />}
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {({ errors, touched, values, setFieldValue }) => {
                    return (
                        <fieldset disabled={disabled}>
                            <Form className="d-flex flex-column" style={{ width: '100%', display: "flex", flexDirection: 'column', alignItems: "center", margin: "auto", gap: '50px' }}>
                                <Table style={{ width: "800px" }}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align='center' style={{ width: '33%' }}>Sr. No.</TableCell>
                                            <TableCell align='center' style={{ width: '33%' }}>Attribute</TableCell>
                                            <TableCell align='center' style={{ width: '33%' }}>Value</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align='center'>1.</TableCell>
                                            <TableCell align='center'>First Name:</TableCell>
                                            <TableCell align='center'><div className="m-3">
                                                <Field
                                                    type="text"
                                                    name="first_name"
                                                    placeholder="First Name"
                                                    className={
                                                        "form-control" +
                                                        (errors.first_name && touched.first_name ? " is-invalid" : "")
                                                    }
                                                    style={disabled ? { backgroundColor: "inherit", border: 'none', textAlign: 'center' } : {}}
                                                />
                                                <ErrorMessage
                                                    name="first_name"
                                                    component="div"
                                                    className="invalid-feedback"
                                                />
                                            </div></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='center'>2.</TableCell>
                                            <TableCell align='center'>Last Name:</TableCell>
                                            <TableCell align='center'>
                                                <div className="m-3">
                                                    <Field
                                                        type="text"
                                                        name="last_name"
                                                        placeholder="Last Name"
                                                        className={
                                                            "form-control" +
                                                            (errors.last_name && touched.last_name ? " is-invalid" : "")
                                                        }
                                                        style={disabled ? { backgroundColor: "inherit", border: 'none', textAlign: 'center' } : {}}
                                                    />
                                                    <ErrorMessage
                                                        name="last_name"
                                                        component="div"
                                                        className="invalid-feedback"
                                                    />
                                                </div></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='center'>3.</TableCell>
                                            <TableCell align='center'>Email:</TableCell>
                                            <TableCell align='center'>
                                                <div className="m-3">
                                                    <Field
                                                        type="text"
                                                        name="email"
                                                        placeholder="Enter Email"
                                                        className={
                                                            "form-control" +
                                                            (errors.email && touched.email ? " is-invalid" : "")
                                                        }
                                                        style={{ backgroundColor: "inherit", textAlign: "center", border: "none" }}
                                                        disabled
                                                    />
                                                    <ErrorMessage
                                                        name="email"
                                                        component="div"
                                                        className="invalid-feedback"
                                                    />
                                                </div></TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                                {!disabled ? <Button type='submit' variant="outlined" color="primary">Save</Button> : null}
                            </Form>
                        </fieldset>
                    );
                }}
            </Formik>
        </div>
    );
};
