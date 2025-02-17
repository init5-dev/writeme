const vscode = require("vscode");
const { InstructionType } = require("../prompting/instructionTypes");
const instructionsModal = require("../prompting/instructionsModal");

const expand = (context) =>
  vscode.commands.registerCommand("writeme.expand", async function () {
    instructionsModal(
      "Expande el contenido añadiendo detalles y profundidad sin cambiar el tono ni la esencia del texto.",
      "",
      true,
      InstructionType.Expansion,
      {
        prompt: "Especificaciones para la expansión (opcional).",
        placeHolder:
          "Por ejemplo: Añade más descripciones sensoriales...",
      }
    );
  });

module.exports = expand;