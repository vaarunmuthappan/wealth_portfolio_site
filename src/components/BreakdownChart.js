import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { Box, useTheme } from "@mui/material";

const BreakdownChart = ({ data, isDashboard = false }) => {

    const isLoading = false;

    const theme = useTheme();

    if (!data || isLoading) return "Loading...";

    const colors = [
        "#FFEC21",
        "#378AFF",
        "#FFA32F",
        "#F54F52",
        "#93F03B",
        "#9552EA",
        "#003F5C",
        "#58508D",
        "#BC5090",
    ];
    const formattedData = Object.entries(data.Categories).map(
        ([category, amount], i) => ({
            id: category,
            label: category,
            value: amount / data.Total,
            color: colors[i % 9],
        })
    );
    function percentFormat(value) {
        return `${((value * 100).toFixed(2))} %`;
    }

    return (
        <Box
            height={isDashboard ? "400px" : "100%"}
            width={undefined}
            minHeight={isDashboard ? "325px" : undefined}
            minWidth={isDashboard ? "325px" : undefined}
            position="relative"
        >
            <ResponsivePie
                data={formattedData}
                theme={{
                    axis: {
                        domain: {
                            line: {
                                stroke: theme.palette.secondary[200],
                            },
                        },
                        legend: {
                            text: {
                                fill: theme.palette.secondary[200],
                            },
                        },
                        ticks: {
                            line: {
                                stroke: theme.palette.secondary[200],
                                strokeWidth: 1,
                            },
                            text: {
                                fill: theme.palette.secondary[200],
                            },
                        },
                    },
                    legends: {
                        text: {
                            fill: theme.palette.secondary[200],
                        },
                    },
                }}
                colors={{ datum: "data.color" }}
                margin={
                    isDashboard
                        ? { top: 40, right: 80, bottom: 100, left: 50 }
                        : { top: 40, right: 80, bottom: 80, left: 80 }
                }
                sortByValue={true}
                innerRadius={0.45}
                activeOuterRadiusOffset={8}
                borderWidth={1}
                borderColor={{
                    from: "color",
                    modifiers: [["darker", 0.2]],
                }}
                enableArcLinkLabels={false}
                enableArcLabels={true}
                valueFormat={percentFormat}
                arcLinkLabelsTextColor={theme.palette.secondary[200]}
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: "color" }}
                arcLabelsSkipAngle={10}

                tooltip={point => {

                    return <div
                        style={{
                            background: 'white',
                            padding: '3px 6px',
                            border: '1px solid #ccc',
                        }}
                    >
                        <div>{point.datum.id}: {(point.datum.data.value * 100).toFixed(2)} %</div>
                    </div>;
                }}

                arcLabelsTextColor={{
                    from: "color",
                    modifiers: [["darker", 2]],
                }}
                legends={[
                    {
                        anchor: "bottom",
                        direction: "row",
                        justify: false,
                        translateX: isDashboard ? 20 : 0,
                        translateY: isDashboard ? 50 : 56,
                        itemsSpacing: 0,
                        itemWidth: 85,
                        itemHeight: 18,
                        itemTextColor: "#999",
                        itemDirection: "left-to-right",
                        itemOpacity: 1,
                        symbolSize: 18,
                        symbolShape: "circle",
                        effects: [
                            {
                                on: "hover",
                                style: {
                                    itemTextColor: theme.palette.primary[500],
                                },
                            },
                        ],
                    },
                ]}
            />
        </Box>
    );
};

export default BreakdownChart;