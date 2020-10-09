import { Client, GuildMember, Message } from "discord.js";

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const deadList = [];

const muteAll = (msg: Message) => {
  msg.member.voice.channel.members.map(member => member.voice.setMute(true));
}

const unmuteAll = (msg: Message) => {
  msg.member.voice.channel.members.map(
    member => !deadList.includes(member) && member.voice.setMute(false)
  );
};

const muteOne = (member: GuildMember) => {
  member.voice.setMute(true);
}

const client = new Client();

client.once("ready", () => {
  console.log("Bot Online!");
});

client.on("message", (msg: Message) => {
  const message = msg.content.toLowerCase();

  const date = new Date();
  const dateMsg = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`

  switch (message) {
    case "mute":
      console.log(dateMsg + " - Muting...");
      muteAll(msg);
      msg.delete();
      return;

    case "unmute":
      console.log(dateMsg + " - Unmuting...");
      unmuteAll(msg);
      msg.delete();
      return;

    case "dead":
      console.log(dateMsg + " - Dead...");
      msg.member.voice.setMute(true);
      if (deadList.includes(msg.member)) return;
      deadList.push(msg.member);
      msg.delete();
      return;

    case "reset":
      console.log(dateMsg + " - Resetting...");
      deadList.length = 0;
      unmuteAll(msg);
      msg.delete();
      return;

    default:
      break;
  }

  if (message.startsWith("dead ") || message.startsWith("mute ")) {
    const name = message.slice(5);
    const member = msg.member.voice.channel.members.find(member => member.displayName.toLowerCase() === name);

    if (member === undefined) return;

    muteOne(member)

    if (deadList.includes(member)) return;

    console.log(dateMsg + " - " + msg.content);

    deadList.push(member);
    msg.delete();
    return;
  }
});

// console.log("Starting...");

client.login(process.env.BOT_SECRET);

export default client;
