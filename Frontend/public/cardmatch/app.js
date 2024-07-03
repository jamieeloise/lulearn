let isPaused = false;
let firstPick; 
let wordPairs = []; 
let matches; 

async function fetchWordPairs() {
    try {
        const response = await fetch('vocab.json');
        wordPairs = await response.json();
        return wordPairs;
    } catch (error) {
        console.error('Error fetching word pairs:', error);
        throw error;
    }
}

async function main() {
    try {
        const wordPairs = await fetchWordPairs();
        console.log("Word pairs: ", wordPairs); 

        function getRandomWordPairs(numPairs) {
            const shuffledPairs = wordPairs.slice().sort(() => Math.random() - 0.5); 
            const uniquePairs = new Set(); 

            while (uniquePairs.size < numPairs) {
                const pair = shuffledPairs.pop(); 
                uniquePairs.add(pair); 
            }

            
            return shuffledPairs.slice(0, numPairs); 
        }

        const selectedWordPairs = getRandomWordPairs(8);

        const gameContainer = document.getElementById('game');

        selectedWordPairs.forEach(pair => {
            const spanishCard = createCard(pair.spanish);
            const englishCard = createCard(pair.english);

            gameContainer.appendChild(spanishCard);
            gameContainer.appendChild(englishCard);

        
        });
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

function createCard(content) {
    const card = document.createElement('div');
    card.classList.add('card');

    const front = document.createElement('div'); 
    front.classList.add('front'); 

    const back = document.createElement('div'); 
    back.classList.add('back'); 
    back.textContent = content; 
    console.log(content); 

    card.setAttribute('data-word', content); 

    card.appendChild(front); 
    card.appendChild(back); 

    card.addEventListener('click', clickCard);

   //card.textContent = content;
    return card;
}

const displayWords = (words) => {
    /* Convert each word in pair to a card */ 
    console.log(words); 
    const cardsHTML = wordPairs.flatMap(pair => { 
        return `
            <div class="card">
                <div class="front"> 
                </div> 
                <div class="back"> 
                    <h2>${words}</h2> 
                </div> 
            </div> `
             
    }).join(``); // not sure if <h2>${words}</h2> is actually doing anything 
        
    const gameContainer = document.getElementById('game');
    gameContainer.innerHTML = cardsHTML; 
} 

const isValidWordPair = (firstWord, secondWord) => {
    console.log("Checking pair: ", firstWord, secondWord); 

    firstWord = firstWord.trim().toLowerCase(); 
    secondWord = secondWord.trim().toLowerCase(); 

    for (const pair of wordPairs) {
        const spanish = pair.spanish.trim().toLowerCase(); 
        const english = pair.english.trim().toLowerCase(); 

        console.log("Pair spanish: ", pair.spanish); 
        console.log("Pair english: ", pair.english); 
        
        console.log("Comparing with pair:", spanish, english); 
        if (
            (spanish == firstWord && english == secondWord) ||
            (english == firstWord && spanish == secondWord)
        ) {
            console.log("Valid pair found!"); 
            return true; 
        }
    }
    console.log("No valid pair found."); 
    return false; 
}; 

const clickCard = (event) => {
    console.log("Card Clicked"); 
    const wordCard = (event.currentTarget);
    const [front, back] = getFrontAndBackFromCard(wordCard); 

    if(front.classList.contains("rotated") || isPaused) return; 
    
    isPaused = true; 

    rotateElements([front, back]); 

    if(!firstPick) {
        firstPick = wordCard; 
        isPaused = false; 
    } else{ 
        const secondWordCard = wordCard.getAttribute('data-word');
        const firstWordCard = firstPick.getAttribute('data-word'); 

        console.log("First word: ", firstWordCard); 
        console.log("Second word: ", secondWordCard); 

        if(isValidWordPair(firstWordCard, secondWordCard)) { // If pair is a match // 
            matches++;
            if(matches == 8){
                console.log("winner"); 
            } else {
            firstPick = null;
            isPaused = false; } 
        } else { // If pair is not a match // 
            const[firstFront, firstBack] = getFrontAndBackFromCard(firstPick); 
            setTimeout(() => {
                rotateElements([front, back, firstFront, firstBack]); 
                firstPick = null; 
                isPaused = false; 
            }, 500);
        }  
} 
}

const rotateElements = (elements) => {
    if(typeof elements != 'object' || !elements.length) return; 
    elements.forEach(element => element.classList.toggle('rotated')); 
}

const getFrontAndBackFromCard = (card) => {
    const front = card.querySelector(".front"); 
    const back = card.querySelector(".back"); 
    return [front, back];
}

const resetGame = () => { 
    game.innerHTML = ''; 
    firstPick = null;
    isPaused = true;  
    matches = 0; 

    setTimeout(async () => {
        await main(); 
        isPaused = false; 
    }, 200);
};

document.addEventListener('DOMContentLoaded', function () {
    main();
}); 

// need to randomise placement of the cards in the grid // 