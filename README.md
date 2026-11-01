# André · Jacked & Tan 2.0

Aplicación estática en español para registrar **Jacked & Tan 2.0**, de Cody Lefever (GZCL), con navegación, superficies oscuras y colores por tier inspirados en Brute. Proyecto independiente: no contiene las marcas, el historial, las notas personales ni el despliegue de Brute.

## Fuente y alcance

Fuente de prescripciones: la hoja **J&T2.0 KGS** del [compendio compartido por Alejandro](https://docs.google.com/spreadsheets/d/14ke22ZVdepbuSPrOI2ssNbxll9T8utr4co7OVv9W6oI/edit), exportada el 1 de noviembre de 2026. La identidad y SHA-256 de la exportación están en `source/jt-kgs-cells.json`. [Artículo original de Cody Lefever](https://swoleateveryheight.blogspot.com/2016/07/jacked-tan-20.html).

La app transcribe las **12 semanas y los cuatro días programados**: 307 prescripciones de ejercicio, 60 fórmulas de carga con controles contra los resultados guardados del Excel, objetivos RM/MRS y descansos. El quinto día del archivo no tiene programa y no se inventa una sesión.

Se conservan las particularidades de esta hoja: sentadilla frontal como T1 del día 3 en bloque 1 y peso muerto en bloque 2; TM de sentadilla frontal propio; Sling Shot Bench adicional del día 4 y sus MRS variables; T2a del día 4 en 4×10 durante las semanas 1–5; press militar al 77,5% en semana 4; T3 de semana 6 y descansos por tier de semanas 7, 11 y 12. Las celdas sin ejercicio ni carga se omiten; los avisos de descanso quedan en las notas de la sesión.

El artículo y la hoja no son idénticos. La hoja compartida gobierna las prescripciones de esta app, incluidas sus excepciones. La última línea del archivo dice “T1: 60–90 Seconds”; la guía señala la etiqueta literal y aclara que el artículo asigna ese descanso a T3. El texto decorativo “T3 Variety Option” no crea un ejercicio. No se corrigen silenciosamente las irregularidades del archivo.

## Qué calcula

- **TM:** campo editable independiente; la hoja lo define como una **2RM diaria estimada**, no una 1RM real. Los TM de los dos bloques son independientes.
- **PR / 1RM real:** dato informativo, vacío al inicio. No se convierte automáticamente en TM.
- **1RM estimada:** dato informativo separado. La calculadora Epley admite series de 1–10 repeticiones y no escribe al TM.
- **RM diario:** lo ingresa André en cada sesión. Los backoffs T1 de semanas 7–11 usan 85% o 90% de ese RM. Un PR guardado no sustituye el RM del día.
- **T2b/c y T3:** encuentran el RM indicado y realizan las MRS adicionales con el mismo peso. Las cargas se registran, no se deducen de un PR.
- **Redondeo:** múltiplo más cercano; 2,5 kg como en el Excel, configurable a 0,5/1/1,25/2,5/5 kg. Un TM ausente produce “Sin definir”, no cero.

André escribe sus propios pesos. Los TM reales parten vacíos. El ejemplo opcional usa valores sintéticos, avisa antes de cargarlos, marca su fuente como ficticia y requiere Guardar marcas. No está vinculado a ninguna persona ni se presenta como una recomendación de carga.

## Uso

1. Abrir **Mis marcas** e ingresar los TM conocidos. Dejar vacías las marcas desconocidas; el programa se puede explorar sin ellas. Puede partir de series recientes cómodas, sin necesidad de probar un PR al comenzar.
2. Seleccionar semana y día. Registrar pesos y repeticiones con los selectores de rueda o la entrada directa. Deslizar no guarda hasta confirmar; Cancelar descarta el cambio. Los botones S1, S2, etc. permiten editar cada serie; la lista separada por comas es la alternativa rápida.
3. Los borradores se guardan en este navegador. Completar requiere el peso y las repeticiones de todas las series programadas, incluidas MRS y backoffs. El RM inicial cuenta como una serie, seguida por las MRS adicionales.
4. Una sesión completada captura sus prescripciones, marcas y registros. Cambiar un TM o una sustitución no altera las sesiones completadas. Registrar nueva revisión conserva la anterior en Historial.
5. Al terminar semana 6, revisar manualmente los TM del bloque 2. El Excel usa entradas independientes: no hay incremento ni conversión automática desde un test.
6. Exportar una copia JSON regularmente. Restaurar valida su estructura, solicita confirmación y descarga primero una copia de los datos actuales. Reiniciar también descarga la copia y pide escribir BORRAR.

La plantilla original es exigente en volumen. Haber entrenado fuerza durante un año no demuestra adaptación a este volumen. Empieza con cargas que controles, deja las 1–2 repeticiones en reserva indicadas por la fuente y usa los AMRAP opcionales según cómo te encuentres. La app conserva el volumen original; no añade sesiones ni accesorios.

## Adaptaciones de la app

Registro local, perfil en español, redondeo configurable, entrada por ruedas/touch/teclado, estimación informativa de 1RM, sustituciones por entrada de la plantilla, borradores, revisiones inmutables, copias JSON y caché sin conexión. Una sustitución con porcentajes requiere un TM propio para evitar usar el máximo de otro ejercicio. Una sustitución no cambia automáticamente otras semanas o sesiones.

Las cargas programadas y las cargas realizadas son campos distintos: actualizar un TM cambia la recomendación, no lo que se registró. No se infiere una progresión automática entre ciclos. Los días se pueden distribuir en el calendario sin alterar el orden de las sesiones del Excel.

No hay cuenta, backend, sincronización, analítica ni credenciales. Los datos viven en localStorage bajo `andre-jt2-v1`, separados de Brute. Borrar los datos del navegador puede borrarlos; exportar la copia es la protección. El modo sin conexión funciona después de una primera carga correcta mediante localhost o HTTPS.

## Ejecutar y verificar

Node 20+ para las pruebas; Node 22+ y Chrome en macOS para el smoke de navegador. La app no requiere compilación ni instalación de dependencias.

```sh
npm test
npm run serve
# http://127.0.0.1:8787
```

En macOS con Chrome instalado, `node scripts/smoke-browser.mjs` crea un servidor y un perfil temporal de Chrome, comprueba las 48 sesiones en 390 px, selectores con teclado y touch, confirmar/cancelar, cargas por RM, historial, corrupción y caché offline. Guarda capturas en `../andre-preview/`; detiene los procesos y elimina su perfil al terminar. No usa un perfil personal del navegador.

`npm test` compara todos los ejercicios, RM, repeticiones y series con las celdas extraídas del archivo; contrasta las 60 fórmulas contra sus resultados originales; prueba máximos vacíos, cambios de TM, redondeo, RM, sustituciones, registros congelados y validación de copias. GitHub Actions ejecuta estas pruebas al recibir cambios. No configura hosting ni publicación.

## Regenerar la extracción

```sh
/usr/bin/python3 scripts/extract-source.py /ruta/al/archivo-exportado.xlsx
npm test
```

El extractor usa solo la biblioteca estándar y lee la hoja KGS, conserva las fórmulas y referencias de celda, y separa los valores de ejemplo del autor en un fixture de pruebas. `source/jt-kgs-cells.json` conserva el texto y las fórmulas relevantes; los TM de ejemplo y las fechas antiguas se vacían. `tests/excel-fixture.json` contiene exclusivamente controles del archivo fuente, no marcas de André. El XLSX íntegro no se distribuye en este proyecto; permanece en el documento compartido y en la documentación del compendio de Brute.

## Archivos

- `js/program-data.js`: prescripciones extraídas e identidad de fuente.
- `js/engine.js`: cargas, redondeo, validación y snapshots.
- `js/storage.js`: almacenamiento local aislado.
- `js/app.js`: interfaz y selectores accesibles.
- `source/jt-kgs-cells.json`: celdas y fórmulas del programa con entradas iniciales vacías.
- `tests/`: controles de fuente y comportamiento.
- `sw.js`: precaché de archivos estáticos. Cambiar la versión de caché al modificar assets.

Autoría del programa: Cody Lefever. Adaptación de interfaz: proyecto Brute de Alejandro; este repositorio no implica afiliación o aprobación del autor del programa. No se concede una licencia sobre el programa o el material original ajeno.
