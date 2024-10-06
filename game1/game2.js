document.addEventListener('DOMContentLoaded', () => {
    const words = [
        { english: 'apple', chinese: '蘋果' },
        { english: 'banana', chinese: '香蕉' },
        { english: 'orange', chinese: '橘子' },
        { english: 'grape', chinese: '葡萄' },
        { english: 'pear', chinese: '梨子' },
        { english: 'peach', chinese: '桃子' },
        { english: 'lemon', chinese: '檸檬' },
        { english: 'cherry', chinese: '櫻桃' }
    ];

    let cardsArray = [];

    // Create pairs of cards with English and Chinese
    words.forEach(word => {
        cardsArray.push({ word: word.english, lang: 'english', pair: word.chinese });
        cardsArray.push({ word: word.chinese, lang: 'chinese', pair: word.english });
    });

    // Shuffle the cards
    cardsArray = cardsArray.sort(() => 0.5 - Math.random());

    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;

    const gameContainer = document.getElementById('game-container');

    if (!gameContainer) {
        console.error("Cannot find 'game-container'. Please check your HTML structure.");
        return;
    }

    // Create cards and append to container
    cardsArray.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.word = card.word; // Save word
        cardElement.dataset.lang = card.lang; // Save language type
        cardElement.innerHTML = card.word; // Display the word

        cardElement.addEventListener('click', selectCard);
        gameContainer.appendChild(cardElement);
    });

    function selectCard() {
        if (lockBoard) return;
        if (this === firstCard) return; // Avoid selecting the same card

        this.classList.add('selected'); // Mark the selected card

        if (!firstCard) {
            firstCard = this; // Record the first card
            return;
        }

        secondCard = this; // Record the second card
        lockBoard = true;

        checkForMatch();
    }

    function checkForMatch() {
        const firstWord = firstCard.dataset.word;
        const secondWord = secondCard.dataset.word;

        // Find the corresponding pair for firstWord
        const pairWord = firstCard.dataset.lang === 'english'
            ? words.find(word => word.english === firstWord)?.chinese
            : words.find(word => word.chinese === firstWord)?.english;

        console.log('Comparing:', firstWord, secondWord, 'Pair:', pairWord);

        // Check if the selected words are a matching pair
        const isMatch = pairWord === secondWord;

        console.log('isMatch:', isMatch);

        if (isMatch) {
            // If matched, apply success style
            firstCard.classList.add('matched');
            secondCard.classList.add('matched');
            disableCards();
        } else {
            // If not matched, reset cards
            firstCard.classList.add('wrong');
            secondCard.classList.add('wrong');
            resetCards();
        }
    }

    function disableCards() {
        // Remove click events after successful match
        firstCard.removeEventListener('click', selectCard);
        secondCard.removeEventListener('click', selectCard);
        resetBoard();
    }

    function resetCards() {
        setTimeout(() => {
            firstCard.classList.remove('selected', 'wrong');
            secondCard.classList.remove('selected', 'wrong');
            resetBoard();
        }, 1000); // Delay for 1 second to show selection error
    }

    function resetBoard() {
        [firstCard, secondCard] = [null, null];
        lockBoard = false;
    }
});
