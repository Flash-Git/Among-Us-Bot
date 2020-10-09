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
  if (msg.content.toLowerCase() === "mute") {
    console.log("Muting...");

    muteAll(msg);
    msg.delete();
    return;
  }

  if (msg.content.toLowerCase() === "unmute") {
    console.log("Unmuting...");

    unmuteAll(msg);
    msg.delete();
    return;
  }

  if (msg.content.toLowerCase() === "dead") {
    console.log("Dead...");

    msg.member.voice.setMute(true);
    if (deadList.includes(msg.member)) return;
    deadList.push(msg.member);
    msg.delete();
    return;
  }

  if (msg.content.toLowerCase().startsWith("dead ")||msg.content.toLowerCase().startsWith("mute ")) {
    const name = msg.content.toLowerCase().slice(5);
    const member = msg.member.voice.channel.members.find(member => member.displayName.toLowerCase() === name);

    if (member === undefined) return;

    muteOne(member)

    if (deadList.includes(member)) return;

    console.log(msg.content);

    deadList.push(member);
    msg.delete();
    return;
  }

  if (msg.content.toLowerCase() === "reset") {
    console.log("Resetting...");

    deadList.length = 0;
    unmuteAll(msg);
    msg.delete();
    return;
  }
});

console.log("Starting...");

client.login(process.env.BOT_SECRET);

export default client;
