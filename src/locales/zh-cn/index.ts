import { zhCN_account } from './account';
import { zhCN_avatorDropMenu } from './user/avatorDropMenu';
import { zhCN_tagsViewDropMenu } from './user/tagsViewDropMenu';
import { zhCN_title } from './user/title';
import { zhCN_globalTips } from './global/tips';
import { zhCN_permissionRole } from './permission/role';
import { zhCN_dashboard } from './dashboard';
import { zhCN_guide } from './guide';
import { zhCN_documentation } from './documentation';
import { zhCN_menu } from './menu';
import { zhCN_project } from './project';
import zhCN_role from './role';
import zhCN_user from './user';
import zhCN_book from './book';
import zhCN_borrow from './borrow';

const zh_CN = {
  ...zhCN_account,
  ...zhCN_avatorDropMenu,
  ...zhCN_tagsViewDropMenu,
  ...zhCN_title,
  ...zhCN_globalTips,
  ...zhCN_permissionRole,
  ...zhCN_dashboard,
  ...zhCN_guide,
  ...zhCN_menu,
  ...zhCN_project,
  ...zhCN_documentation,
  ...zhCN_role,
  ...zhCN_user,
  ...zhCN_book,
  ...zhCN_borrow,
};

export default zh_CN;
