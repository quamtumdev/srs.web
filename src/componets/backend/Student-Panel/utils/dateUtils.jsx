// utils/dateUtils.js - Date formatting utilities for SRS Educares

/**
 * Format date to Indian format (DD/MM/YY)
 * @param {string|Date} dateInput - Date string or Date object
 * @returns {string} Formatted date in DD/MM/YY format
 */
export const formatToIndianDate = dateInput => {
  if (!dateInput) return "N/A";

  try {
    const date = new Date(dateInput);

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2); // Last 2 digits

    return `${day}/${month}/${year}`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateInput; // Return original if formatting fails
  }
};

/**
 * Format date to full Indian format (DD/MM/YYYY)
 * @param {string|Date} dateInput - Date string or Date object
 * @returns {string} Formatted date in DD/MM/YYYY format
 */
export const formatToFullIndianDate = dateInput => {
  if (!dateInput) return "N/A";

  try {
    const date = new Date(dateInput);

    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateInput;
  }
};

/**
 * Format date with time for detailed views
 * @param {string|Date} dateInput - Date string or Date object
 * @returns {string} Formatted date with time in DD/MM/YY, HH:MM format
 */
export const formatDateWithTime = dateInput => {
  if (!dateInput) return "N/A";

  try {
    const date = new Date(dateInput);

    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year}, ${hours}:${minutes}`;
  } catch (error) {
    console.error("Error formatting date with time:", error);
    return dateInput;
  }
};

/**
 * Get relative time (e.g., "2 days ago", "1 week ago")
 * @param {string|Date} dateInput - Date string or Date object
 * @returns {string} Relative time string
 */
export const getRelativeTime = dateInput => {
  if (!dateInput) return "N/A";

  try {
    const date = new Date(dateInput);
    const now = new Date();

    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    const diffInMs = now - date;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
      if (diffInHours === 0) {
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        return diffInMinutes <= 1 ? "Just now" : `${diffInMinutes} minutes ago`;
      }
      return diffInHours === 1 ? "1 hour ago" : `${diffInHours} hours ago`;
    } else if (diffInDays === 1) {
      return "Yesterday";
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7);
      return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
    } else {
      return formatToIndianDate(date);
    }
  } catch (error) {
    console.error("Error getting relative time:", error);
    return formatToIndianDate(dateInput);
  }
};

/**
 * Format date for form inputs (YYYY-MM-DD)
 * @param {string|Date} dateInput - Date string or Date object
 * @returns {string} Formatted date for HTML input fields
 */
export const formatForInput = dateInput => {
  if (!dateInput) return "";

  try {
    const date = new Date(dateInput);

    if (isNaN(date.getTime())) {
      return "";
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  } catch (error) {
    console.error("Error formatting date for input:", error);
    return "";
  }
};
