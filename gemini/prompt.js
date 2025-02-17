const { GoogleGenerativeAI } = require("@google/generative-ai");
const vscode = require("vscode");

const systemInstructions = "Eres mi asistente de escritura.";

const prompt = async (promptText, modelName = "gemini-2.0-flash") => {
  const config = vscode.workspace.getConfiguration("writeme");
  const key = config.get("apiKey", "");

  // Verificar si la API key es válida
  if (!key) {
    vscode.window.showErrorMessage(
      "API key no válida. Por favor, configúrela correctamente."
    );
    return;
  }

  try {
    const genAI = new GoogleGenerativeAI(key);
    const model = genAI.getGenerativeModel({ model: modelName });

    const result = await model.generateContent(promptText, {
      temperature: 0.5, // Menor valor = menor aleatoriedad
      topP: 0.9,
    });
    return result.response.text();
  } catch (error) {
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
      vscode.window.showErrorMessage(
        `Error: ${error.response.status} - ${error.response.data.error.message}`
      );
    } else if (error.request) {
      console.error("Request data:", error.request);
      vscode.window.showErrorMessage("No response received from the server.");
    } else {
      console.error("Error message:", error.message);
      vscode.window.showErrorMessage(`Error: ${error.message}`);
    }
  }
};

module.exports = prompt;
