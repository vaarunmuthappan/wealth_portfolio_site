import React from "react";
import { Box, useTheme, Button } from "@mui/material";
import { useGetTeamQuery } from "./teamApiSlice";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import FlexBetween from "../../components/FlexBetween";
import { useNavigate } from "react-router-dom";
import {
    AddCircleTwoTone,
} from "@mui/icons-material";
import { useDeleteUserMutation } from './teamApiSlice'


const TeamList = () => {
    const theme = useTheme();
    const { data, isLoading } = useGetTeamQuery();

    const navigate = useNavigate();
    const [deleteUser, { isDeleted }] = useDeleteUserMutation()

    const onEdit = (e, row) => {
        navigate(`editUser/${row._id}`);
    }

    const onDelete = (e, row) => {
        deleteUser(row._id);
    }

    const columns = [
        {
            field: "username",
            headerName: "Username",
            flex: 1,
        },
        {
            field: "firstName",
            headerName: "First Name",
            flex: 1,
        },
        {
            field: "lastName",
            headerName: "Last Name",
            flex: 1,
        },
        {
            field: "firm",
            headerName: "Company",
            flex: 1,
        },
        {
            field: "role",
            headerName: "Role",
            flex: 0.5,
        },
        {
            field: "active",
            headerName: "Status",
            flex: 0.5,
        },
        {
            field: "actions",
            headerName: "",
            renderCell: (params) => {
                return (
                    <Box>
                        <Button
                            onClick={(e) => onEdit(e, params.row)}
                            variant="contained"
                        >
                            Edit
                        </Button>
                        <Button
                            onClick={(e) => onDelete(e, params.row)}
                            variant="contained"
                        >
                            Delete
                        </Button>
                    </Box>
                );
            },
            flex: 1.5,
        }
    ];

    return (
        <Box m="1.5rem 2.5rem">
            <FlexBetween>
                <Header title="Administrative Team" subtitle="List of team members" />
                <Box>
                    <Button
                        onClick={() => {
                            navigate(`/dash/team/addUser`);
                        }}
                        sx={{
                            backgroundColor: theme.palette.secondary.light,
                            color: theme.palette.background.alt,
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                        }}
                    >
                        <AddCircleTwoTone sx={{ mr: "10px" }} />
                        Add User
                    </Button>
                </Box>
            </FlexBetween>

            <Box
                mt="40px"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: theme.palette.primary.light,
                    },
                    "& .MuiDataGrid-footerContainer": {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderTop: "none",
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${theme.palette.secondary[200]} !important`,
                    },
                }}
            >
                <DataGrid
                    loading={isLoading || !data}
                    getRowId={(row) => row._id}
                    rows={data || []}
                    columns={columns}
                />
            </Box>
        </Box>
    );
};

export default TeamList;