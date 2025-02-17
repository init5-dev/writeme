const promptTypesConfig = require("./promptTypesConfig");

function buildFullPromptString({ type, textBeforeCursor, textAfterCursor, readTextAfter, instructions, userInput, postInstructions }) {
  const config = promptTypesConfig[type];
  if (!config) {
    throw new Error(`Tipo de instrucción desconocido: ${type}`);
  }
  const fullPromptArray = [
    ...config.base,
    ...config.getContext(textBeforeCursor, textAfterCursor, readTextAfter),
    ...config.getInstructions(instructions, userInput),
    ...(postInstructions ? ["### Consideraciones finales", postInstructions] : []),
    ...config.final
  ];
  return fullPromptArray.filter(Boolean).join("\n\n");
}

module.exports = { buildFullPromptString };
