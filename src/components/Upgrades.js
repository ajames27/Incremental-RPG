// this is a list of button components that will be use to buy upgrades
// each button will have a name which comes from the name property of the upgrade object, and a cost which comes from the unlock property of the upgrade object
// the function will check if the player has enough exp to buy the upgrade, and if they do, it will subtract the cost of the upgrade from the player's exp and add the upgrade to the unlockedUpgrades object

import React from "react";
import { useStore } from "../App.js";
import { upgrades, upgradeTypes } from "../upgrades.js";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import "../App.css";

const handleDescriptionPlaceholders = (description, intervalTime) => {
    const intervalTimeinSeconds = intervalTime / 1000;
    let modifiedDescription = description;
    //if the description has the placeholder {{intervalTime}} it will be replaced with the intervalTime variable
    if (description.includes("{{intervalTime}}")) {
        modifiedDescription = modifiedDescription.replace("{{intervalTime}}", intervalTimeinSeconds);
        if (description.includes("{{plural}}")) {
            if (intervalTimeinSeconds === 1) {
                modifiedDescription = modifiedDescription.replace("{{plural}}", "");
            } else {
                modifiedDescription = modifiedDescription.replace("{{plural}}", "s");
            }
        }
        return modifiedDescription;
    }
    return description;
};

// when a button is clicked, it will be disabled and show the name of the upgrade and the word "unlocked"
const UpgradeList = () => {
    //we will return a list of buttons for each upgrade type with a header on each list with the name of the upgrade type
    //the lists will only show their header if we are showing an upgrade of that type
    const unlockedUpgrades = useStore((state) => state.unlockedUpgrades);
    const highestExp = useStore((state) => state.highestExp);
    const [animationParent] = useAutoAnimate({ duration: 200 });
    return (
        <div style={styles.upgradesContainer}>
            {Object.entries(upgradeTypes).map(([upgradeType, upgradeHeader]) => {
                //check if user's highest exp is greater than the unlock value of the upgrade with the isFirst property set to true for the upgrade type
                //if it is, show the header for that upgrade type
                const showHeader = Object.entries(upgrades).some(
                    ([upgradeName, upgrade]) =>
                        upgrade.type === upgradeType && upgrade.isFirst && highestExp >= upgrade.unlock
                );

                return (
                    <div styles={styles.upgradeListContainer}>
                        {showHeader ? <p style={styles.upgradeHeader}>{upgradeHeader}</p> : null}
                        <div className="upgradeList" ref={animationParent} key={upgradeType} style={styles.upgradeList}>
                            {Object.entries(upgrades)
                                .filter(([upgradeName, upgrade]) => upgrade.type === upgradeType)
                                .map(([upgradeName, upgrade]) => {
                                    let show = false;
                                    if (upgrade.unlock <= highestExp) {
                                        // if (upgrade.unique) {
                                        //     if (!unlockedUpgrades[upgradeName]) {
                                        //         show = true;
                                        //     }
                                        // } else {
                                        //     show = true;
                                        // }
                                        show = true;
                                    }
                                    if (
                                        upgrade.hasOwnProperty("deprecates") &&
                                        upgrade.deprecates &&
                                        unlockedUpgrades[upgradeName]
                                    ) {
                                        if (highestExp >= upgrade.deprecatesAt) {
                                            show = false;
                                        }
                                    }
                                    return show ? (
                                        <UpgradeButton key={upgradeName} upgradeName={upgradeName} upgrade={upgrade} />
                                    ) : null;
                                })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

const UpgradeButton = ({ upgradeName, upgrade }) => {
    const exp = useStore((state) => state.exp);
    const unlockedUpgrades = useStore((state) => state.unlockedUpgrades);
    const handleUpgrade = useStore((state) => state.handleUpgrade);
    const highestExp = useStore((state) => state.highestExp);
    const intervalTime = useStore((state) => state.intervalTime);

    const isMaxed = unlockedUpgrades[upgradeName] && unlockedUpgrades[upgradeName].amount >= upgrade.max;
    const unique = unlockedUpgrades[upgradeName] && upgrade.unique;
    const xpTooLow = exp < upgrade.unlock;
    let buttonBackgroundColor = "#282c34";
    let buttonColor = "white";

    // If we don't have enough exp to buy the upgrade, the text will be gray
    if (xpTooLow) {
        if (!upgrade.unique && unlockedUpgrades[upgradeName]) {
            buttonColor = "gray";
        } else if (upgrade.unique && !unlockedUpgrades[upgradeName]) {
            buttonColor = "gray";
        }
    }

    // this will change the color of the button to teal if the upgrade is unique and unlocked or if the upgrade is maxed
    if (isMaxed || (unique && unlockedUpgrades[upgradeName])) {
        buttonBackgroundColor = "#2b6070";
    }

    let buttonText = "";
    // sets the
    if (!unlockedUpgrades[upgradeName]) {
        buttonText = `${upgrade.unlock} exp`;
    } else if (unlockedUpgrades[upgradeName]) {
        if (upgrade.unique) {
            buttonText = `Unlocked`;
        } else {
            buttonText = `${upgrade.unlock} exp`;
        }
    }

    return (
        <button
            style={{ ...styles.button, backgroundColor: buttonBackgroundColor, color: buttonColor }}
            disabled={isMaxed || unique || xpTooLow}
            onClick={() => handleUpgrade(upgradeName)}
        >
            <p style={styles.upgradeName}>{upgrade.name}</p>
            {upgrade.unique && <p style={styles.upgradeSingleUse}>Unique</p>}
            <p style={styles.upgradeDescription}>{handleDescriptionPlaceholders(upgrade.description, intervalTime)}</p>

            {upgrade.max && (
                <>
                    <p style={styles.upgradeOwned}>
                        Owned: {unlockedUpgrades[upgradeName] ? unlockedUpgrades[upgradeName].amount : 0}
                    </p>
                    <p style={styles.upgradeSingleUse}>Max: {upgrade.max}</p>
                </>
            )}
            {isMaxed ? null : <p style={styles.buttonText}>{buttonText}</p>}
        </button>
    );
};

const styles = {
    upgradesContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
    },
    upgradeListContainer: {
        display: "flex",
        // flexDirection: "column",
        // justifyContent: "center",
        // alignItems: "center",
        width: "13rem",
        backgroundColor: "#3f4a61",
        borderRadius: "10px",
    },
    upgradeList: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "13rem",
        margin: "10px",
        backgroundColor: "#3f4a61",
        borderRadius: "10px",
        // paddingBottom: "10px",
    },
    upgradeHeader: {
        fontSize: "20px",
        fontWeight: "bold",
        margin: "2px",
    },
    button: {
        border: "3px solid white",
        borderRadius: "10px",
        color: "white",
        margin: "10px",
        padding: "12px",
        width: "12rem",
        // height: "6rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
    },
    upgradeName: {
        fontSize: "14px",
        fontWeight: "bold",
        margin: "5px",
    },
    upgradeSingleUse: {
        fontSize: "10px",
        margin: "0px",
        fontStyle: "italic",
        color: "gold",
    },
    upgradeDescription: {
        fontSize: "12px",
        margin: "10px",
    },
    upgradeOwned: {
        fontSize: "12px",
        margin: "0px",
        fontWeight: "bold",
    },
    buttonText: {
        fontSize: "12px",
        marginTop: "5px",
        fontWeight: "bold",
    },
};

export default UpgradeList;
