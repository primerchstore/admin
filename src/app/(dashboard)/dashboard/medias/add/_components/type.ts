export type UploadStatus = "idle" | "uploading" | "success" | "error";

export interface FileEntry {
  id: string;
  file: File;
  preview: string;
  status: UploadStatus;
  error?: string;
}

export interface UploadResponse {
  urls: string[];
  count: number;
}
