import Api from './api';
import { File, FileReturn, UploadFile } from './types/directUploads';

export default class DirectUploads extends Api {
  path: string;

  constructor() {
    super();
    this.path = 'rails/active_storage/direct_uploads';
  }

  async uploadFile(file: File): Promise<UploadFile> {
    const body = new FormData();

    if (!file.name) {
      file.name = Date.now().toString();
    }

    body.append('blob', {
      uri: file.uri,
      type: file.mime,
      name: file.name,
    });

    const response = await this.request<FileReturn>({
      path: this.path,
      method: 'POST',
      body,
    });
    return response;
  }
}
