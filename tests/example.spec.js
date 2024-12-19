// @ts-check
const { test } = require('@playwright/test');
const path = require('path');
const fs = require('fs');
const os = require('os');
const screenshot = require('screenshot-desktop'); // Asegúrate de instalar: npm install screenshot-desktop

test('Captura inicio de sesión', async ({ browser }) => {
  const documentsPath = path.join(os.homedir(), 'Documents');
  const screenshotsDir = path.join(documentsPath, 'imagenplaywright');

  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
  }

  const context = await browser.newContext();
  const page = await context.newPage();

  // Establecer el tamaño del viewport (importante para la posición de la ventana)
  await page.setViewportSize({ width: 1500, height: 720 }); // Ajusta según necesites

  await page.goto('https://labco.guru-soft.com/eDocColombia/emisor/Login.aspx');
  await page.waitForLoadState('networkidle');

  // Esperar un tiempo para que la ventana se posicione (puede ser necesario en algunos entornos)
  await page.waitForTimeout(2000);


  await page.fill('#TxtUsuaLogin', 'ADMIN');
  await page.fill('#TxtPassLogin', 'Guru$0f7*!_**...PRUEB');
  await page.fill('#TxtRucCompania', '901014886');
  await page.waitForTimeout(500);

  // Toma captura una vez ingresa los datos
  try {
    const imagePath = path.join(screenshotsDir, 'Datos-Inicio-Sesion.png');
    await screenshot({ filename: imagePath });
    console.log(`Captura con URL (después de usuario) guardada en: ${imagePath}`);
  } catch (err) {
    console.error('Error al capturar la pantalla: ', err);
  }

  // Espera 5 segundos para la resolución manual del CAPTCHA
  console.log('Espera 8 segundos. Resuelve el CAPTCHA manualmente...');
  await page.waitForTimeout(8000); // Espera 8000 milisegundos (8 segundos)

  // Localiza y hace clic en el botón de inicio de sesión.
    // **IMPORTANTE:** Inspecciona el código HTML para obtener el selector correcto del botón.
  await page.click('#btnlogin'); // Reemplaza #botonIniciarSesion con el selector real

  await page.getByText("Comprobantes").click();
  await page.getByText("Factura Venta").click();

   // Toma captura una vez ingresa los datos
   try {
    const imagePath = path.join(screenshotsDir, 'Modulo-Factura.png');
    await screenshot({ filename: imagePath });
    console.log(`Captura con URL (después de usuario) guardada en: ${imagePath}`);
  } catch (err) {
    console.error('Error al capturar la pantalla: ', err);
  }


  await context.close();
});

