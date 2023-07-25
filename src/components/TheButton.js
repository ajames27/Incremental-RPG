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
            .reduce((acc, upgrade) => acc + upgrade.strength * upgrade.amount, 0) + 1;
    const clicksPerSecond = Object.values(useStore.getState().unlockedUpgrades)
        .filter((upgrade) => upgrade.type === "automatic")
        .reduce((acc, upgrade) => acc + upgrade.amount * upgrade.cps, 0);
    const intervalTime = useStore((state) => state.intervalTime);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px",
            }}
        >
            <p style={{ fontSize: "20px", margin: "5px" }}>Experience</p>
            <p style={{ fontWeight: "bold", fontSize: "40px", margin: "30px" }}>{exp}</p>
            <p style={{ fontSize: "16px", margin: "5px" }}>Click Strength: {clickStrength}</p>
            <p style={{ fontSize: "16px", margin: "5px" }}>
                Auto Clicks: {clicksPerSecond} clicks every {intervalTime / 1000} second
                {intervalTime === 1000 ? "" : "s"}
            </p>
            <p style={{ fontSize: "16px", margin: "5px" }}>Highest Exp: {highestExp}</p>

            <button
                onClick={() => clicker(1)}
                style={{
                    color: "white",
                    margin: "10px",
                    backgroundColor: "transparent",
                    border: "2px solid white",
                    borderRadius: "5px",
                    fontSize: "40px",
                    // width: "100px",
                    // height: "80px",
                    padding: "12px",
                    fontWeight: "bold",
                }}
            >
                <p style={{ margin: "0px" }}>Click</p>
            </button>
        </div>
    );
};
export default TheButton;
