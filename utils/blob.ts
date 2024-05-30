export default function dataURLtoBlob(dataURL: string) {
  const arr = dataURL.split(",");
  const mimeMatch = arr[0].match(/:(.*?);/);

  if (mimeMatch) {
    const mime = mimeMatch[1];
    const bstr = atob(arr[1]);
    const n = bstr.length;
    const u8arr = new Uint8Array(n);
    for (let i = 0; i < n; i++) {
      u8arr[i] = bstr.charCodeAt(i);
    }
    return new Blob([u8arr], { type: mime });
  }

  return null;
}
