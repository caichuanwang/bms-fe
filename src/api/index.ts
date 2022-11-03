import { MenuList } from '@/models/menu.interface';
import { LoginParams, LoginResult } from '@/models/login';
import { useBatch, useCreate, useGetList, useUpdate } from './request';

const projectResource = '/v1/projects';

export const useLogin = () => {
  return useCreate<LoginParams, LoginResult>('/v1/login');
};

// export const useGetCurrentMenus = () => {
//   return useGetList<MenuList>('currentMenu', '/v1/current/menu');
// };
export const useGetProjects = (pagination: any, filters: any) => {
  return useGetList<API.ProjectPagination>(
    'Projects',
    projectResource,
    pagination
  );
};
export const useAddProject = () => {
  return useCreate<API.Project, API.Project>(projectResource);
};

export const useUpdateProject = () => {
  return useUpdate<API.Project>(projectResource);
};

export const useBatchDeleteProject = () => {
  return useBatch(projectResource + ':batchDelete');
};
