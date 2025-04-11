const { Client, GatewayIntentBits, Partials, ChannelType } = require("discord.js");
const express = require("express");
require("dotenv").config();

// Set up Express to keep the bot online
const app = express();
const PORT = 3000;

app.get("/", (req, res) => res.send("🤖 GYLAX BOT is alive!"));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`🌐 Express server running on port ${PORT}`);
}).on('error', (err) => {
    console.error('Failed to start server:', err);
});

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
    ],
    partials: [Partials.Channel],
});

const inviteMessages = [
    "🔥 You're in, {user}! Tap the link and join the elite: https://discord.gg/QTDHgMfNGj",
    "👑 Welcome, {user}! Time to claim your throne: https://discord.gg/QTDHgMfNGj",
    "🚀 BOOM, {user}! Your portal awaits: https://discord.gg/QTDHgMfNGj",
    "⚡ Another legend joins us — let’s go {user}! https://discord.gg/QTDHgMfNGj",
    "🎯 Your invite is locked and loaded, {user}: https://discord.gg/QTDHgMfNGj",
];

client.once("ready", () => {
    console.log(`🤖 GYLAX INVITE BOT is online as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
    if (message.channel.type === ChannelType.DM && !message.author.bot) {
        const username = message.author.username;
        const msgTemplate = inviteMessages[Math.floor(Math.random() * inviteMessages.length)];
        const finalMsg = msgTemplate.replace("{user}", username);
        message.channel.send(finalMsg);
        console.log(`📩 Sent invite to ${message.author.tag}`);
    }
});

client.login(process.env.TOKEN);
