import "./App.css";
import TheButton from "./components/TheButton.js";
import Upgrades from "./components/Upgrades.js";
import { create } from "zustand";
import upgrades from "./upgrades";

const useStore = create((set) => ({
    exp: 0,
    unlockedUpgrades: {},
    baseClick: 1,
    highestExp: 0,

    clicker: () =>
        set((state) => {
            if (Object.keys(state.unlockedUpgrades).length === 0) {
                // If no upgrades are unlocked, simply return the baseClick value as exp.
                const newExp = state.exp + state.baseClick;
                return { exp: newExp, highestExp: newExp > state.highestExp ? newExp : state.highestExp };
            } else {
                // If there are unlocked upgrades, sum up the multipliers and then multiply them by baseClick.
                const adderSum = Object.values(state.unlockedUpgrades)
                    .filter((upgrade) => upgrade.type === "clicker")
                    .reduce(
                        (acc, upgrade) => acc + (upgrade.amount > 0 ? upgrade.adder * upgrade.amount : upgrade.adder),
                        0
                    );
                const newExp = state.exp + adderSum + state.baseClick;
                return { exp: newExp, highestExp: newExp > state.highestExp ? newExp : state.highestExp };
            }
        }),

    // this function will buy an upgrade, if an upgrade has the singlePurchase property set to true, it will only be able to be purchased once
    // if the upgrade has the singlePurchase property set to false, it will be able to be purchased multiple times
    // if an upgrade is being purchased for the second or following times, the upgrade.amount property will be increased by 1

    buyUpgrade: (upgradeName) =>
        set((state) => {
            const upgrade = upgrades[upgradeName];
            if (upgrade.singleUse) {
                return {
                    exp: state.exp - upgrade.unlock,
                    unlockedUpgrades: {
                        ...state.unlockedUpgrades,
                        [upgradeName]: { ...upgrade, amount: 1 },
                    },
                };
            } else {
                return {
                    exp: state.exp - upgrade.unlock,
                    unlockedUpgrades: {
                        ...state.unlockedUpgrades,
                        [upgradeName]: {
                            ...upgrade,
                            amount: state.unlockedUpgrades[upgradeName]
                                ? state.unlockedUpgrades[upgradeName].amount + 1
                                : 1,
                        },
                    },
                };
            }
        }),
}));

// this function will add exp to the player's exp every second
const gameLoop = () => {
    setInterval(() => {
        const add = Object.values(useStore.getState().unlockedUpgrades)
            .filter((upgrade) => upgrade.type === "automatic")
            .reduce((acc, upgrade) => acc + upgrade.amount * upgrade.add, 0);
        for (let i = 0; i < add; i++) {
            useStore.getState().clicker();
        }
    }, 1000);
};

gameLoop();

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <TheButton />
                <Upgrades />
            </header>
        </div>
    );
}

// exports App and useStore
export { App, useStore };
