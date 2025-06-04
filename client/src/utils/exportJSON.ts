// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const exportToJson = (objectData: any, nameFile: string) => {
  const filename = nameFile || 'export.json';
  const contentType = 'application/json;charset=utf-8;';
  const jsonString = JSON.stringify(objectData);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (window.navigator && (navigator as any).msSaveOrOpenBlob) {
    const blob = new Blob([jsonString], { type: contentType });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (navigator as any).msSaveOrOpenBlob(blob, filename);
  } else {
    // Стандартный способ для современных браузеров
    const a = document.createElement('a');
    a.download = filename;
    a.href = 'data:' + contentType + ',' + encodeURIComponent(jsonString);
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
};
