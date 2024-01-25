export function getFileExtensionFromMimeType(mimeType: any) {
  switch (mimeType) {
    case "text/plain":
      return ".txt";
    case "text/html":
      return ".html";
    case "text/css":
      return ".css";
    case "application/json":
      return ".json";
    case "application/javascript":
      return ".js";
    case "image/jpeg":
      return ".jpg";
    case "image/gif":
      return ".gif";
    case "image/png":
      return ".png";
    case "audio/mpeg":
      return ".mp3";
    case "video/mpeg":
      return ".mp4";
    case "video/mp4":
      return ".mp4";
    case "application/pdf":
      return ".pdf";
    case "application/msword":
      return ".doc";
    case "application/vnd.ms-excel":
      return ".xls";
    case "application/vnd.ms-powerpoint":
      return ".ppt";
    default:
      return "";
  }
}
