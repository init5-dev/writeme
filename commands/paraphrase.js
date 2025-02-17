const vscode = require("vscode");
const { InstructionType } = require("../prompting/instructionTypes");
const instructionsModal = require("../prompting/instructionsModal");

const paraphrase = (context) =>
  vscode.commands.registerCommand("writeme.paraphrase", async function () {
    instructionsModal(
      "Reescribe el texto con diferente redacción pero manteniendo el mismo significado.",
      "",
      true,
      InstructionType.Paraphrasing,
      {
        prompt: "Especificaciones para la paráfrasis (opcional).",
        placeHolder:
          "Por ejemplo: Usa un lenguaje más sencillo...",
      }
    );
  });

module.exports = paraphrase;