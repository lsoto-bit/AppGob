const major = parseInt(process.versions.node.split('.')[0], 10);

if (major < 18) {
  console.error(
    `\nNode.js 18+ requerido (Vite 6). Actual: ${process.version}\n` +
      'Ejecuta: nvm use\n',
  );
  process.exit(1);
}
