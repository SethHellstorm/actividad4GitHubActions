import { describe, it, expect } from 'vitest';
import { formatPrice, isValidEmail, truncate } from '../../src/utils.js';

// ─── formatPrice ────────────────────────────────────────────────────
describe('formatPrice', () => {
  it('formatea un número positivo en pesos mexicanos', () => {
    expect(formatPrice(1234.5)).toContain('1,234.50');
  });

  it('formatea cero correctamente', () => {
    expect(formatPrice(0)).toContain('0.00');
  });

  it('lanza error si el argumento no es número', () => {
    expect(() => formatPrice('abc')).toThrow(TypeError);
  });
});

// ─── isValidEmail ───────────────────────────────────────────────────
describe('isValidEmail', () => {
  it('acepta emails válidos', () => {
    expect(isValidEmail('usuario@ejemplo.com')).toBe(true);
    expect(isValidEmail('a.b+tag@sub.dominio.mx')).toBe(true);
  });

  it('rechaza emails inválidos', () => {
    expect(isValidEmail('sinArroba')).toBe(false);
    expect(isValidEmail('@sinusuario.com')).toBe(false);
    expect(isValidEmail('sindominio@')).toBe(false);
    expect(isValidEmail('')).toBe(false);
  });
});

// ─── truncate ───────────────────────────────────────────────────────
describe('truncate', () => {
  it('no trunca textos cortos', () => {
    expect(truncate('Hola', 10)).toBe('Hola');
  });

  it('trunca y añade elipsis cuando supera el límite', () => {
    const resultado = truncate('Texto muy largo que supera el límite', 10);
    expect(resultado.endsWith('…')).toBe(true);
    expect(resultado.length).toBeLessThanOrEqual(11); // 10 chars + '…'
  });

  it('usa 100 como límite por defecto', () => {
    const largo = 'a'.repeat(101);
    expect(truncate(largo).endsWith('…')).toBe(true);
  });
});
