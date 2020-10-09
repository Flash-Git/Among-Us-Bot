# Among Us Discord Bot

This is the source code for a Discord bot that serves to help players play the Among Us crossplatform game.

In Among Us, it is common for all players to join a voice chat lobby together and individually mute themselves at the start of each round and unmute themselves at the end of each round so they can participate in the discussion.

Unfortunately, as with anything involving the collaboration of 7+ people, you cannot guarantee that every single person will always remember to follow those instructions.

## Commands

`mute` => Mutes every person in the current voice lobby.
`unmute` => Unmutes every person in the current voice lobby not marked as dead.
`dead` => Marks the person typing the command as dead so they won't be unmuted.
`dead "player name"` => Marks the person as dead so they won't be unmuted.
`reset` => Unmutes every person in the current voice lobby and unmarks people as dead.
