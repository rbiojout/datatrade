export default {
  items: [
    {
      restricted: false,
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'far fa-tachometer-alt',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
    {
      restricted: false,
      name: 'Data',
      url: '/data',
      icon: 'far fa-tachometer',
      badge: {
        variant: 'success',
        text: 'NEW',
      },
    },
    {
      restricted: true,
      title: true,
      name: 'Theme',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      restricted: true,
      name: 'Colors',
      url: '/theme/colors',
      icon: 'fal fa-palette',
    },
    {
      restricted: true,
      name: 'Typography',
      url: '/theme/typography',
      icon: 'fal fa-pencil-alt',
    },
    {
      restricted: true,
      title: true,
      name: 'Components',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      restricted: true,
      name: 'Base',
      url: '/base',
      icon: 'fal fa-dot-circle',
      children: [
        {
          restricted: true,
          name: 'Breadcrumbs',
          url: '/base/breadcrumbs',
          icon: 'fa fa-dot-circle',
        },
        {
          restricted: true,
          name: 'Cards',
          url: '/base/cards',
          icon: 'fa fa-dot-circle',
        },
        {
          restricted: true,
          name: 'Carousels',
          url: '/base/carousels',
          icon: 'fa fa-dot-circle',
        },
        {
          restricted: true,
          name: 'Collapses',
          url: '/base/collapses',
          icon: 'fa fa-dot-circle',
        },
        {
          restricted: true,
          name: 'Dropdowns',
          url: '/base/dropdowns',
          icon: 'fa fa-dot-circle',
        },
        {
          restricted: true,
          name: 'Forms',
          url: '/base/forms',
          icon: 'fa fa-dot-circle',
        },
        {
          restricted: true,
          name: 'Jumbotrons',
          url: '/base/jumbotrons',
          icon: 'fa fa-dot-circle',
        },
        {
          restricted: true,
          name: 'List groups',
          url: '/base/list-groups',
          icon: 'fa fa-dot-circle',
        },
        {
          restricted: true,
          name: 'Navs',
          url: '/base/navs',
          icon: 'fa fa-dot-circle',
        },
        {
          restricted: true,
          name: 'Paginations',
          url: '/base/paginations',
          icon: 'fa fa-dot-circle',
        },
        {
          restricted: true,
          name: 'Popovers',
          url: '/base/popovers',
          icon: 'fa fa-dot-circle',
        },
        {
          restricted: true,
          name: 'Progress Bar',
          url: '/base/progress-bar',
          icon: 'fa fa-dot-circle',
        },
        {
          restricted: true,
          name: 'Switches',
          url: '/base/switches',
          icon: 'fa fa-dot-circle',
        },
        {
          restricted: true,
          name: 'Tables',
          url: '/base/tables',
          icon: 'fa fa-dot-circle',
        },
        {
          restricted: true,
          name: 'Tabs',
          url: '/base/tabs',
          icon: 'fa fa-dot-circle',
        },
        {
          restricted: true,
          name: 'Tooltips',
          url: '/base/tooltips',
          icon: 'fa fa-dot-circle',
        },
      ],
    },
    {
      restricted: true,
      name: 'Buttons',
      url: '/buttons',
      icon: 'fal fa-bullhorn',
      children: [
        {
          restricted: true,
          name: 'Buttons',
          url: '/buttons/buttons',
          icon: 'fa fa-bullhorn',
        },
        {
          restricted: true,
          name: 'Button dropdowns',
          url: '/buttons/button-dropdowns',
          icon: 'fa fa-bullhorn',
        },
        {
          restricted: true,
          name: 'Button groups',
          url: '/buttons/button-groups',
          icon: 'fa fa-bullhorn',
        },
        {
          restricted: true,
          name: 'Brand Buttons',
          url: '/buttons/brand-buttons',
          icon: 'fa fa-bullhorn',
        },
      ],
    },
    {
      restricted: true,
      name: 'Charts',
      url: '/charts',
      icon: 'fal fa-chart-pie',
    },
    {
      restricted: true,
      name: 'Icons',
      url: '/icons',
      icon: 'fal fa-comment',
      children: [
        {
          restricted: true,
          name: 'CoreUI Icons',
          url: '/icons/coreui-icons',
          icon: 'icon-star',
          badge: {
            variant: 'info',
            text: 'NEW',
          },
        },
        {
          restricted: true,
          name: 'Flags',
          url: '/icons/flags',
          icon: 'icon-star',
        },
        {
          restricted: true,
          name: 'Font Awesome',
          url: '/icons/font-awesome',
          icon: 'fab fa-font-awesome-flag',
          badge: {
            variant: 'secondary',
            text: '4.7',
          },
        },
        {
          restricted: true,
          name: 'Simple Line Icons',
          url: '/icons/simple-line-icons',
          icon: 'icon-star',
        },
      ],
    },
    {
      restricted: true,
      name: 'Notifications',
      url: '/notifications',
      icon: 'fal fa-bell',
      children: [
        {
          restricted: true,
          name: 'Alerts',
          url: '/notifications/alerts',
          icon: 'fa fa-bell',
        },
        {
          restricted: true,
          name: 'Badges',
          url: '/notifications/badges',
          icon: 'fa fa-bell',
        },
        {
          restricted: true,
          name: 'Modals',
          url: '/notifications/modals',
          icon: 'fa fa-bell',
        },
      ],
    },
    {
      restricted: true,
      name: 'Widgets',
      url: '/widgets',
      icon: 'fa fa-calculator-alt',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
    {
      restricted: true,
      divider: true,
    },
    {
      restricted: true,
      title: true,
      name: 'Extras',
    },
    {
      restricted: true,
      name: 'Pages',
      url: '/pages',
      icon: 'fal fa-star',
      children: [
        {
          restricted: true,
          name: 'Login',
          url: '/login',
          icon: 'fal fa-star',
        },
        {
          restricted: true,
          name: 'Register',
          url: '/register',
          icon: 'fal fa-star',
        },
        {
          restricted: true,
          name: 'Error 404',
          url: '/404',
          icon: 'fal fa-star',
        },
        {
          restricted: true,
          name: 'Error 500',
          url: '/500',
          icon: 'fal fa-star',
        },
      ],
    },
    {
      name: 'Template',
      url: '/template',
      icon: 'fa fa-calculator-alt',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
  ],
};
