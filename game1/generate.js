const sentences = [
    { tw: "他喜歡吃蘋果", en: "He likes to eat apples" },
    { tw: "她是一名學生", en: "She is a student" },
    { tw: "我們正在學習編程", en: "We are learning programming" },
    { tw: "這是一本有趣的書", en: "This is an interesting book" },
    { tw: "他們在公園裡玩", en: "They are playing in the park" },
    { tw: "你喜歡喝茶嗎", en: "Do you like to drink tea?" },
    { tw: "我想去旅行", en: "I want to travel" },
    { tw: "今天的天氣很好", en: "The weather is nice today" },
    { tw: "我們明天見", en: "See you tomorrow" }
];

let currentSentenceIndex = 0;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function generateSentences() {
    const container = document.getElementById('sentence-container');
    container.innerHTML = ''; // 清空容器

    const sentence = sentences[currentSentenceIndex];
    const sentenceDiv = document.createElement('div');
    sentenceDiv.classList.add('container');

    // Create Chinese sentence
    const contentTw = document.createElement('div');
    contentTw.classList.add('content-tw');
    contentTw.textContent = sentence.tw;
    sentenceDiv.appendChild(contentTw);

    // Create English sentence with draggable words
    const contentEn = document.createElement('div');
    contentEn.classList.add('content-en');
    const words = sentence.en.split(' ');

    // 打亂單詞順序
    shuffleArray(words);

    words.forEach(word => {
        const wordDiv = document.createElement('div');
        wordDiv.classList.add('word');
        wordDiv.setAttribute('draggable', 'true');
        wordDiv.textContent = word;

        // Add drag event listeners
        wordDiv.addEventListener('dragstart', (e) => {
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', word);
            wordDiv.classList.add('dragging');
        });

        wordDiv.addEventListener('dragend', () => {
            wordDiv.classList.remove('dragging');
        });

        contentEn.appendChild(wordDiv);
    });

    sentenceDiv.appendChild(contentEn);
    container.appendChild(sentenceDiv);
}

// Handle drag over and drop events for reordering words
document.addEventListener('dragover', (e) => {
    e.preventDefault(); // Allow dropping
});

document.addEventListener('drop', (e) => {
    const target = e.target.closest('.word');
    if (!target) return;

    const draggedWord = document.querySelector('.word.dragging');
    if (draggedWord && draggedWord !== target) {
        const parent = target.parentNode;
        const children = Array.from(parent.children);
        const draggedIndex = children.indexOf(draggedWord);
        const targetIndex = children.indexOf(target);

        // Move dragged word before/after the target word
        if (draggedIndex < targetIndex) {
            parent.insertBefore(draggedWord, target.nextSibling);
        } else {
            parent.insertBefore(draggedWord, target);
        }
    }

    // 檢查順序是否正確
    checkIfCorrectOrder();
});

function checkIfCorrectOrder() {
    const currentSentence = sentences[currentSentenceIndex];
    const words = Array.from(document.querySelectorAll('.content-en .word'));
    const currentOrder = words.map(word => word.textContent).join(' ');

    if (currentOrder === currentSentence.en) {
        // 去除正確單詞的邊框
        words.forEach(word => {
            word.style.border = 'none'; // 去除邊框
        });

        // 等待兩秒再生成下一個句子
        setTimeout(() => {
            currentSentenceIndex++;
            if (currentSentenceIndex < sentences.length) {
                generateSentences(); // 生成下一個句子
            } else {
                alert('所有句子已完成');
            }
        }, 2000); // 停留兩秒
    }
}

// Generate sentences when the page loads
window.onload = generateSentences;
