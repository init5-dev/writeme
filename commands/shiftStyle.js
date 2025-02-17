const vscode = require("vscode");
const { InstructionType } = require("../prompting/instructionTypes");
const instructionsModal = require("../prompting/instructionsModal");

const shiftStyle = (context) =>
  vscode.commands.registerCommand("writeme.shiftStyle", async function () {
    instructionsModal(
      "Transforma el estilo del texto según la petición del usuario, manteniendo su significado original.",
      "",
      true,
      InstructionType.StyleShift,
      {
        prompt: "Especifica el nuevo estilo deseado.",
        placeHolder:
          "Por ejemplo: Cambia el estilo a un tono más formal...",
      }
    );
  });

module.exports = shiftStyle;