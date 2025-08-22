// index.js

// --- Reusable Utilities ---
/**
 * Creates a new DOM element with specified tag name, attributes, and content.
 * @param {string} tagName - The tag name of the element to create (e.g., 'div', 'p').
 * @param {object} [attributes={}] - An object containing key-value pairs for attributes.
 * @param {string} [content=''] - The text content of the element.
 * @returns {HTMLElement} The newly created DOM element.
 */
function createElement(tagName, attributes = {}, content = '') {
    const element = document.createElement(tagName);

    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }

    element.textContent = content;

    return element;
}

// --- DOM Manipulation Functions ---
/**
 * Adds a new element as a child to a specified parent element.
 * @param {string} parentId - The ID of the parent element.
 * @param {string} content - The text content for the new paragraph.
 */
function addElementToDOM(parentId, content) {
    const parent = document.getElementById(parentId);
    if (!parent) {
        handleError(`Parent element with ID "${parentId}" not found.`, 'dom');
        return;
    }
    const newElement = createElement('p', { class: 'dynamic-item' }, content);
    parent.appendChild(newElement);
}

/**
 * Removes a specified element from the DOM.
 * @param {string} elementId - The ID of the element to remove.
 */
function removeElementFromDOM(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.remove();
    } else {
        handleError(`Element with ID "${elementId}" not found for removal.`, 'dom');
    }
}

// --- Error Handling ---
/**
 * Displays an error message in the DOM.
 * @param {string} message - The error message to display.
 * @param {string} type - The type of error (e.g., 'input', 'dom').
 */
function handleError(message, type = 'general') {
    const errorMessageDiv = document.getElementById('error-message');
    if (errorMessageDiv) {
        errorMessageDiv.textContent = message; // Test expects just the message, not the type prefix
        errorMessageDiv.classList.remove('hidden');
    } else {
        console.error(`Error (${type}): ${message}`);
    }
}

/**
 * Clears the displayed error message.
 */
function clearError() {
    const errorMessageDiv = document.getElementById('error-message');
    if (errorMessageDiv) {
        errorMessageDiv.textContent = '';
        errorMessageDiv.classList.add('hidden');
    }
}

// --- User Interaction Simulation Functions (for testing) ---
/**
 * Simulates a button click and updates the DOM.
 * @param {string} targetElementId - The ID of the element to update.
 * @param {string} content - The content to add to the target element.
 */
function simulateClick(targetElementId, content) {
    clearError();
    addElementToDOM(targetElementId, content);
}

/**
 * Handles form submission, updates the DOM, and displays errors.
 * @param {string} formId - The ID of the form element.
 * @param {string} targetElementId - The ID of the element to update with form data.
 */
function handleFormSubmit(formId, targetElementId) {
    clearError();
    const form = document.getElementById(formId);
    const userInput = form.querySelector('#user-input'); // Access input within the form

    const inputText = userInput.value.trim();

    if (inputText === '') {
        handleError('Input cannot be empty', 'input');
        return;
    }

    const dynamicContentDiv = document.getElementById(targetElementId);
    const newDiv = createElement('div', { class: 'user-data' }, `User entered: ${inputText}`);
    dynamicContentDiv.appendChild(newDiv);
    userInput.value = '';
}

// Export functions for Jest testing
module.exports = {
    addElementToDOM,
    removeElementFromDOM,
    simulateClick,
    handleFormSubmit,
    // You might also want to export other utility functions if needed for advanced testing
    createElement,
    handleError,
    clearError,
};

// --- Initial Setup (for actual page load, not for Jest tests) ---
// This code will only run in a browser environment, not when Jest imports the module.
if (typeof window !== 'undefined') { // Ensure this only runs in the browser
    document.addEventListener('DOMContentLoaded', () => {
        const simulateClickButton = document.getElementById('simulate-click');
        const userForm = document.getElementById('user-form');
        const dynamicContentDiv = document.getElementById('dynamic-content');

        if (simulateClickButton) { // Check if the element exists before adding listener
            simulateClickButton.addEventListener('click', function() {
                // We're reusing the 'simulateClick' function from above.
                // In a real application, you might have more specific logic here.
                simulateClick('dynamic-content', 'Button Clicked!');
            });
        }

        if (userForm) { // Check if the element exists before adding listener
            userForm.addEventListener('submit', function(event) {
                event.preventDefault();
                // We're reusing the 'handleFormSubmit' function from above.
                handleFormSubmit('user-form', 'dynamic-content');
            });
        }
    });
}