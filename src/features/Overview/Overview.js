import { store } from '../../app/store'
import React from "react";

import {
    DownloadOutlined,
    Email,
    PointOfSale,
    PersonAdd,
    Traffic,
    BadgeTwoTone,
    PaidTwoTone,
    SavingsTwoTone,
    LocalAtmTwoTone
} from "@mui/icons-material";
import {
    Box,
    Button,
    Typography,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import FlexBetween from "../../components/FlexBetween";
import Header from "../../components/Header";
import BreakdownChart from "../../components/BreakdownChart";
import { useGetOverviewQuery } from "./overviewApiSlice";
import { useGetBreakdownQuery } from '../breakdown/breakdownApiSlice'
import StatBox from "../../components/StatBox";

const Overview = () => {

    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date);

    const authStore = store.getState().auth;
    const theme = useTheme();
    const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

    const { data, isLoading } = useGetOverviewQuery();

    const breakdownData = useGetBreakdownQuery()
    const assetData = {
        Total: breakdownData.data?.assetTotal.sum || 0,
        Categories: breakdownData.data?.assetCat || []
    }
    const liabilityData = {
        Total: breakdownData.data?.liabTot.sum || 0,
        Categories: breakdownData.data?.liabCat || []
    };
    const netValue = assetData.Total - liabilityData.Total

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
            field: "price",
            headerName: "Initial Price",
            flex: 1,
            renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
        },
        {
            field: "quantity",
            headerName: "Initial Quantity",
            flex: 1,
        },
        {
            field: "curPrice",
            headerName: "Current Price",
            flex: 1,
            renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
        },
        {
            field: "date",
            headerName: "Data Acquired",
            flex: 1,
        },
        {
            field: "notes",
            headerName: "Notes",
            flex: 1,
        },
        {
            field: "sold",
            headerName: "Sold?",
            flex: 1,
        },
    ];

    const content = (
        <Box m="1.5rem 2.5rem">
            <FlexBetween>
                <Header title={`Welcome ${authStore.user}`} subtitle="Welcome to your dashboard" />

                {/* <Box>
                    <Button
                        sx={{
                            backgroundColor: theme.palette.secondary.light,
                            color: theme.palette.background.alt,
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                        }}
                    >
                        <DownloadOutlined sx={{ mr: "10px" }} />
                        Download Reports
                    </Button>
                </Box> */}
            </FlexBetween>

            <Box
                mt="20px"
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="160px"
                gap="20px"
                sx={{
                    "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
                }}
            >
                {/* ROW 1 */}
                <StatBox
                    title="Portfolio Net Worth"
                    value={data && netValue}
                    // increase="+14%"
                    // description="Since last month"
                    icon={
                        <PaidTwoTone
                            sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                        />
                    }
                />
                <StatBox
                    title="Total Employees"
                    value={data && data.totalEmployees}
                    // increase="+21%"
                    // description="Since last month"
                    icon={
                        <BadgeTwoTone
                            sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                        />
                    }
                />
                {/* <Box
                    gridColumn="span 8"
                    gridRow="span 2"
                    backgroundColor={theme.palette.background.alt}
                    p="1rem"
                    borderRadius="0.55rem"
                >
                    <OverviewChart view="sales" isDashboard={true} />
                </Box> */}
                <StatBox
                    title="Total Assets"
                    value={data && assetData.Total}
                    // increase="+5%"
                    // description="Since last month"
                    icon={
                        <SavingsTwoTone
                            sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                        />
                    }
                />
                <StatBox
                    title="Total Liabilites"
                    value={data && liabilityData.Total}
                    // increase="+43%"
                    // description="Since last month"
                    icon={
                        <LocalAtmTwoTone
                            sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                        />
                    }
                />

                {/* ROW 2 */}
                <Box
                    gridColumn="span 6"
                    gridRow="span 3"
                    backgroundColor={theme.palette.background.alt}
                    p="1.5rem"
                    borderRadius="0.55rem"
                >
                    <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
                        Assets By Category
                    </Typography>
                    <Typography
                        p="0 0.6rem"
                        fontSize="0.8rem"
                        sx={{ color: theme.palette.secondary[200] }}
                    >
                        Breakdown of assets by sub-category.
                    </Typography>
                    <BreakdownChart data={assetData} />
                </Box>
                <Box
                    gridColumn="span 6"
                    gridRow="span 3"
                    backgroundColor={theme.palette.background.alt}
                    p="1.5rem"
                    borderRadius="0.55rem"
                >
                    <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
                        Liabilities By Category
                    </Typography>
                    <Typography
                        p="0 0.6rem"
                        fontSize="0.8rem"
                        sx={{ color: theme.palette.secondary[200] }}
                    >
                        Breakdown of liabilities by sub-category.
                    </Typography>
                    <BreakdownChart data={liabilityData} />
                </Box>

                {/* ROW 3 */}
                <Box
                    gridColumn="span 12"
                    gridRow="span 3"
                    sx={{
                        "& .MuiDataGrid-root": {
                            border: "none",
                            borderRadius: "0.55rem",
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
                            backgroundColor: theme.palette.background.alt,
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
                    />
                </Box>
            </Box>
        </Box>
    )

    return content
}
export default Overview