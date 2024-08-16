const editorContainer = document.getElementById('editor-container');
const fontSelect = document.getElementById('font-select');
const colorSelect = document.getElementById('color-select');
const fontSizeSelect = document.getElementById('font-size-select');
const documentList = document.getElementById('document-list');
const deleteModal = document.getElementById('delete-modal');
const confirmDeleteButton = document.getElementById('confirm-delete');

let selectedDocumentName = null; 
const fonts = [
    'Arial', 'Times New Roman', 'Courier New', 'Georgia', 'Verdana', 'Trebuchet MS', 'Comic Sans MS', 'Impact'
];
fonts.forEach((font) => {
    const option = document.createElement('option');
    option.value = font;
    option.text = font;
    fontSelect.add(option);
});

const colors = [
    'Black', 'Red', 'Green', 'Blue', 'Purple', 'Orange', 'Brown'
];
colors.forEach((color) => {
    const option = document.createElement('option');
    option.value = color;
    option.text = color;
    colorSelect.add(option);
});

const fontSizes = ['8pt', '10pt', '12pt', '14pt', '16pt', '18pt', '20pt', '24pt', '36pt'];
fontSizes.forEach((size) => {
    const option = document.createElement('option');
    option.value = size;
    option.text = size;
    fontSizeSelect.add(option);
});

fontSelect.addEventListener('change', () => {
    const selectedFont = fontSelect.value;
    if (selectedFont) {
        document.execCommand('fontName', false, selectedFont);
    }
});

colorSelect.addEventListener('change', () => {
    const selectedColor = colorSelect.value;
    if (selectedColor) {
        editorContainer.focus();
        document.execCommand('foreColor', false, selectedColor);
    }
});

fontSizeSelect.addEventListener('change', () => {
    const selectedSize = fontSizeSelect.value;
    if (selectedSize) {
        document.execCommand('fontSize', false, selectedSize);
    }
});

function toggleBold() {
    document.execCommand('bold', false, null);
}

function toggleItalic() {
    document.execCommand('italic', false, null);
}

function resetText() {
    editorContainer.innerHTML = '';
}

function saveText() {
    const documentName = prompt('Enter a name for the document:');
    if (documentName) {
        const documentItem = document.createElement('li');
        const documentButton = document.createElement('button');
        documentButton.textContent = documentName;
        documentButton.addEventListener('click', () => loadDocument(documentName));
        documentItem.appendChild(documentButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => showDeleteOptions(documentName, documentItem));
        documentItem.appendChild(deleteButton);

        documentList.appendChild(documentItem);

        const documentContent = editorContainer.innerHTML;
        localStorage.setItem(documentName, documentContent);
    }
}

function loadDocument(documentName) {
    const documentContent = localStorage.getItem(documentName);
    if (documentContent) {
        editorContainer.innerHTML = documentContent;
    }
}

function showDeleteOptions(documentName, documentItem) {
    selectedDocumentName = documentName;
    deleteModal.style.display = 'block';
}

function hideDeleteOptions() {
    selectedDocumentName = null;
    deleteModal.style.display = 'none';
}

function deleteDocument() {
    if (selectedDocumentName) {
        localStorage.removeItem(selectedDocumentName);
        const documentItem = Array.from(documentList.children).find(
            (item) => item.querySelector('button').textContent === selectedDocumentName
        );
        if (documentItem) {
            documentList.removeChild(documentItem);
        }
        selectedDocumentName = null;
        deleteModal.style.display = 'none';
    }
}

for (let i = 0; i < localStorage.length; i++) {
    const documentName = localStorage.key(i);
    const documentItem = document.createElement('li');
    const documentButton = document.createElement('button');
    documentButton.textContent = documentName;
    documentButton.addEventListener('click', () => loadDocument(documentName));
    documentItem.appendChild(documentButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => showDeleteOptions(documentName, documentItem));
    documentItem.appendChild(deleteButton);

    documentList.appendChild(documentItem);
}