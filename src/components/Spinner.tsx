import React from "react";
import styles from "./Spinner.module.css";

export default class Spinner extends React.Component {
    render(): React.ReactNode {
        return (
            <div className={styles.spinner}/>
        )
    }
}
