interface GalleryResponse {
  total: number;
  objects: Array<string>;
}

interface QueryParameters {
  limit?: string;
  page?: number | string | undefined;
  filter?: string;
}

interface Response {
  statusCode: number;
  content: string;
}

export { GalleryResponse, QueryParameters, Response };
