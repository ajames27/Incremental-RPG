// this file will list all the upgrades that the player can buy
// upgrades will be stored in an object whose keys are the names of the upgrades
// and whose values are an object with the following properties:
// - name: the human-readable name of the upgrade
// - type: whether the type of upgrade is a clicker upgrade or an automated upgrade
// - description: the description of the upgrade
// - adder: the amount that the upgrade will add to the player's exp per click
// - clicks: for automated upgrades, the amount of times the clicker function will be called per second
// - unlock: the amount of exp that the player needs to unlock the upgrade
// - singlePurchase: whether the upgrade can be purchased multiple times
// - amount: the amount of times the upgrade has been purchased

const upgrades = {
    // upgrade names are in the format: "upgradeName"
    // each upgrade's adder will be ten times the previous multiplier, and the unlock price will be 10 times the previous unlock price times the tier of upgrade
    // for example the first upgrade will have a adder of 1 and an unlock of 10, the second upgrade will have a adder of 10 and an unlock of 200, the third upgrade will have a adder of 100 and an unlock of 3000, etc.
    clickOne: {
        name: "Click One",
        type: "clicker",
        description: "Adds 1 exp per click",
        adder: 1,
        unlock: 10,
        singleUse: false,
        amount: 0,
    },
    clickTwo: {
        name: "Click Two",
        type: "clicker",
        description: "Adds 10 exp per click",
        adder: 10,
        unlock: 200,
        singleUse: false,
        amount: 0,
    },
    clickThree: {
        name: "Click Three",
        type: "clicker",
        description: "Adds 100 exp per click",
        adder: 100,
        unlock: 3000,
        singleUse: false,
        amount: 0,
    },
    clickFour: {
        name: "Click Four",
        type: "clicker",
        description: "Adds 1000 exp per click",
        adder: 1000,
        unlock: 40000,
        singleUse: false,
        amount: 0,
    },

    // the next upgrades will be automated upgrades, they will add exp to the player's exp every second
    // the first automated upgrade will add 1 exp every second and will cost 100 exp to unlock
    clickerOne: {
        name: "Clicker One",
        type: "automatic",
        description: "Automatically clicks once per second",
        add: 1,
        unlock: 5,
        singleUse: false,
        amount: 0,
    },
    clickerTwo: {
        name: "Clicker Two",
        type: "automatic",
        description: "Automatically clicks twice per second",
        add: 2,
        unlock: 2000,
        singleUse: false,
        amount: 0,
    },
    clickerThree: {
        name: "Clicker Three",
        type: "automatic",
        description: "Automatically clicks three times per second",
        add: 3,
        unlock: 30000,
        singleUse: false,
        amount: 0,
    },
};

// this exports the upgrades object
export default upgrades;
