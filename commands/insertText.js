const vscode = require("vscode");
const {InstructionType} = require("../prompting/instructionTypes");
const instructionsModal = require("../prompting/instructionsModal");

const insertText = (context) =>
  vscode.commands.registerCommand("writeme.insertText", async function () {
    try {
      instructionsModal(
        "Continúa el texto",
        "Dame únicamente el texto que generes, sin la parte de texto anterior, ya que lo quiero para insertarlo manualmente; además, me lo debes devolver en texto plano",
        true,
        InstructionType.Insertion,
        {
          prompt: "Especificaciones de escritura (opcional).",
          placeHolder: "Por ejemplo: Estilo cínico y oscuro...",
        }
      );
    } catch (error) {
      console.error(error)
    }
  });

module.exports = insertText;
