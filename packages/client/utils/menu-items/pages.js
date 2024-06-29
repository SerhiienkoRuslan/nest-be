import AddBoxIcon from '@mui/icons-material/AddBox';
import BookIcon from '@mui/icons-material/Book';
import BookmarksIcon from '@mui/icons-material/Bookmarks';

import { urls } from '@/constants';

const pages = {
  id: 'posts',
  type: 'group',
  children: [
    {
      id: 'post-create',
      title: 'Posts',
      type: 'collapse',
      icon: BookIcon,
      children: [
        {
          id: 'post-create',
          title: 'Create Post',
          type: 'item',
          url: urls.createPost,
          icon: AddBoxIcon,
          // breadcrumbs: true,
        },
        {
          id: 'my-posts',
          title: 'My Posts',
          type: 'item',
          url: urls.myPosts,
          icon: BookmarksIcon,
          // breadcrumbs: true,
        },
      ],
    },
  ],
};

export default pages;
