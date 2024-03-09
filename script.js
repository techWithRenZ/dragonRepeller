let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ['stick']; /* player will have access to more weapons later */

const button1 = document.querySelector('#button1'); // used const to avoid updating button1 variable
const button2 = document.querySelector('#button2');
const button3 = document.querySelector('#button3');
const text = document.querySelector('#text');
const xpText = document.querySelector('#xpText');
const healthText = document.querySelector('#healthText');
const goldText = document.querySelector('#goldText');
const monsterStats = document.querySelector('#monsterStats');
const monsterNameText = document.querySelector('#monsterNameText');
const monsterHealthText = document.querySelector('#monsterHealthText');

const weapons = [
    {
        name: 'stick',
        power: 5
    },
    {
        name: 'dagger',
        power: 30
    },
    {
        name: 'claw hammer',
        power: 50
    },
    {
        name: 'sword',
        power: 100
    }
];

const monsters = [
    {
        name: 'slime',
        level: 2,
        health: 15
    },
    {
        name: 'fanged beast',
        level: 8,
        health: 60
    },
    {
        name: 'dragon',
        level: 20,
        health: 300
    }
];

const locations = [
    {
        name: 'town square',
        'button text': ['Go to store.', 'Go to cave.', 'Fight the dragon.'], // keys in 2 or more words are in quotation
        'button functions': [goStore, goCave, fightDragon],
        text: 'You are in the town square. You see a sign that says "Store".'
    },
    {
        name: 'store',
        'button text': ['Buy 10 health (10 gold).', 'Buy weapon (30 gold).', 'Go to town square.'],
        'button functions': [buyHealth, buyWeapon, goTown],
        text: 'You entered the store.'  
    }, 
    {
        name: 'cave',
        'button text': ['Fight slime.', 'Fight fanged beast.', 'Go to town square.'],
        'button functions': [fightSlime, fightBeast, goTown],
        text: 'You entered the store. You see some monsters.' 
    },
    {
        name: 'fight',
        'button text': ['Attack!', 'Dodge!', 'Run!'],
        'button functions': [attack, dodge, goTown],
        text: 'You are fighting a monster.'
    },
    {
        name: 'kill monster',
        'button text': ['Go to town square.', 'Go to town square.', 'Go to town square.'],
        'button functions': [goTown, goTown, goTown],
        text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
    },
    {
        name: 'lose',
        'button text': ['REPLAY?', 'REPLAY?', 'REPLAY?'],
        'button functions': [restart, restart, restart],
        text: 'You died. 💀'
    },
    {
        name: 'win',
        'button text': ['REPLAY?', 'REPLAY?', 'REPLAY?'],
        'button functions': [restart, restart, restart],
        text: 'You defeated the dragon!'
    }
]; // store the data for the locations in the game including objects ( key-value pairs in curly braces)

// Initialise buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
    monsterStats.style.display = 'none';
        button1.innerText = location['button text'][0];
        button2.innerText = location['button text'][1];
        button3.innerText = location['button text'][2];
        button1.onclick = location['button functions'][0];
        button2.onclick = location['button functions'][1];
        button3.onclick = location['button functions'][2];
    text.innerText = location.text; // dot notation also accesses element in an array if it is a single word
}

function goTown() {
    // button1.innerText = 'Go to store.';
    // button2.innerText = 'Go to cave.';
    // button3.innerText = 'Fight the dragon.';
    // button1.onclick = goStore;
    // button2.onclick = goCave;
    // button3.onclick = fightDragon;
    // text.innerText = 'You are in the town square. You see a sigh that says "store".';
    update(locations[0]); // access first element of locations array
}

function goStore() {
    /* console.log('Going to store.') */
    // button1.innerText = 'Buy 10 health (10 gold).';
    // button2.innerText = 'Buy weapon (30 gold).';
    // button3.innerText = 'Go to town square.';
    // button1.onclick = buyHealth;
    // button2.onclick = buyWeapon;
    // button3.onclick = goTown;
    // text.innerText = 'You entered the store.';
    update(locations[1]);
}

function goCave() {
    // console.log('Going to cave.')
    update(locations[2]);
}

function buyHealth() {
    if (gold >= 10) {
        gold -= 10;
        health += 10;
        goldText.innerText = gold;
        healthText.innerText = health;
    }
    else {
        text.innerText = 'You do not have enough gold to buy health.';
    }
}

function buyWeapon() {
    if (currentWeapon < weapons.length - 1) {
        if (gold >= 30) {
            gold -= 30;
            currentWeapon++;
            goldText.innerText = gold;
            let newWeapon = weapons[currentWeapon].name;
            healthText.innerText = 'You now have a ' + newWeapon + '.';
            inventory.push(newWeapon);
            text.innerText += ' In your inventory you have: ' + inventory;
        }
        else {
            text.innerText = 'You do not have enough gold to buy a weapon.';
        }
    }
    else {
        innerText = 'You already have the most powerful weapon!';
        button2.innerText = 'Sell weapon for 15 gold.';
        button2.onclick = sellWeapon;
    }
}

function sellWeapon() {
    if (inventory.length > 1) {
        gold += 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift(); // because let is used instead of var, this new version of currentWeapon is scoped only to this if statement;
        // .shift() is removing the first element from the array and returns it into this currentWeapon declaration
        text.innerText = 'You sold a ' + currentWeapon + '.';
        text.innerText += ' In your inventory you have: ' + inventory;
    }
    else {
        text.innerText = "Don't sell your only weapon!";
    }
}

function fightSlime() {
    fighting = 0;
    goFight();
}

function fightBeast() {
    fighting = 1;
    goFight();
}

function fightDragon() {
    fighting = 2;
    goFight();
}

function goFight() {
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = 'block';
    monsterNameText.innerText = monsters[fighting].name;
    monsterHealth.innerText = monsterHealth;
}

function attack() {
    text.innerText = 'The ' + monsters[fighting].name + ' attacks!';
    text.innerText += 'You attack it with your ' + weapons[currentWeapon].name + '.';
    health -= monsters[fighting].level;
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    monsterHealthText.innerText = monsterHealth;
    if (health <= 0) {
        lose();
    }
    else if (monsterHealth <= 0) {
        fighting === 2 ? winGame() : defeatMonster();
        // if (fighting === 2) {
        //     winGame();
        // }
        // else {
        //     defeatMonster();
        // }
    }
}

function dodge() {
    text.innerText = 'You dodged the attack from the ' + monsters[fighting].name + '.';
}

function defeatMonster() {
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}

function lose() {
    update(locations[5]);
}

function winGame() {
    update(locations[6]);
}

function restart() {
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ['stick'];
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown();
}