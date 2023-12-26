const fontFamilySelect = document.getElementById('font-family');
const fontSizeInput = document.getElementById('font-size');
const fontColorInput = document.getElementById('font-color');
const addTextButton = document.getElementById('add-text');
const undoButton = document.getElementById('undo');
const redoButton = document.getElementById('redo');
const textArea = document.getElementById('text-area');

fontFamilySelect.addEventListener('change', updateTextStyle);
fontSizeInput.addEventListener('input', updateTextStyle);
fontColorInput.addEventListener('input', updateTextStyle);
addTextButton.addEventListener('click', addNewText);
undoButton.addEventListener('click', undoAction);
redoButton.addEventListener('click', redoAction);

let stateHistory = [];
let currentStateIndex = -1;

textArea.addEventListener('input', function () {
    saveState();
});

function updateTextStyle() {
    const fontFamily = fontFamilySelect.value;
    const fontSize = fontSizeInput.value + 'px'; // Convert to a string with 'px'
    const fontColor = fontColorInput.value;

    textArea.style.fontFamily = fontFamily;
    textArea.style.fontSize = fontSize;
    textArea.style.color = fontColor;
}

function addNewText() {
    const newText = 'New Added Text';
    document.execCommand('insertText', false, newText);
}

function saveState() {
    const currentState = {
        fontFamily: textArea.style.fontFamily,
        fontSize: textArea.style.fontSize,
        fontColor: textArea.style.color,
        content: textArea.innerHTML,
    };

    // Discard the redo history when making a new change
    stateHistory = stateHistory.slice(0, currentStateIndex + 1);

    stateHistory.push(currentState);
    currentStateIndex++;
}

function undoAction() {
    if (currentStateIndex > 0) {
        currentStateIndex--;
        applyState();
    }
}

function redoAction() {
    if (currentStateIndex < stateHistory.length - 1) {
        currentStateIndex++;
        applyState();
    }
}

function applyState() {
    const state = stateHistory[currentStateIndex];

    fontFamilySelect.value = state.fontFamily;
    fontSizeInput.value = parseInt(state.fontSize, 10);
    fontColorInput.value = state.fontColor;
    textArea.innerHTML = state.content;

    updateTextStyle();
}
