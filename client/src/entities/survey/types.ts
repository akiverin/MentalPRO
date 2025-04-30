export interface Survey {
  _id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface SurveysResponse {
  data: Survey[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
