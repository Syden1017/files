#!/usr/bin/env node

const fs = require('fs');
const readline = require('readline');

if (process.argv.length < 3) {
    console.error('Пожалуйста, укажите имя файла для логирования результатов.');
    process.exit(1);
}

const logFileName = process.argv[2];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const logResult = (result) => {
    const logEntry = `${new Date().toISOString()}: ${result}\n`;
    fs.appendFile(logFileName, logEntry, (err) => {
        if (err) {
            console.error('Ошибка при записи в лог-файл:', err);
        }
    });
};

const playGame = () => {
    const randomNumber = Math.floor(Math.random() * 2) + 1;
    const side = randomNumber === 1 ? 'Орёл' : 'Решка';

    rl.question('Угадайте, что выпало (1 - Орёл, 2 - Решка): ', (input) => {
        const guess = parseInt(input, 10);

        if (isNaN(guess) || (guess !== 1 && guess !== 2)) {
            console.log('Пожалуйста, введите 1 или 2.');
            playGame();
        } else {
            const result = guess === randomNumber ? 'Вы угадали!' : `Вы не угадали. Выпало: ${side}`;
            console.log(result);
            logResult(result);
            rl.question('Хотите сыграть еще раз? (да/нет): ', (answer) => {
                if (answer.toLowerCase() === 'да') {
                    playGame();
                } else {
                    console.log('Спасибо за игру!');
                    rl.close();
                }
            });
        }
    });
};

playGame();
