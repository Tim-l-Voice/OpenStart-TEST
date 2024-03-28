/* Позволил себе немного юмора в плане использования русского языка.
В целом, код так должен работать, я полагаю. */

const TelegramBot = require('node-telegram-bot-api');
const { Pool } = require('pg');

const бот = new TelegramBot('телеграмовскийТокен', {polling: true});

const pool = new Pool({
  user: 'пользовательБД',
  host: 'серверБД',
  database: 'мояБД',
  password: 'секретныйПароль',
  port: 5432,
});

бот.onText(/\/start/, (сообщение) => {
  бот.sendMessage(сообщение.chat.id, "Пожалуйста, введите id пользователя.");
});

бот.on('message', (сообщение) => {
  const chatId = сообщение.chat.id;
  const text = сообщение.text;

  if (!isNaN(text)) {
    pool.query('SELECT name FROM list1 WHERE id = $1', [text], (ошибка, результаты) => {
      if (ошибка) {
        throw ошибка;
      }
      бот.sendMessage(chatId, `Имя пользователя: ${результаты.rows[0].name}`);
    });
  } else {
    бот.sendMessage(chatId, "Пожалуйста, введите действительный id пользователя.");
  }
})