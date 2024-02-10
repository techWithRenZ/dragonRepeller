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
    }
]; // store the data for the locations in the game including objects ( key-value pairs in curly braces)

// Initialise buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
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
    update(locations[1])
}

function goCave() {
    // console.log('Going to cave.')
}

function fightDragon() {
    // console.log('Fighting the dragon.')
}

function buyHealth() {

}

function buyWeapon() {
    
}

