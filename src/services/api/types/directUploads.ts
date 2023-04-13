import { ApiResType } from './api';

export interface File {
  uri: string;
  mime?: string;
  name?: string;
}

export interface FileReturn {
  attachableSgid: string;
  byteSize: number;
  contentType: string;
  filename: string;
  url: string;
}

export type UploadFile = ApiResType<FileReturn>;
