# Contributing

## Things to contribute

- Bug fixes.
- New features.
- Support for new bots.

## How to contribute

1. Fork and clone the repository
2. Create your branch: `git checkout -b fix-my-bugfix`
3. Commit your changes: `git commit -m "Fix bug"`
4. Push to the branch: `git push origin fix-my-bugfix`
5. Submit a pull request.

## Adding other bots

Create a folder in src for the bot e.g. _src/discord_. This folder should **only** contain code specific to that bot, all core functions should go under _src/shared_.

## Adding commands for Slack

To add a command for Slack, add a new js file to _src/slack/commands_. The file should export a single object.

```JavaScript
module.exports = {
  name: "command-name",
  description: "Command description",
  usage: "",
  execute: requestBody => {
    // ...
  }
};
```

`usage` (optional) is used to give an example of how to use the command. It is required for commands that take arguments.  
`execute` should contain all the logic, including sending the message.

## Things to note

- Make sure you're code matches the [eslint config](./.eslintrc.json) and the general code style (imports, exports, bracket positions e.t.c).

- Any _core_ code, i.e. code in src/shared, should have jsdoc comments. Descriptions don't matter but types should be correct.

- If you are using [VS Code](https://code.visualstudio.com/), the settings in _.vscode_ will achieve the desired formatting.

- It'll be preferred if you create an issue before making a pull request.
