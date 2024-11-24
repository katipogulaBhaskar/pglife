/**
 * Show an error alert
 * @param {string} message - The error message to display
 */
export const showErrorAlert = (message) => {
    alert(message);
};

/**
 * Redirect the user to a specific page
 * @param {string} pageUrl - The URL of the page to redirect to
 */
export const redirectToPage = (pageUrl) => {
    window.location.href = pageUrl;
};
