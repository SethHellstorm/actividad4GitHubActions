import { test, expect } from '@playwright/test';

test.describe('Página principal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('muestra el título correcto', async ({ page }) => {
    await expect(page).toHaveTitle(/Mi Página Web/);
  });

  test('muestra el header con el nombre del sitio', async ({ page }) => {
    await expect(page.locator('header h1')).toHaveText('Mi Página Web');
  });

  test('tiene los enlaces de navegación', async ({ page }) => {
    const nav = page.locator('nav');
    await expect(nav.locator('a', { hasText: 'Inicio' })).toBeVisible();
    await expect(nav.locator('a', { hasText: 'Contacto' })).toBeVisible();
  });
});

test.describe('Formulario de contacto', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#contacto');
  });

  test('muestra mensaje de éxito con datos válidos', async ({ page }) => {
    await page.fill('#nombre', 'Ana García');
    await page.fill('#email', 'ana@ejemplo.com');
    await page.click('button[type="submit"]');

    const msg = page.locator('#mensaje');
    await expect(msg).toBeVisible();
    await expect(msg).toHaveClass(/exito/);
    await expect(msg).toContainText('Ana García');
    await expect(msg).toContainText('ana@ejemplo.com');
  });

  test('muestra error si el email es inválido', async ({ page }) => {
    await page.fill('#nombre', 'Luis');
    await page.fill('#email', 'no-es-un-email');
    await page.click('button[type="submit"]');

    const msg = page.locator('#mensaje');
    await expect(msg).toHaveClass(/error/);
  });

  test('muestra error si faltan campos', async ({ page }) => {
    await page.click('button[type="submit"]');

    const msg = page.locator('#mensaje');
    await expect(msg).toHaveClass(/error/);
  });

  test('limpia el formulario tras envío exitoso', async ({ page }) => {
    await page.fill('#nombre', 'Pedro');
    await page.fill('#email', 'pedro@mail.com');
    await page.click('button[type="submit"]');

    await expect(page.locator('#nombre')).toHaveValue('');
    await expect(page.locator('#email')).toHaveValue('');
  });
});
