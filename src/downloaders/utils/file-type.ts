export function mapFileExtensionToMimeType(extension: string) {
  return `image/${extension}`
}

export function mapFileMimeTypeToExtension(mimeType: string) {
  const [_, extension] = mimeType.split('/')
  return extension
}
