const vscode = require("vscode");
const { InstructionType } = require("../prompting/instructionTypes");
const instructionsModal = require("../prompting/instructionsModal");

const improveDialog = (context) =>
  vscode.commands.registerCommand("writeme.improveDialog", async function () {
    instructionsModal(
      "Mejora los diálogos del texto para que suenen más naturales y reflejen mejor la personalidad de cada personaje.",
      "",
      true,
      InstructionType.DialogueImprovement,
      {
        prompt: "Especificaciones para mejorar los diálogos (opcional).",
        placeHolder:
          "Por ejemplo: Haz que los diálogos sean más sarcásticos...",
      }
    );
  });

module.exports = improveDialog;