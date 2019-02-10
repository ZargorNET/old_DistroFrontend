import React from "react";
import styles from './NotFound.module.css'

export default class NotFound extends React.Component {
    render() {
        return (
            <h2 className={styles.notFound}>Whoops! This page could not be found!</h2>
        )
    }
}
