// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");

// Commands
const insertText = require("./commands/insertText");
const editText = require("./commands/editText");
const improveDialog = require("./commands/improveDialog");
const shiftStyle = require("./commands/shiftStyle");
const paraphrase = require("./commands/paraphrase");
const expand = require("./commands/expand");

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "writeme" is now active!');

  // Register commands
  context.subscriptions.push(insertText(context));
  context.subscriptions.push(editText(context));
  context.subscriptions.push(improveDialog(context));
  context.subscriptions.push(shiftStyle(context));
  context.subscriptions.push(paraphrase(context));
  context.subscriptions.push(expand(context));
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};