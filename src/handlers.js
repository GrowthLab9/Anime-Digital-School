function formatList(items) {
  return items.map((item, index) => `${index + 1}. ${item}`).join("\n");
}

export function createHandlers({ token, adminId, config, sendMessage }) {
  const classListMessage = `📖 *Pilihan Kelas:* \n${formatList(config.classList)}`;
  const registrationMessage = `Cara daftar:\n${formatList(config.registrationSteps)}`;
  const startButtons = config.startButtons.map((row) =>
    row.map((button) =>
      button.url === "WEBSITE_URL" ? { ...button, url: config.websiteUrl } : button
    )
  );

  async function handleMessage(message) {
    const chatId = message.chat.id;
    const text = message.text || "";

    if (text === "/start") {
      return sendMessage(token, chatId, config.welcomeMessage, {
        inline_keyboard: startButtons
      });
    }

    if (text.startsWith("/bc ") && adminId && chatId.toString() === adminId) {
      const pesanBc = text.replace("/bc ", "");
      return sendMessage(token, chatId, "📢 Pesan Broadcast dikirim: " + pesanBc);
    }

    return null;
  }

  async function handleCallback(callbackQuery) {
    const chatId = callbackQuery.message.chat.id;
    const data = callbackQuery.data;

    if (data === "list_kelas") {
      return sendMessage(token, chatId, classListMessage);
    }
    if (data === "cara_daftar") {
      return sendMessage(token, chatId, registrationMessage);
    }
    if (data === "hubungi_admin") {
      return sendMessage(token, chatId, `Silahkan chat @${config.adminUsername}.`);
    }

    return null;
  }

  return { handleMessage, handleCallback };
}
