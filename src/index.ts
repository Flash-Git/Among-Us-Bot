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

const unmuteOne = (member: GuildMember) => {
  member.voice.setMute(false);
}


const client = new Client();

client.once("ready", () => {
  console.log("Bot Online!");
});

client.on("message", (msg: Message) => {
  const message = msg.content.toLowerCase();

  const date = new Date();
  const dateMsg = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`

  if (msg.member.voice === null) {
    console.error(dateMsg + " - Not in Voice!");
    return;
  }

  let command = false;


  switch (message) {
    case "mute":
      command = true;
      muteAll(msg);
      break;

    case "unmute":
      command = true;
      unmuteAll(msg);
      break;


    case "dead":
      command = true;
      msg.member.voice.setMute(true);
      if (deadList.includes(msg.member)) return;
      deadList.push(msg.member);
      break;

    case "reset":
      command = true;
      deadList.length = 0;
      unmuteAll(msg);
      break;

    default:
      break;
  }

  if (command) {
    msg.delete();
    console.log(dateMsg + " - " + msg.content);
    return;
  }

  const start = message.substring(0, message.indexOf(" "));

  let name = "";
  let mute;

  switch (start) {
    case "dead":
    case "mute":
      command = true;
      name = message.slice(5);
      mute = true;
      break;

    case "undead":
    case "unmute":
      command = true;
      name = message.slice(7);
      mute = false;
      break;

    default:
      break;
  }

  if (!command) return;

  const member = msg.member.voice.channel.members.find(member => member.displayName.toLowerCase() === name);
  if (member === undefined) return;

  if (mute === true) {
    if (deadList.includes(member)) return;
    muteOne(member);
    deadList.push(member);
  }
  if (mute === false) {
    if (!deadList.includes(member)) return;
    unmuteOne(member)
    deadList.splice(deadList.indexOf(member))
  }
  console.log(dateMsg + " - " + msg.content);
  msg.delete();
});

client.login(process.env.BOT_SECRET);

export default client;
