import { emptySplitApi as api } from "./emptyApi";

export const staticDataApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProjects: build.query<Project[], void>({
      query: () => ({ url: `/api/projects` }),
    }),
  }),
});

export const { useGetProjectsQuery } = staticDataApi;

export interface Project {
  id: string;
  guid: string;
  title: string;
  category: string;
  path: string;
  description: string;
  longDescription: string;
  links: {
    appStore?: string | null;
    playStore?: string | null;
    github?: string | null;
  };
  media: {
    icon: string;
    youtube?: string | null;
  };
  features?: string[];
}
