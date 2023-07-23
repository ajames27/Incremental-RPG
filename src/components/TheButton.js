//component that increments a counter
import React from "react";
import { useStore } from "../App.js";
const TheButton = () => {
    const exp = useStore((state) => state.exp);
    const highestExp = useStore((state) => state.highestExp);
    const clicker = useStore((state) => state.clicker);
    const unlockedUpgrades = useStore((state) => state.unlockedUpgrades);
    const clickStrength =
        Object.values(unlockedUpgrades)
            .filter((upgrade) => upgrade.type === "clicker")
            .reduce((acc, upgrade) => acc + upgrade.adder * upgrade.amount, 0) + 1;
    const clicksPerSecond = Object.values(useStore.getState().unlockedUpgrades)
        .filter((upgrade) => upgrade.type === "automatic")
        .reduce((acc, upgrade) => acc + upgrade.amount * upgrade.add, 0);

    return (
        <div>
            <p>Experience</p>
            <p style={{ fontWeight: "bold", fontSize: "40px" }}>{exp}</p>
            <p style={{ fontSize: "16px" }}>Click Strength:{clickStrength}</p>
            <p style={{ fontSize: "16px" }}>Clicks per second:{clicksPerSecond}</p>
            <p style={{ fontSize: "16px" }}>Highest Exp:{highestExp}</p>
            <button
                onClick={clicker}
                style={{
                    color: "white",
                    margin: "10px",
                    backgroundColor: "transparent",
                    border: "2px solid white",
                    borderRadius: "5px",
                    fontSize: "40px",
                    padding: "12px",
                }}
            >
                Click
            </button>
        </div>
    );
};
export default TheButton;
