document.addEventListener("DOMContentLoaded", function() {
    let score = 0;
    let pointsPerPop = 1;
    let autoPopActive = false;
    let bubbleSpawnRate = 2000; // Initial bubble spawn rate in ms

    const gameArea = document.getElementById("gameArea");
    const scoreDisplay = document.getElementById("score");

    function createBubble() {
        let bubble = document.createElement("div");
        bubble.classList.add("bubble");
        let x = Math.random() * (gameArea.clientWidth - 30);
        let y = Math.random() * (gameArea.clientHeight - 30);
        bubble.style.left = x + "px";
        bubble.style.top = y + "px";

        bubble.addEventListener("click", function() {
            score += pointsPerPop;
            scoreDisplay.textContent = score;
            bubble.remove();
        });

        gameArea.appendChild(bubble);

        setTimeout(() => {
            if (bubble.parentNode) {
                bubble.remove();
            }
        }, 3000);
    }

    function startBubbleGeneration() {
        setInterval(createBubble, bubbleSpawnRate);
    }

    startBubbleGeneration();

    document.getElementById("upgradeAuto").addEventListener("click", function() {
        if (score >= 10 && !autoPopActive) {
            score -= 10;
            autoPopActive = true;
            setInterval(() => {
                let bubbles = document.querySelectorAll(".bubble");
                if (bubbles.length > 0) {
                    bubbles[0].click();
                }
            }, 1000);
        }
    });

    document.getElementById("upgradeSpawn").addEventListener("click", function() {
        if (score >= 20) {
            score -= 20;
            bubbleSpawnRate *= 0.8; // Increase spawn rate
            clearInterval(startBubbleGeneration);
            startBubbleGeneration();
        }
    });

    document.getElementById("upgradePoints").addEventListener("click", function() {
        if (score >= 30) {
            score -= 30;
            pointsPerPop += 1;
        }
    });
});
