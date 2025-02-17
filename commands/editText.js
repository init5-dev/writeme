const vscode = require("vscode");
const { InstructionType } = require("../prompting/instructionTypes");
const instructionsModal = require("../prompting/instructionsModal");

const editText = (context) =>
  vscode.commands.registerCommand("writeme.editText", async function () {
    instructionsModal(
      "Edita el texto realizando correcciones gramaticales, ortográficas y de estilo sin cambiar significativamente su contenido.",
      "",
      true,
      InstructionType.Edition,
      {
        prompt: "Especificaciones de edición (opcional).",
        placeHolder:
          "Por ejemplo: Corrige errores gramaticales y mejora la claridad...",
      }
    );
  });

module.exports = editText;