/**
 * Google Drive URL'lerini embed edilebilir formata çevirir.
 * 
 * Desteklenen formatlar:
 * - https://drive.google.com/file/d/FILE_ID/view
 * - https://drive.google.com/open?id=FILE_ID
 * - https://docs.google.com/presentation/d/FILE_ID/...
 * - https://drive.google.com/file/d/FILE_ID/preview
 */

export function getDriveFileId(url) {
    if (!url) return null;

    // Format: /file/d/FILE_ID/
    const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (fileMatch) return fileMatch[1];

    // Format: /presentation/d/FILE_ID/
    const presMatch = url.match(/\/presentation\/d\/([a-zA-Z0-9_-]+)/);
    if (presMatch) return presMatch[1];

    // Format: ?id=FILE_ID
    const idMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (idMatch) return idMatch[1];

    return null;
}

export function getDrivePreviewUrl(url) {
    const fileId = getDriveFileId(url);
    if (fileId) {
        return `https://drive.google.com/file/d/${fileId}/preview`;
    }
    // Eğer zaten preview URL ise olduğu gibi kullan
    if (url && url.includes('/preview')) return url;
    return url;
}

export function getDriveAudioUrl(url) {
    // Google Drive ses dosyaları için embed URL
    const fileId = getDriveFileId(url);
    if (fileId) {
        return `https://drive.google.com/file/d/${fileId}/preview`;
    }
    return url;
}
