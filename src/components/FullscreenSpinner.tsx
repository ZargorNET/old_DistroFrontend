import React from "react";
import Spinner from "./Spinner";

export default class FullscreenSpinner extends React.Component {
    render(): React.ReactNode {
        const loadingStyle = {
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        };
        return (
            <span>
             <div style={loadingStyle}>
                    <Spinner/>
                </div>
            </span>
        );
    }
}
