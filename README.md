# TakeNote APP!

This is a sample project that goes with a [blog post] to demonstrate how to include React
support to a Loopback app.

To generate this very basic project I've used the [Loopback] CLI. If you wanna look at the full
example with react included and all, you can go ahead and change to the `full-example` branch.

## Getting Started
Just clone this repo, install dependencies and then start the server:
```bash
$ git clone https://github.com/danazkari/take-note.git
$ cd take-note
$ npm install
$ npm start
```

For a guide to how to add React to this project, go read [the blogpost] I've written about it.

## Steps to generate the base of this project

In case you wanna do it yourself, here's how:

```bash
$ npm install -g loopback-cli
```

Once you've installed the CLI, let's generate the app:
```
$ lb take-note
? What's the name of your application? take-note
? Enter name of the directory to contain the project: take-note
? Which version of LoopBack would you like to use? 3.x (current)
? What kind of application do you have in mind? api-server (A LoopBack API server with local User auth)
```

After you've answered all of the questions, you just have to simply change directories into the project and now
you should be able to create the `note` model.

The CLI we've install will help with that, just answer the questions how I did below:
```
$ cd take-note
$ lb model note
? Enter the model name: note
? Select the datasource to attach note to: db (memory)
? Select model's base class PersistedModel
? Expose note via the REST API? Yes
? Custom plural form (used to build REST URL):
? Common model or server only? common
Let's add some note properties now.

Enter an empty property name when done.
? Property name: title
   invoke   loopback:property
? Property type: string
? Required? Yes
? Default value[leave blank for none]:

Let's add another note property.
Enter an empty property name when done.
? Property name: text
   invoke   loopback:property
? Property type: string
? Required? Yes
? Default value[leave blank for none]:

Let's add another note property.
Enter an empty property name when done.
? Property name:
```

And now, go to `server/datasources.json` and add a `file` key like so:
```json
{
  "db": {
    "name": "db",
    "connector": "memory",
    "file": "db.json"
  }
}
```
This is so you get a persistent DB that survives server restarts.

And now you're all set!

If you wanna continue with this sample project, go visit [the blogpost]
for a quick guide on adding React to this project!

[Loopback]: http://loopback.io
[the blogpost]: http://example.com/
