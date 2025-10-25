import makeWASocket, { useMultiFileAuthState } from "@whiskeysockets/baileys"

const startBot = async () => {
  const { state, saveCreds } = await useMultiFileAuthState("session")
  const sock = makeWASocket({ auth: state })

  sock.ev.on("creds.update", saveCreds)

  sock.ev.on("messages.upsert", async (m) => {
    const msg = m.messages[0]
    if (!msg.message || msg.key.fromMe) return

    const text = msg.message.conversation || msg.message.extendedTextMessage?.text

    if (text?.toLowerCase() === "hai") {
      await sock.sendMessage(msg.key.remoteJid, { text: "Hai juga! 👋" })
    } else if (text?.toLowerCase() === "info") {
      await sock.sendMessage(msg.key.remoteJid, { text: "Ini adalah bot WhatsApp GitHub by Sapta!" })
    }
  })
}

startBot()
