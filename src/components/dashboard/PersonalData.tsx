import React from "react";
import App from "../..";
import styles from "./PersonalData.module.css";

interface IPersonDataState {
    personalDataShown: boolean
}

export default class PersonalData extends React.Component<any, IPersonDataState> {

    constructor(props: any) {
        super(props);
        this.state = {
            personalDataShown: false
        }
    }

    togglePersonalData = () => {
        let toggler = document.getElementById("personalDataToggler");
        if (toggler == null)
            return;
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
        if (App.instance.state.localUser == null) {
            console.error("Tried to render PersonalData component with a null user!");
            return false;
        }
        const data = <tbody>
        <tr>
            <td>ID</td>
            <td>{App.instance.state.localUser.id}</td>
        </tr>
        <tr>
            <td>DiscordID</td>
            <td>{App.instance.state.localUser.discordId}</td>
        </tr>
        <tr>
            <td>Username</td>
            <td>{App.instance.state.localUser.username.name + "#" + App.instance.state.localUser.username.discriminator}</td>
        </tr>
        <tr>
            <td>E-Mail</td>
            <td>{App.instance.state.localUser.email}</td>
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
