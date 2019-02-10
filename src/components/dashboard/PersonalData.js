import React from "react";
import App from "../../index";
import styles from "./PersonalData.module.css";

export default class PersonalData extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            personalDataShown: false
        }
    }

    togglePersonalData = () => {
        let toggler = document.getElementById("personalDataToggler");
        if (this.state.personalDataShown) {
            toggler.classList.remove("fa-angle-up");
            toggler.classList.add("fa-angle-down")
        } else {
            toggler.classList.remove("fa-angle-down");
            toggler.classList.add("fa-angle-up")
        }
        this.setState({
            personalDataShown: !this.state.personalDataShown
        });
    };

    deleteAcc = () => {
        alert("Coming soon. TM")
    };

    render() {
        const data = <tbody>
        <tr>
            <td>ID</td>
            <td>{App.instance.state.user.id}</td>
        </tr>
        <tr>
            <td>DiscordID</td>
            <td>{App.instance.state.user.discordId}</td>
        </tr>
        <tr>
            <td>Username</td>
            <td>{App.instance.state.user.username.name + "#" + App.instance.state.user.username.discriminator}</td>
        </tr>
        <tr>
            <td>E-Mail</td>
            <td>{App.instance.state.user.email}</td>
        </tr>
        </tbody>;

        return (
            <span>
                {this.state.personalDataShown &&
                <div className={styles.personalData}>
                    <p>This is the data of you, we've stored on our servers.</p>
                    <table className={styles.data}>
                        {data}
                    </table>
                    <button className={styles.deleteAcc} onClick={this.deleteAcc}>Delete my account</button>
                </div>
                }
                <i className={["fas fa-angle-down", styles.userSwitch].join(' ')}
                   onClick={this.togglePersonalData} id="personalDataToggler"/>
            </span>
        )
    }
}
