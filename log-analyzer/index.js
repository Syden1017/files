#!/usr/bin/env node

const fs = require('fs');

if (process.argv.length < 3) {
    console.error('Пожалуйста, укажите путь к файлу логов.');
    process.exit(1);
}

const logFilePath = process.argv[2];

const analyzeLogs = (filePath) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Ошибка при чтении файла:', err);
            return;
        }

        const lines = data.trim().split('\n');
        const totalGames = lines.length;
        let wins = 0;
        let losses = 0;

        lines.forEach(line => {
            if (line.includes('Вы угадали!')) {
                wins++;
            } else if (line.includes('Вы не угадали.')) {
                losses++;
            }
        });

        const winPercentage = totalGames > 0 ? (wins / totalGames) * 100 : 0;

        console.log(`Общее количество партий: ${totalGames}`);
        console.log(`Количество выигранных партий: ${wins}`);
        console.log(`Количество проигранных партий: ${losses}`);
        console.log(`Процент выигранных партий: ${winPercentage.toFixed(2)}%`);
    });
};

analyzeLogs(logFilePath);