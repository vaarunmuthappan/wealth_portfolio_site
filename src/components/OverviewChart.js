import React, { useMemo } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { useGetOverviewQuery } from "../features/Overview/overviewApiSlice";

const OverviewChart = ({ isDashboard = false, view }) => {
    const theme = useTheme();
    const { data, isLoading } = useGetOverviewQuery();

    const [totalAssetsLine, totalLiabilitiesLine] = useMemo(() => {
        if (!data) return [];

        // list of transactions
        const { transactions } = data;

        const totalAssetsLine = {
            id: "Total Assets",
            color: theme.palette.secondary.main,
            data: [],
        };

        const totalLiabilitiesLine = {
            id: "Total Liabilities",
            color: theme.palette.secondary.main,
            data: [],
        };

        var assetTemp = {}
        var liabTemp = {}

        transactions.map(item => {
            if (item.BStype === "Assets") {
                if (!assetTemp[item.date]) {
                    assetTemp[item.date] = 0
                }
                assetTemp[item.date] += item.curPrice

                if (item.soldDate) {
                    if (!assetTemp[item.soldDate]) {
                        assetTemp[item.soldDate] = 0
                    }
                    assetTemp[item.soldDate] -= item.curPrice
                }

            } else {
                if (!liabTemp[item.date]) {
                    liabTemp[item.date] = 0
                }
                liabTemp[item.date] += item.curPrice

                if (item.soldDate) {
                    if (!liabTemp[item.soldDate]) {
                        liabTemp[item.soldDate] = 0
                    }
                    liabTemp[item.soldDate] -= item.curPrice
                }
            }
        })
        var assetSorted = Object.fromEntries(Object.entries(assetTemp).sort())
        var liabSorted = Object.fromEntries(Object.entries(liabTemp).sort())

        var accAssets = 0;
        for (const [key, value] of Object.entries(assetSorted)) {
            accAssets = accAssets + value;

            totalAssetsLine.data = [
                ...totalAssetsLine.data,
                { x: key.slice(0, 10), y: accAssets },
            ];
        }

        var accLiab = 0;
        for (const [key, value] of Object.entries(liabSorted)) {
            accLiab = accLiab + value;

            totalLiabilitiesLine.data = [
                ...totalLiabilitiesLine.data,
                { x: key.slice(0, 10), y: accLiab },
            ];
        }

        return [totalAssetsLine, totalLiabilitiesLine];
    }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

    if (!data || isLoading) return "Loading...";
    const chartData = [totalAssetsLine, totalLiabilitiesLine];

    return (
        <ResponsiveLine
            data={chartData}
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
                tooltip: {
                    container: {
                        color: theme.palette.primary.main,
                    },
                },
            }}
            title="Assets and Liabilities"
            margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
            xScale={{ type: "point" }}
            yScale={{
                type: "linear",
                min: "auto",
                max: "auto",
                stacked: false,
                reverse: false,
            }}
            yFormat=" >-.2f"
            curve="catmullRom"
            enableArea={isDashboard}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                format: (v) => {
                    if (isDashboard) return v.slice(0, 3);
                    return v;
                },
                orient: "bottom",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Date",
                legendOffset: 36,
                legendPosition: "middle",
            }}
            axisLeft={{
                orient: "left",
                tickValues: 5,
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: `Total Value`,
                legendOffset: -60,
                legendPosition: "middle",
            }}
            enableGridX={false}
            enableGridY={false}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
                {
                    anchor: "bottom-right",
                    direction: "column",
                    justify: false,
                    translateX: 30,
                    translateY: -40,
                    itemsSpacing: 0,
                    itemDirection: "left-to-right",
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: "circle",
                    symbolBorderColor: "rgba(0, 0, 0, .5)",
                    effects: [
                        {
                            on: "hover",
                            style: {
                                itemBackground: "rgba(0, 0, 0, 1)",
                                itemOpacity: 0.5,
                                outlineColor: "rgba(0, 0, 0, 1)"
                            },
                        },
                    ],
                },
            ]

            }
        />
    );
};

export default OverviewChart;