const Discord = require("discord.js");

const client = new Discord.Client();

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

client.once("ready", () => {
  console.log("Bot Online!");
});

let deadList = [];

const unmute = msg => {
  const voiceChannel = msg.member.voice.channel;
  voiceChannel.members.map(
    member => !deadList.includes(member) && member.voice.setMute(false)
  );
};

client.on("message", msg => {
  if (msg.content.toLowerCase() === "mute") {
    console.log("Muting...");

    const voiceChannel = msg.member.voice.channel;
    voiceChannel.members.map(member => member.voice.setMute(true));
    msg.delete();
  }

  if (msg.content.toLowerCase() === "unmute") {
    console.log("Unmuting...");

    unmute(msg);
    msg.delete();
  }

  if (msg.content.toLowerCase() === "dead") {
    console.log("Dead...");

    msg.member.voice.setMute(true);
    if (deadList.includes(msg.member)) return;
    deadList.push(msg.member);
    msg.delete();
  }

  if (msg.content.toLowerCase() === "reset") {
    console.log("Resetting...");

    deadList = [];
    unmute(msg);
    msg.delete();
  }
});

console.log("Forced Delay");

client.login(process.env.BOT_SECRET);
