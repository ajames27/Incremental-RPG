import "./App.css";
import TheButton from "./components/TheButton.js";
import Upgrades from "./components/Upgrades.js";
import { create } from "zustand";
import { upgrades } from "./upgrades.js";
import { clear } from "@testing-library/user-event/dist/clear";

const useStore = create((set) => ({
    exp: 0,
    unlockedUpgrades: {},
    baseClick: 1,
    highestExp: 0,
    intervalTime: 1000,
    baseInterval: 1000,
    intervalChanged: false,
    gameInterval: null,
    setGameLoop: (interval) =>
        set((state) => {
            let gameinterval = () => {
                if (useStore.getState().intervalChanged) {
                    updateInterval();
                    return;
                }
                const cps = Object.values(useStore.getState().unlockedUpgrades)
                    .filter((upgrade) => upgrade.type === "automatic")
                    .reduce((acc, upgrade) => acc + upgrade.amount * upgrade.cps, 0);
                if (cps > 0) {
                    useStore.getState().clicker(cps);
                }
            };
            return { gameInterval: setInterval(gameinterval, interval) };
        }),

    clicker: (cpsMult = 1) =>
        set((state) => {
            if (Object.keys(state.unlockedUpgrades).length === 0) {
                // If no upgrades are unlocked, simply return the baseClick value as exp.
                const newExp = state.exp + state.baseClick;
                return { exp: newExp, highestExp: newExp > state.highestExp ? newExp : state.highestExp };
            } else {
                // If there are unlocked upgrades, sum up the multipliers and then multiply them by baseClick.
                const strengthSum = Object.values(state.unlockedUpgrades)
                    .filter((upgrade) => upgrade.type === "clicker")
                    .reduce(
                        (acc, upgrade) =>
                            acc + (upgrade.amount > 0 ? upgrade.strength * upgrade.amount : upgrade.strength),
                        0
                    );

                const newExp = state.exp + (strengthSum + state.baseClick) * cpsMult;
                return { exp: newExp, highestExp: newExp > state.highestExp ? newExp : state.highestExp };
            }
        }),

    // this function will buy an upgrade, if an upgrade has the singlePurchase property set to true, it will only be able to be purchased once
    // if the upgrade has the singlePurchase property set to false, it will be able to be purchased multiple times
    // if an upgrade is being purchased for the second or following times, the upgrade.amount property will be increased by 1

    handleUpgrade: (upgradeName) =>
        set((state) => {
            const upgrade = upgrades[upgradeName];
            switch (upgrade.type) {
                case "haste": {
                    return {
                        exp: state.exp - upgrade.unlock,
                        intervalTime: state.baseInterval * upgrade.hastpct,
                        intervalChanged: true,
                        unlockedUpgrades: {
                            ...state.unlockedUpgrades,
                            [upgradeName]: { ...upgrade, amount: 1 },
                        },
                    };
                }
                case "clicker": {
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
                case "automatic": {
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
                default: {
                    return state;
                }
            }
        }),
}));

// this function will add exp to the player's exp every second
const gameLoop = () => {
    const intervalTime = useStore.getState().intervalTime;
    useStore.getState().setGameLoop(intervalTime);
};

const updateInterval = () => {
    if (useStore.getState().intervalChanged) {
        clearInterval(useStore.getState().gameInterval);
        useStore.getState().intervalChanged = false;
        gameLoop();
    }
};
console.log("is called");
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
