import React from "react";
import {
    Box,
    TextField,
    InputLabel,
    MenuItem,
    Grid,
    FormControl,
    Select,
    Button,
    useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { useState } from "react";
import { store } from '../../app/store'
import {
    AddCircleTwoTone,
} from "@mui/icons-material";
import { useAddUserMutation } from './teamApiSlice'
import { useNavigate } from "react-router-dom";

const AddUser = () => {
    const theme = useTheme();
    const [addUser, { isLoading }] = useAddUserMutation();
    const navigate = useNavigate();

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        firm: store.getState().auth.firm,
        role: "Employee",
        active: "Active",
    });

    const [ErrMsg, setErrMsg] = useState("")

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const userData = await addUser(user).unwrap() //CHECK LOGIN ENDPOINT IN SLICE

            navigate('/dash/team');

        } catch (err) {
            if (!err?.originalStatus) {
                // isLoading: true until timeout occurs
                setErrMsg('No Server Response');
            } else if (err.originalStatus === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.originalStatus === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Add User Failed');
            }
        }
    };

    const roles = ['Owner', 'Admin', 'Employee']
    const statusStates = ['Active', 'Not Active']

    return (
        <Box m="1.5rem 2.5rem">
            <Header title="Add User" subtitle="" />
            <Box component="form" noValidate onSubmit={handleSubmit}>
                {/* First Name */}
                <Box m="5rem">
                    <Grid item xs={12} sm={2}>
                        <InputLabel
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                fontWeight: 700
                            }}
                        >
                            First Name
                        </InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="firstName"
                            name="firstName"
                            label="First Name"
                            value={user.firstName}
                            fullWidth
                            size="small"
                            autoComplete="off"
                            variant="outlined"
                            onChange={handleChange}
                        />
                    </Grid>
                </Box>

                {/* Last Name */}
                <Box m="5rem">
                    <Grid item xs={12} sm={2}>
                        <InputLabel
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                fontWeight: 700
                            }}
                        >
                            Last Name
                        </InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="lastName"
                            name="lastName"
                            label="Last Name"
                            value={user.lastName}
                            fullWidth
                            size="small"
                            autoComplete="off"
                            variant="outlined"
                            onChange={handleChange}
                        />
                    </Grid>
                </Box>

                {/* User Name */}
                <Box m="5rem">
                    <Grid item xs={12} sm={2}>
                        <InputLabel
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                fontWeight: 700
                            }}
                        >
                            Username
                        </InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="username"
                            name="username"
                            label="Username"
                            value={user.username}
                            fullWidth
                            size="small"
                            autoComplete="off"
                            variant="outlined"
                            onChange={handleChange}
                        />
                    </Grid>
                </Box>

                {/* Password */}
                <Box m="5rem">
                    <Grid item xs={12} sm={2}>
                        <InputLabel
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                fontWeight: 700
                            }}
                        >
                            Password
                        </InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="password"
                            name="password"
                            label="Password"
                            value={user.password}
                            fullWidth
                            size="small"
                            autoComplete="off"
                            variant="outlined"
                            onChange={handleChange}
                        />
                    </Grid>
                </Box>

                {/* Firm */}
                <Box m="5rem">
                    <Grid item xs={12} sm={2}>
                        <InputLabel
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                fontWeight: 700
                            }}
                        >
                            Firm
                        </InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                fontWeight: 700
                            }}
                        >
                            {user.firm}
                        </InputLabel>
                    </Grid>
                </Box>

                {/* Role */}
                <Box m="5rem">
                    <Grid item xs={12} sm={2}>
                        <InputLabel
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                fontWeight: 700
                            }}
                        >
                            Role
                        </InputLabel>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth size="small">
                            <InputLabel id="demo-simple-select-label">Role</InputLabel>
                            <Select
                                labelId="role"
                                id="role"
                                name="role"
                                value={user.role}
                                label="Role"
                                onChange={handleChange}
                            >
                                {roles.map((item) => (
                                    <MenuItem key={item} value={item}>{item}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Box>

                {/* Active */}
                <Box m="5rem">
                    <Grid item xs={12} sm={2}>
                        <InputLabel
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                fontWeight: 700
                            }}
                        >
                            Status
                        </InputLabel>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth size="small">
                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                            <Select
                                labelId="active"
                                id="active"
                                name="active"
                                value={user.active}
                                label="Status"
                                onChange={handleChange}
                            >
                                {statusStates.map((item) => (
                                    <MenuItem value={item}>{item}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Box>

                {/* Error Message */}
                <Box m="5rem">
                    <Grid item xs={12} sm={2}>
                        <InputLabel
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                fontWeight: 700
                            }}
                        >
                            {ErrMsg}
                        </InputLabel>
                    </Grid>
                </Box>

                {/* Submit */}
                <Box m="5rem">
                    <Grid item xs={12} sm={2}>
                        <Button
                            type="submit"
                            sx={{
                                backgroundColor: theme.palette.secondary.light,
                                color: theme.palette.background.alt,
                                fontSize: "14px",
                                fontWeight: "bold",
                                display: "flex",
                                justifyContent: "center"
                            }}
                        >
                            <AddCircleTwoTone sx={{ mr: "10px" }} />
                            Submit
                        </Button>
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
};

export default AddUser;