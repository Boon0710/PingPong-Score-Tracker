const p1 = {
    score: 0,
    button: document.querySelector('#p1Button'),
    display: document.querySelector('#p1ScoreDisplay')
}
const p2 = {
    score: 0,
    button: document.querySelector('#p2Button'),
    display: document.querySelector('#p2ScoreDisplay')
}

const resetButton = document.querySelector('#reset');
const returnButton = document.querySelector('#return');
const winningScoreSelect = document.querySelector('#playTo');
let winningScore = 3;
let isGameOver = false;
let fireworksInterval;

function updateScores(player, opponent) {
    if (!isGameOver) {
        player.score += 1;
        if (player.score >= winningScore && (player.score - opponent.score >= 2)) {
            isGameOver = true;
            player.display.classList.add('has-text-success');
            opponent.display.classList.add('has-text-danger');
            player.button.disabled = true;
            opponent.button.disabled = true;
            triggerFireworks();
        }
        player.display.textContent = player.score;
    }
}


p1.button.addEventListener('click', function () {
    updateScores(p1, p2)
})
p2.button.addEventListener('click', function () {
    updateScores(p2, p1)
})


winningScoreSelect.addEventListener('change', function () {
    winningScore = parseInt(this.value);
    reset();
})

resetButton.addEventListener('click', reset)
returnButton.addEventListener('click', function () {
    document.getElementById('firstCard').style.display = 'block';
    document.getElementById('secondCard').style.display = 'none';

    reset();
})

function reset() {
    isGameOver = false;
    for (let p of [p1, p2]) {
        p.score = 0;
        p.display.textContent = 0;
        p.display.classList.remove('has-text-success', 'has-text-danger');
        p.button.disabled = false;
    }
    if (fireworksInterval) {
        clearInterval(fireworksInterval);  // Stop the fireworks
    }
    confetti.reset();
}

function triggerFireworks() {
    var duration = 15 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    if (fireworksInterval) {
        clearInterval(fireworksInterval);  // Clear existing interval if any
    }

    fireworksInterval = setInterval(function () {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(fireworksInterval);
        }

        var particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 }
        }));
    }, 250);
}

const setNameButton = document.querySelector('#setName');

setNameButton.addEventListener('click', function () {
    const p1NameInput = document.querySelector('#p1NameInput');
    const p2NameInput = document.querySelector('#p2NameInput');
    const p1NameDisplay = document.querySelector('#p1NameDisplay');
    const p2NameDisplay = document.querySelector('#p2NameDisplay');

    // Set player names
    p1NameDisplay.textContent = p1NameInput.value;
    p2NameDisplay.textContent = p2NameInput.value;

    // Hide first card and show second card
    document.getElementById('firstCard').style.display = 'none';
    document.getElementById('secondCard').style.display = 'block';
});



