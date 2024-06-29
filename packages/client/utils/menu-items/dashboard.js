import DashboardIcon from '@mui/icons-material/Dashboard';

import { urls } from '@/constants';

const dashboard = {
  id: 'dashboard',
  // title: 'Dashboard', // example
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item', // type: 'collapse'
      url: urls.dashboard,
      icon: DashboardIcon,
      breadcrumbs: false,
    },
  ],
};

export default dashboard;
