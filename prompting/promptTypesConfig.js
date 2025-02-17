module.exports = {
    insertion: {
        base: [
            "### Instrucciones para la extensión de VS Code",
            "Estás trabajando en una extensión de VS Code orientada a la creación literaria. Tu respuesta debe ser únicamente texto natural, sin etiquetas, código ni explicaciones adicionales."
        ],
        getContext: (textBeforeCursor, textAfterCursor, readTextAfter) => {
            const sections = [
                "### Contexto del documento",
                "**Texto antes del cursor:**",
                "```markdown",
                textBeforeCursor,
                "```"
            ];
            if (readTextAfter && textAfterCursor) {
                sections.push(
                    "**Texto después del cursor (para contexto adicional y evitar redundancia):**",
                    "```markdown",
                    textAfterCursor,
                    "```"
                );
            }
            return sections;
        },
        getInstructions: (instructions, userInput) => {
            return [
                "### Instrucciones de escritura",
                userInput
                    ? `${instructions} siguiendo estas instrucciones del usuario:\n${userInput}\nRecuerda que debes escribir un texto literario, creativo y expresivo.`
                    : `${instructions}\nRecuerda que debes escribir un texto literario, creativo y expresivo.`
            ];
        },
        final: [
            "**Responde exclusivamente con texto en lenguaje natural y en estilo literario. No incluyas código ni estructuras técnicas.**"
        ],
        replaceText: false
    },
    edition: {
        base: [
            "### Instrucciones para la extensión de VS Code",
            "Estás trabajando en una extensión de VS Code orientada a la creación literaria. Tu tarea es editar el contenido existente manteniendo su estructura original. No elimines ni agregues información nueva. Solo corrige errores y mejora la claridad sin cambiar el estilo. Cada párrafo debe mantenerse en su propia línea sin reordenar nada. La respuesta debe ser únicamente texto natural, sin etiquetas, código ni explicaciones adicionales."
        ],
        getContext: (textBeforeCursor, textAfterCursor) => {
            return [
                "### Contexto del documento",
                "**Texto a editar:**",
                "```markdown",
                textBeforeCursor + (textAfterCursor || ""),
                "```"
            ];
        },
        getInstructions: (instructions, userInput) => {
            return [
                "### Instrucciones de edición",
                userInput
                    ? `${instructions} siguiendo estas instrucciones del usuario:\n${userInput}\n.`
                    : `${instructions}\n.`
            ];
        },
        final: [
            "**Responde exclusivamente con texto en lenguaje natural y en estilo literario. No incluyas código ni estructuras técnicas.**"
        ],
        replaceText: true
    },
    dialogue_improvement: {
        base: [
            "### Instrucciones para la extensión de VS Code",
            "Mejora los diálogos del texto para que suenen más naturales y reflejen mejor la personalidad de cada personaje. No alteres la trama ni agregues información nueva."
        ],
        getContext: (text) => [
            "### Contexto del diálogo",
            "```markdown",
            text,
            "```"
        ],
        getInstructions: (instructions, userInput) => [
            "### Instrucciones de mejora de diálogos",
            userInput ? `${instructions} Siguiendo esta indicación del usuario:\n${userInput}` : instructions
        ],
        final: ["**Devuelve únicamente el diálogo mejorado, sin explicaciones.**"],
        replaceText: true
    },
    style_shift: {
        base: [
            "### Instrucciones para la extensión de VS Code",
            "Transforma el estilo del texto según la petición del usuario, manteniendo su significado original."
        ],
        getContext: (text) => [
            "### Contexto del texto a modificar",
            "```markdown",
            text,
            "```"
        ],
        getInstructions: (instructions, userInput) => [
            "### Instrucciones de cambio de estilo",
            userInput ? `${instructions} Aplica este estilo:\n${userInput}` : instructions
        ],
        final: ["**Devuelve el texto transformado sin explicaciones adicionales.**"],
        replaceText: true
    },
    paraphrasing: {
        base: [
            "### Instrucciones para la extensión de VS Code",
            "Reescribe el texto con diferente redacción pero manteniendo el mismo significado."
        ],
        getContext: (text) => [
            "### Texto original",
            "```markdown",
            text,
            "```"
        ],
        getInstructions: (instructions, userInput) => [
            "### Instrucciones de paráfrasis",
            userInput ? `${instructions} Siguiendo esta indicación del usuario:\n${userInput}` : instructions
        ],
        final: ["**Devuelve la paráfrasis sin explicaciones adicionales.**"],
        replaceText: true
    },
    expansion: {
        base: [
            "### Instrucciones para la extensión de VS Code",
            "Expande el contenido añadiendo detalles y profundidad sin cambiar el tono ni la esencia del texto."
        ],
        getContext: (text) => [
            "### Texto original",
            "```markdown",
            text,
            "```"
        ],
        getInstructions: (instructions, userInput) => [
            "### Instrucciones de expansión",
            userInput ? `${instructions} Siguiendo esta indicación del usuario:\n${userInput}` : instructions
        ],
        final: ["**Devuelve el texto expandido sin explicaciones adicionales.**"],
        replaceText: true
    },
    summarization: {
        base: [
            "### Instrucciones para la extensión de VS Code",
            "Resume el texto sin perder su esencia ni cambiar el tono."
        ],
        getContext: (text) => [
            "### Texto original",
            "```markdown",
            text,
            "```"
        ],
        getInstructions: (instructions, userInput) => [
            "### Instrucciones de resumen",
            userInput ? `${instructions} Siguiendo esta indicación del usuario:\n${userInput}` : instructions
        ],
        final: ["**Devuelve el resumen sin explicaciones adicionales.**"],
        replaceText: true
    },
    proofreading: {
        base: [
            "### Instrucciones para la extensión de VS Code",
            "Revisa el texto en busca de errores gramaticales, ortográficos y de puntuación. Mejora la claridad sin cambiar el significado ni el estilo."
        ],
        getContext: (text) => [
            "### Texto a corregir",
            "```markdown",
            text,
            "```"
        ],
        getInstructions: (instructions, userInput) => [
            "### Instrucciones de corrección",
            userInput ? `${instructions} Siguiendo esta indicación del usuario:\n${userInput}` : instructions
        ],
        final: ["**Devuelve el texto corregido sin explicaciones adicionales.**"],
        replaceText: true
    }
};
