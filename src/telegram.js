export class TelegramBot {
  constructor(token) {
    this.token = token;
    this.apiUrl = `https://api.telegram.org/bot${token}`;
  }

  async call(method, body) {
    const response = await fetch(`${this.apiUrl}/${method}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    return response.json();
  }

  async sendMessage(chatId, text, buttons = null, parseMode = "Markdown") {
    return this.call("sendMessage", {
      chat_id: chatId,
      text: text,
      parse_mode: parseMode,
      reply_markup: buttons
    });
  }

  async editMessage(chatId, msgId, text, buttons = null) {
    return this.call("editMessageText", {
      chat_id: chatId,
      message_id: msgId,
      text: text,
      parse_mode: "Markdown",
      reply_markup: buttons
    });
  }

  async deleteMessage(chatId, msgId) {
    return this.call("deleteMessage", {
      chat_id: chatId,
      message_id: msgId
    });
  }

  async answerCallback(id, text = null) {
    return this.call("answerCallbackQuery", {
      callback_query_id: id,
      text: text
    });
  }
}
