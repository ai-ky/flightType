const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let enemies = [];
let words = ['alpha', 'bravo', 'charlie', 'delta', 'echo'];
let input = '';
let score = 0;

// 載入戰機圖片
const playerImg = new Image();
playerImg.src = 'player.png'; // 替換為您的戰機圖片路徑

const enemyImg = new Image();
enemyImg.src = 'enemy.png'; // 替換為您的敵機圖片路徑

// 玩家位置
const player = {
    x: 100,
    y: canvas.height / 2 - 50,
    width: 100,
    height: 100,
    speedY: 5,
    moveUp: false,
    moveDown: false
  };

// 生成敵機
function spawnEnemy() {
  const word = words[Math.floor(Math.random() * words.length)];
  enemies.push({
    x: canvas.width,
    y: Math.random() * (canvas.height - 50),
    word: word
  });
}

// 更新遊戲狀態
function update() {
    if (player.moveUp && player.y > 0) 
        player.y -= player.speedY;
      
    if (player.moveDown && player.y + player.height < canvas.height) 
        player.y += player.speedY;
      
  // 移動敵機
  enemies.forEach(enemy => {
    enemy.x -= 2;
  });

  // 移除超出畫面的敵機
  enemies = enemies.filter(enemy => enemy.x + 50 > 0);
}

// 繪製遊戲畫面
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 繪製玩家
  ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);

  // 繪製敵機
  enemies.forEach(enemy => {
    ctx.drawImage(enemyImg, enemy.x, enemy.y, 50, 50);
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText(enemy.word, enemy.x, enemy.y - 10);
  });

  // 顯示分數
  ctx.fillStyle = 'white';
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, 10, 30);
}

// 處理鍵盤輸入（打字 + 控制）
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
      player.moveUp = true;
    } else if (e.key === 'ArrowDown') {
      player.moveDown = true;
    } else if (e.key.length === 1 && e.key.match(/[a-zA-Z]/)) {
      input += e.key;
      enemies.forEach((enemy, index) => {
        if (input === enemy.word) {
          enemies.splice(index, 1);
          score += 10;
          input = '';
        }
      });
    } else if (e.key === 'Backspace') {
      input = input.slice(0, -1);
    }
  });


  document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowUp') {
      player.moveUp = false;
    } else if (e.key === 'ArrowDown') {
      player.moveDown = false;
    }
  });

// 遊戲主迴圈
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// 開始遊戲
setInterval(spawnEnemy, 2000);
gameLoop();
