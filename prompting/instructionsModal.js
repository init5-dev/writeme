const vscode = require("vscode");
const { InstructionType } = require("./instructionTypes");
const prompt = require("../gemini/prompt");
const { buildFullPromptString } = require("./promptBuilder");
const promptTypesConfig = require("./promptTypesConfig");

async function instructionsModal(
  instructions,
  postInstructions,
  readTextAfter = false,
  type = InstructionType.Insertion,
  inputBoxConfig = {}
) {
  const activeEditor = vscode.window.activeTextEditor;
  if (!activeEditor) {
    vscode.window.showErrorMessage("No hay un editor activo.");
    return;
  }

  // Obtener la configuración del usuario
  const config = vscode.workspace.getConfiguration("writeme");
  const defaultInstructions = {
    insertText: config.get("insertText", ""),
    improveDialogue: config.get("improveDialogue", ""),
    expand: config.get("expand", ""),
    editText: config.get("editText", ""),
    paraphrase: config.get("paraphrase", ""),
    shiftStyle: config.get("shiftStyle", ""),
  };

  // Determinar las instrucciones predeterminadas según el tipo de instrucción
  let defaultInstructionValue = "";
  switch (type) {
    case InstructionType.Insertion:
      defaultInstructionValue = defaultInstructions.insertText;
      break;
    case InstructionType.DialogueImprovement:
      defaultInstructionValue = defaultInstructions.improveDialogue;
      break;
    case InstructionType.Expansion:
      defaultInstructionValue = defaultInstructions.expand;
      break;
    case InstructionType.Edition:
      defaultInstructionValue = defaultInstructions.editText;
      break;
    case InstructionType.Paraphrasing:
      defaultInstructionValue = defaultInstructions.paraphrase;
      break;
    case InstructionType.StyleShift:
      defaultInstructionValue = defaultInstructions.shiftStyle;
      break;
    default:
      defaultInstructionValue = "";
  }

  // Solicitar al usuario las instrucciones adicionales
  const userInput = await vscode.window.showInputBox({
    prompt: inputBoxConfig?.prompt || "¡Dale instrucciones a Gemini!",
    placeHolder:
      inputBoxConfig?.placeHolder || "Por ejemplo: Resume el texto anterior...",
    value: defaultInstructionValue, // Usar las instrucciones predeterminadas del usuario
  });

  if (userInput === undefined) {
    vscode.window.showWarningMessage("No se ingresó ningún prompt.");
    return;
  }

  // Obtener la posición actual del cursor, la selección y los textos del documento
  const selection = activeEditor.selection;
  const document = activeEditor.document;
  const fullText = document.getText();
  const textBeforeCursor = document.getText(
    new vscode.Range(new vscode.Position(0, 0), selection.start)
  );
  const textAfterCursor = readTextAfter
    ? document.getText(
        new vscode.Range(selection.end, document.positionAt(fullText.length))
      )
    : null;

  // Determinar el modo de inserción/reemplazo
  let insertionMode;
  if (!selection.isEmpty) {
    insertionMode = "selection"; // Modo: trabajar con el texto seleccionado
  } else {
    insertionMode = "cursor"; // Modo: trabajar con el texto hasta el cursor
  }

  // Construir el prompt completo
  const fullPromptString = buildFullPromptString({
    type,
    textBeforeCursor,
    textAfterCursor,
    readTextAfter,
    instructions,
    userInput,
    postInstructions,
  });
  console.log(`FULL PROMPT STRING:\n\n${fullPromptString}\n\n`);

  // Mostrar notificación de progreso
  await vscode.window.withProgress(
    {
      location: vscode.ProgressLocation.Notification,
      title: "Procesando instrucciones...",
      cancellable: false,
    },
    async () => {
      // Llamar a la API
      const response = await prompt(fullPromptString);
      if (response) {
        await activeEditor.edit((editBuilder) => {
          const config = promptTypesConfig[type];
          if (insertionMode === "selection") {
            // Modo: trabajar con el texto seleccionado
            editBuilder.replace(selection, response);
          } else if (insertionMode === "cursor") {
            // Modo: trabajar con el texto hasta el cursor
            if (config.replaceText) {
              const rangeToReplace = new vscode.Range(
                new vscode.Position(0, 0),
                selection.start
              );
              editBuilder.delete(rangeToReplace);
              editBuilder.insert(new vscode.Position(0, 0), response);
            } else {
              editBuilder.insert(selection.active, response);
            }
          }
        });
      }
    }
  );
}

module.exports = instructionsModal;