import React from "react";
import { Box } from "@mui/material";

import Header from "../../components/Header";
import BreakdownChart from "../../components/BreakdownChart";

import { useGetBreakdownQuery } from './breakdownApiSlice'

const Breakdown = () => {
    const data = useGetBreakdownQuery()

    const assetData = {
        Total: data.data?.assetTotal.sum || 0,
        Categories: data.data?.assetCat || []
    }
    const liabilityData = {
        Total: data.data?.liabTot.sum || 0,
        Categories: data.data?.liabCat || []
    };

    const assetSubTitle = `Total Assets: ${new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    }).format(assetData.Total)}`;
    const liabSubTitle = `Total Liabilities: ${new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    }).format(liabilityData.Total)}`

    return (
        <Box m="1.5rem 2.5rem">
            <Header title="BREAKDOWN" subtitle="Breakdown of Assets" />
            <Header title="" subtitle={assetSubTitle} />
            <Box mt="40px" height="75vh">
                <BreakdownChart data={assetData} />
            </Box>
            <Header title="" subtitle="Breakdown of Liabilities" />
            <Header title="" subtitle={liabSubTitle} />
            <Box mt="40px" height="75vh">
                <BreakdownChart data={liabilityData} />
            </Box>
        </Box>

    );
};

export default Breakdown;