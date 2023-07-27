// this file will list all the upgrades that the player can buy
// upgrades will be stored in an object whose keys are the names of the upgrades
// and whose values are an object with the following properties:
// - name: the human-readable name of the upgrade
// - type: whether the type of upgrade is a clicker upgrade or an automated upgrade
// - description: the description of the upgrade
// - strength: (for click upgrades) the amount that the upgrade will add to the player's exp per click
// - cps: for automated upgrades, the amount of times the clicker function will be called per second
// - hastpct: for haste upgrades, the percentage that the time between clicks will be decreased by expressed as one minus the percentage (for example, a haste upgrade that reduces the time between clicks by 10% will have a hastpct of 0.9)
// - unlock: the amount of exp that the player needs to unlock the upgrade
// - singlePurchase: whether the upgrade can be purchased multiple times
// - amount: the amount of times the upgrade has been purchased
const upgrades = {
    // upgrade names are in the format: "upgradeName"

    clickOne: {
        name: "Click Strength I",
        type: "clicker",
        description: "Gives an additional 1 exp per click",
        strength: 1,
        unlock: 10,
        unique: false,
        max: 20,
        amount: 0,
        isFirst: true,
    },
    clickTwo: {
        name: "Click Strength II",
        type: "clicker",
        description: "Gives an additional 10 exp per click",
        strength: 10,
        unlock: 150,
        unique: false,
        max: 20,
        amount: 0,
        requiresLevel: 3,
    },
    clickThree: {
        name: "Click Strength III",
        type: "clicker",
        description: "Gives an additional 100 exp per click",
        strength: 100,
        unlock: 3000,
        unique: false,
        max: 20,
        amount: 0,
        requiresLevel: 4,
    },
    clickFour: {
        name: "Click Strength IV",
        type: "clicker",
        description: "Gives an additional 1000 exp per click",
        strength: 1000,
        unlock: 40000,
        unique: false,
        max: 20,
        amount: 0,
        requiresLevel: 4,
    },

    // the next upgrades will be automated upgrades, they will add exp to the player's exp every second
    // the first automated upgrade will add 1 exp every second and will cost 100 exp to unlock
    clickerOne: {
        name: "Auto-clicker I",
        type: "automatic",
        description: "Automatically clicks once every {{intervalTime}} second{{plural}}",
        cps: 1,
        unlock: 100,
        unique: true,
        amount: 0,
        isFirst: true,
        requiresLevel: 2,
    },
    clickerTwo: {
        name: "Auto-clicker II",
        type: "automatic",
        description: "Automatically clicks twice every {{intervalTime}} second{{plural}}",
        cps: 2,
        unlock: 2000,
        unique: true,
        amount: 0,
        requiresLevel: 4,
    },
    clickerThree: {
        name: "Auto-clicker III",
        type: "automatic",
        description: "Automatically clicks three times every {{intervalTime}} second{{plural}}",
        cps: 3,
        unlock: 30000,
        unique: true,
        amount: 0,
        requiresLevel: 4,
    },
    //the next upgrades are "haste" upgrades, that will decrease the time between automatic clicks by a percentage
    //they are all single use upgrades
    hasteOne: {
        name: "Haste I",
        type: "haste",
        description: "Decreases the time between automatic clicks by 10%",
        hastpct: 0.9,
        unlock: 5000,
        unique: true,
        amount: 0,
        isFirst: true,
        deprecates: true,
        deprecatesAt: 20000,
        requiresLevel: 4,
    },
    hasteTwo: {
        name: "Haste II",
        type: "haste",
        description: "Decreases the time between automatic clicks by 20%",
        hastpct: 0.8,
        unlock: 20000,
        unique: true,
        amount: 0,
        deprecates: true,
        deprecatesAt: 300000,
        requires: "hasteOne",
        requiresLevel: 4,
    },
    hasteThree: {
        name: "Haste III",
        type: "haste",
        description: "Decreases the time between automatic clicks by 30%",
        hastpct: 0.7,
        unlock: 300000,
        unique: true,
        amount: 0,
        requires: "hasteTwo",
        requiresLevel: 5,
    },
    hasteFour: {
        name: "Haste IV",
        type: "haste",
        description: "Decreases the time between automatic clicks by 40%",
        hastpct: 0.6,
        unlock: 4000000,
        unique: true,
        amount: 0,
        requires: "hasteThree",
        requiresLevel: 6,
    },
};

const upgradeTypes = {
    clicker: "Click Upgrades",
    automatic: "Automatic Upgrades",
    haste: "Haste Upgrades",
};
// this exports the upgrades and upgradeTypes objects
export { upgrades, upgradeTypes };
