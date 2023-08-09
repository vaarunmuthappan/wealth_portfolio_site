import React, { useEffect, useState } from "react";
import { Box, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import DataGridCustomToolbar from "../../components/DataGridCustomToolbar";
import FlexBetween from "../../components/FlexBetween";
import { useNavigate } from "react-router-dom";
import { store } from '../../app/store';
import axios from "axios";
import {
    AddCircleTwoTone,
} from "@mui/icons-material";
import { useGetEquitiesQuery } from "./equityApiSlice";

const Equity = () => {
    const theme = useTheme();

    // values to be sent to the backend
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(100000);
    const [sort, setSort] = useState({});
    const [search, setSearch] = useState("");
    const adminStore = store.getState().auth;

    const [searchInput, setSearchInput] = useState("");

    const navigate = useNavigate();

    const onEdit = (e, row) => {
        navigate(`editItem/${row._id}`);
    }

    const { data, isLoading } = useGetEquitiesQuery({
        page,
        pageSize,
        sort: JSON.stringify(sort),
        search,
    });

    function sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    sleep(1000).then(() => {
    });

    var edit = {
        total: data ? data.total : 0,
        transactions: data ? [...data.transactions] : []
    };

    const [viewData, setViewData] = useState({
        total: edit ? edit.total : 0,
        transactions: edit ? [...edit.transactions] : []
    });

    var columns = [
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
            field: "curPrice",
            headerName: "Current Price",
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
                if (adminStore.role == "Employee") {
                    return <div>No action available.</div>
                }
                else {
                    return (
                        <Box>
                            <Button
                                onClick={(e) => onEdit(e, params.row)}
                                variant="contained"
                            >
                                Edit
                            </Button>
                        </Box>
                    );
                }
            },
            flex: 1,
        }
    ];

    var APIkey = "c74b84f35c15803fdcc331fcaab1f919";
    const refresh = async (event) => {

        edit = {
            total: data.total,
            transactions: [...data.transactions]
        }
        for (var i = 0; i < viewData.transactions.length; i++) {
            const options = {
                method: 'GET',
                url: `https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/${viewData.transactions[i].name}/financial-data`,
                headers: {
                    'X-RapidAPI-Key': 'df57347a7fmsh66ed38f17a8e91fp1d1826jsn2543105cb880',
                    'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
                }
            };
            try {
                const req = await axios.request(options);
                edit.transactions[i] = {
                    ...edit.transactions[i],
                    curPrice: req.data.financialData.currentPrice.raw * viewData.transactions[i].quantity
                };
            } catch (error) {
                console.error(error);
            }
        }
        setViewData(edit);
    }

    if (!data || isLoading) return "Loading...";

    return (
        <Box m="1.5rem 2.5rem">
            <FlexBetween>
                <Header title="Equity" subtitle="All Equities (USD)" />
                <Box>
                    <Button
                        onClick={refresh}
                        sx={{
                            backgroundColor: theme.palette.secondary.light,
                            color: theme.palette.background.alt,
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                        }}
                    >
                        Refresh
                    </Button>
                </Box>
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
                    loading={isLoading || !viewData}
                    getRowId={(row) => row._id}
                    rows={(viewData && viewData.transactions) || []}
                    columns={columns}
                    rowCount={(viewData && viewData.transactions.length) || 0}
                    rowsPerPageOptions={[100000]}
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

export default Equity;