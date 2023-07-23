const pages = {
  id: 'pages',
  title: 'Pages',
  // caption: 'Pages Caption',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Authentication',
      type: 'collapse',
      // icon: icons.IconKey,
      children: [
        {
          id: 'login',
          title: 'Login',
          type: 'item',
          url: '/auth/login',
          target: true,
        },
        {
          id: 'register',
          title: 'Register',
          type: 'item',
          url: '/auth/registration',
          target: true,
        },
      ],
    },
  ],
};

export default pages;
