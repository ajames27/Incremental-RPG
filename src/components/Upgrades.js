// this is a list of button components that will be use to buy upgrades
// each button will have a name which comes from the name property of the upgrade object, and a cost which comes from the unlock property of the upgrade object
// the function will check if the player has enough exp to buy the upgrade, and if they do, it will subtract the cost of the upgrade from the player's exp and add the upgrade to the unlockedUpgrades object

import React from "react";
import { useStore } from "../App.js";
import upgrades from "../upgrades.js";

// when a button is clicked, it will be disabled and show the name of the upgrade and the word "unlocked"
const Upgrades = () => {
    const exp = useStore((state) => state.exp);
    const unlockedUpgrades = useStore((state) => state.unlockedUpgrades);
    const buyUpgrade = useStore((state) => state.buyUpgrade);
    const highestExp = useStore((state) => state.highestExp);
    //the items in the list will be arranged vertically and each item will be inside a box with a border
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {Object.entries(upgrades).map(([upgradeName, upgrade]) => {
                let buttonBackgroundColor = "";
                if (unlockedUpgrades[upgradeName]) {
                    buttonBackgroundColor = "gold";
                } else if (exp < upgrade.unlock) {
                    buttonBackgroundColor = "#6a6c6e";
                } else {
                    buttonBackgroundColor = "white";
                }
                let buttonText = "";
                if (!unlockedUpgrades[upgradeName]) {
                    buttonText = `${upgrade.unlock} exp`;
                } else if (unlockedUpgrades[upgradeName]) {
                    if (upgrade.singleUse) {
                        buttonText = `Unlocked`;
                    } else {
                        buttonText = `Owned: ${unlockedUpgrades[upgradeName].amount}`;
                    }
                }
                console.log("highestExp", highestExp);
                console.log("upgrade.unlock", upgrade.unlock);
                return upgrade.unlock <= highestExp ? (
                    <div
                        style={{
                            border: "1px solid white",
                            borderRadius: "5px",
                            margin: "4px",
                            padding: "12px",
                            width: "100px",
                            height: "120px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                        key={upgradeName}
                    >
                        <p style={{ fontSize: "14px", fontWeight: "bold" }}>{upgrade.name}</p>
                        <p style={{ fontSize: "10px", margin: "5px" }}>{upgrade.description}</p>
                        <button
                            disabled={exp < upgrade.unlock || (unlockedUpgrades[upgradeName] && upgrade.singleUse)}
                            onClick={() => buyUpgrade(upgradeName)}
                            style={{
                                margin: "2px",
                                backgroundColor: buttonBackgroundColor,
                                border: "1px solid white",
                                borderRadius: "2px",
                                color: "black",
                            }}
                        >
                            {buttonText}
                        </button>
                    </div>
                ) : null;
            })}
        </div>
    );
};

export default Upgrades;
