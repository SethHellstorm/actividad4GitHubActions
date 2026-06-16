/**
 * Formatea un precio en MXN
 * @param {number} amount
 * @returns {string}
 */
export function formatPrice(amount) {
  if (typeof amount !== 'number') throw new TypeError('amount debe ser un número');
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(amount);
}

/**
 * Valida un email básico
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Trunca un texto a N caracteres
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
export function truncate(text, maxLength = 100) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '…';
}
