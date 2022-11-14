import React from "react";
import {
    MetricsContainer, MetricsLabel, MetricsResult
} from "./OutputDetailsStyles";

const OutputDetails = ({ outputDetails }) => {
    return (
        <MetricsContainer data-testid="output-details">
            <MetricsLabel>
                Status:{" "}
                <MetricsResult>
                    {outputDetails?.status?.description}
                </MetricsResult>
            </MetricsLabel>
            <MetricsLabel>
                Memory:{" "}
                <MetricsResult>
                    {outputDetails?.memory}
                </MetricsResult>
            </MetricsLabel>
            <MetricsLabel>
                Time:{" "}
                <MetricsResult>
                    {outputDetails?.time}
                </MetricsResult>
            </MetricsLabel>
        </MetricsContainer>
    )
}

export default OutputDetails