const TelegramBot = require('node-telegram-bot-api');
const { PrismaClient } = require('@prisma/client');

const bot = new TelegramBot('телеграмовскийТокен', {polling: true});

const prisma = new PrismaClient();

bot.onText(/\/start/, (message) => {
  bot.sendMessage(message.chat.id, "Пожалуйста, введите id пользователя.");
});

bot.on('message', async (message) => {
  const chatId = message.chat.id;
  const text = message.text;

  if (!isNaN(text)) {
    try {
      const user = await prisma.list1.findUnique({
        where: {
          id: Number(text),
        },
      });

      if (user) {
        bot.sendMessage(chatId, `Имя пользователя: ${user.name}`);
      } else {
        bot.sendMessage(chatId, "Пользователь с таким id не найден.");
      }
    } catch (error) {
      console.error(error);
      bot.sendMessage(chatId, "Произошла ошибка при обработке вашего запроса.");
    }
  } else {
    bot.sendMessage(chatId, "Пожалуйста, введите действительный id пользователя.");
  }
});
