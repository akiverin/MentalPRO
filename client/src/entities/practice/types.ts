export interface Practice {
  _id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface PracticesResponse {
  data: Practice[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
