import React, { useState } from "react";
import { Box, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetTransactionsQuery } from "./transactionsApiSlice";
import Header from "../../components/Header";
import DataGridCustomToolbar from "../../components/DataGridCustomToolbar";
import FlexBetween from "../../components/FlexBetween";
import { useNavigate } from "react-router-dom";
import {
    AddCircleTwoTone,
} from "@mui/icons-material";
import { useDeleteItemMutation, useGetItemByIdQuery } from './transactionsApiSlice'

const Transactions = () => {
    const theme = useTheme();

    // values to be sent to the backend
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(20);
    const [sort, setSort] = useState({});
    const [search, setSearch] = useState("");

    const [searchInput, setSearchInput] = useState("");

    const navigate = useNavigate();
    const [deleteItem, { isDeleted }] = useDeleteItemMutation()

    const onEdit = (e, row) => {
        navigate(`editItem/${row._id}`);
    }

    const onDelete = (e, row) => {
        deleteItem(row._id);
    }

    const { data, isLoading } = useGetTransactionsQuery({
        page,
        pageSize,
        sort: JSON.stringify(sort),
        search,
    });

    const columns = [
        {
            field: "name",
            headerName: "Name",
            flex: 1,
        },
        {
            field: "category",
            headerName: "Category",
            flex: 1,
        },
        {
            field: "USDPrice",
            headerName: "Price",
            flex: 1,
            renderCell: (params) => `${new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
            }).format(params.value)}`,
        },
        {
            field: "quantity",
            headerName: " Quantity",
            flex: 1,
        },
        {
            field: "notes",
            headerName: "Notes",
            flex: 1,
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
            flex: 1,
        }
    ];


    if (!data || isLoading) return "Loading...";
    return (
        <Box m="1.5rem 2.5rem">
            <FlexBetween>
                <Header title="TRANSACTIONS" subtitle="Transactions in USD" />
                <Box>
                    <Button
                        onClick={() => {
                            navigate(`/dash/transactions/addItem`);
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
                        Add Item
                    </Button>
                </Box>
            </FlexBetween>
            <Box
                height="80vh"
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
                    rows={(data && data.transactions) || []}
                    columns={columns}
                    rowCount={(data && data.total) || 0}
                    rowsPerPageOptions={[20, 50, 100]}
                    pagination
                    page={page}
                    pageSize={pageSize}
                    paginationMode="server"
                    sortingMode="server"
                    onPageChange={(newPage) => setPage(newPage)}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    onSortModelChange={(newSortModel) => setSort(...newSortModel)}
                    components={{ Toolbar: DataGridCustomToolbar }}
                    componentsProps={{
                        toolbar: { searchInput, setSearchInput, setSearch },
                    }}
                />
            </Box>
        </Box>
    );
};

export default Transactions;