# VSC Open in Application

<p align="center">
	<img src="https://raw.githubusercontent.com/fabiospampinato/vscode-open-in-application/master/resources/logo-128x128.png" alt="Logo">
</p>

Open an arbitrary file in its default app, or the app you want.

This is customizable: you can provide a custom app for each extension, or even multiple apps for an extension and then manually pick the one to use.

## Install

Run the following in the command palette:

```shell
ext install vscode-open-in-application
```

## Usage

It adds 1 command to the command palette:

```js
'Open in Application' // Open the current file in its default app, or the app you want
```

You can also reach this command with a right click in the explorer.

## Settings

```js
{
  "openInApplication.applications": {} // Map between extensions and applications
}
```

The actual application's name to use is OS-dependant, for instance if you want to open Firefox under Ubuntu you have to use "firefox" (lowercase) in your settings. We use the [open](https://www.npmjs.com/package/open) utility under the hood, everything that works with it will work here.

Example settings for custom application:

```js
{
  "openInApplication.applications": {
    "html": "Firefox" // Always use Firefox for opening html files
  }
}
```

Example settings for custom applications:

```js
{
  "openInApplication.applications": {
    "html": ["Google Chrome", "Firefox"] // Ask which application to use when opening html files
  }
}
```

## Demo

![Demo](resources/demo.gif)

## License

MIT © Fabio Spampinato
