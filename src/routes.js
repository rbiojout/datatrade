import React, { Component, Fragment } from "react";
import Loadable from "react-loadable"

import DefaultLayout from "./containers/DefaultLayout";

//import Breadcrumbs from "../src./views/Base/Breadcrumbs";

function Loading() {
  return <div>Loading...</div>;
}

const Breadcrumbs = Loadable({
  loader: () => import("./views/Base/Breadcrumbs/Breadcrumbs"),
  loading: Loading,
});

const Cards = Loadable({
  loader: () => import("./views/Base/Cards/Cards"),
  loading: Loading,
});

const Carousels = Loadable({
  loader: () => import("./views/Base/Carousels/Carousels"),
  loading: Loading,
});

const Collapses = Loadable({
  loader: () => import("./views/Base/Collapses/Collapses"),
  loading: Loading,
});

const Dropdowns = Loadable({
  loader: () => import("./views/Base/Dropdowns/Dropdowns"),
  loading: Loading,
});

const Forms = Loadable({
  loader: () => import("./views/Base/Forms/Forms"),
  loading: Loading,
});

const Jumbotrons = Loadable({
  loader: () => import("./views/Base/Jumbotrons/Jumbotrons"),
  loading: Loading,
});

const ListGroups = Loadable({
  loader: () => import("./views/Base/ListGroups/ListGroups"),
  loading: Loading,
});

const Navbars = Loadable({
  loader: () => import("./views/Base/Navbars/Navbars"),
  loading: Loading,
});

const Navs = Loadable({
  loader: () => import("./views/Base/Navs/Navs"),
  loading: Loading,
});

const Paginations = Loadable({
  loader: () => import("./views/Base/Paginations/Paginations"),
  loading: Loading,
});

const Popovers = Loadable({
  loader: () => import("./views/Base/Popovers/Popovers"),
  loading: Loading,
});

const ProgressBar = Loadable({
  loader: () => import("./views/Base/ProgressBar/ProgressBar"),
  loading: Loading,
});

const Switches = Loadable({
  loader: () => import("./views/Base/Switches/Switches"),
  loading: Loading,
});

const Tables = Loadable({
  loader: () => import("./views/Base/Tables/Tables"),
  loading: Loading,
});

const Tabs = Loadable({
  loader: () => import("./views/Base/Tabs/Tabs"),
  loading: Loading,
});

const Tooltips = Loadable({
  loader: () => import("./views/Base/Tooltips/Tooltips"),
  loading: Loading,
});

const BrandButtons = Loadable({
  loader: () => import("./views/Buttons/BrandButtons/BrandButtons"),
  loading: Loading,
});

const ButtonDropdowns = Loadable({
  loader: () => import("./views/Buttons/ButtonDropdowns/ButtonDropdowns"),
  loading: Loading,
});

const ButtonGroups = Loadable({
  loader: () => import("./views/Buttons/ButtonGroups/ButtonGroups"),
  loading: Loading,
});

const Buttons = Loadable({
  loader: () => import("./views/Buttons/Buttons/Buttons"),
  loading: Loading,
});
const Charts = Loadable({
  loader: () => import("./views/Charts/Charts"),
  loading: Loading,
});
const Dashboard = Loadable({
  loader: () => import("./views/Dashboard/Dashboard"),
  loading: Loading,
});

const CoreUIIcons = Loadable({
  loader: () => import("./views/Icons/CoreUIIcons/CoreUIIcons"),
  loading: Loading,
});

const Flags = Loadable({
  loader: () => import("./views/Icons/Flags/Flags"),
  loading: Loading,
});

const FontAwesome = Loadable({
  loader: () => import("./views/Icons/FontAwesome/FontAwesome"),
  loading: Loading,
});

const SimpleLineIcons = Loadable({
  loader: () => import("./views/Icons/SimpleLineIcons/SimpleLineIcons"),
  loading: Loading,
});

const Alerts = Loadable({
  loader: () => import("./views/Notifications/Alerts/Alerts"),
  loading: Loading,
});

const Badges = Loadable({
  loader: () => import("./views/Notifications/Badges/Badges"),
  loading: Loading,
});

const Modals = Loadable({
  loader: () => import("./views/Notifications/Modals/Modals"),
  loading: Loading,
});

const Colors = Loadable({
  loader: () => import("./views/Theme/Colors/Colors"),
  loading: Loading,
});

const Typography = Loadable({
  loader: () => import("./views/Theme/Typography/Typography"),
  loading: Loading,
});

const Widgets = Loadable({
  loader: () => import("./views/Widgets/Widgets"),
  loading: Loading,
});

const Users = Loadable({
  loader: () => import("./views/Users/Users"),
  loading: Loading,
});

const User = Loadable({
  loader: () => import("./views/Users/User"),
  loading: Loading,
});

const Template = Loadable({
  loader: () => import("./views/Template/Template"),
  loading: Loading,
});



// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: "/", exact: true, name: "Home", component: DefaultLayout },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/theme", exact: true, name: "Theme", component: Colors },
  { path: "/theme/colors", name: "Colors", component: Colors },
  { path: "/theme/typography", name: "Typography", component: Typography },
  { path: "/base", exact: true, name: "Base", component: Cards },
  { path: "/base/cards", name: "Cards", component: Cards },
  { path: "/base/forms", name: "Forms", component: Forms },
  { path: "/base/switches", name: "Switches", component: Switches },
  { path: "/base/tables", name: "Tables", component: Tables },
  { path: "/base/tabs", name: "Tabs", component: Tabs },
  { path: "/base/breadcrumbs", name: "Breadcrumbs", component: Breadcrumbs },
  { path: "/base/carousels", name: "Carousel", component: Carousels },
  { path: "/base/collapses", name: "Collapse", component: Collapses },
  { path: "/base/dropdowns", name: "Dropdowns", component: Dropdowns },
  { path: "/base/jumbotrons", name: "Jumbotrons", component: Jumbotrons },
  { path: "/base/list-groups", name: "List Groups", component: ListGroups },
  { path: "/base/navbars", name: "Navbars", component: Navbars },
  { path: "/base/navs", name: "Navs", component: Navs },
  { path: "/base/paginations", name: "Paginations", component: Paginations },
  { path: "/base/popovers", name: "Popovers", component: Popovers },
  { path: "/base/progress-bar", name: "Progress Bar", component: ProgressBar },
  { path: "/base/tooltips", name: "Tooltips", component: Tooltips },
  { path: "/buttons", exact: true, name: "Buttons", component: Buttons },
  { path: "/buttons/buttons", name: "Buttons", component: Buttons },
  { path: "/buttons/button-dropdowns", name: "Button Dropdowns", component: ButtonDropdowns },
  { path: "/buttons/button-groups", name: "Button Groups", component: ButtonGroups },
  { path: "/buttons/brand-buttons", name: "Brand Buttons", component: BrandButtons },
  { path: "/icons", exact: true, name: "Icons", component: CoreUIIcons },
  { path: "/icons/coreui-icons", name: "CoreUI Icons", component: CoreUIIcons },
  { path: "/icons/flags", name: "Flags", component: Flags },
  { path: "/icons/font-awesome", name: "Font Awesome", component: FontAwesome },
  { path: "/icons/simple-line-icons", name: "Simple Line Icons", component: SimpleLineIcons },
  { path: "/notifications", exact: true, name: "Notifications", component: Alerts },
  { path: "/notifications/alerts", name: "Alerts", component: Alerts },
  { path: "/notifications/badges", name: "Badges", component: Badges },
  { path: "/notifications/modals", name: "Modals", component: Modals },
  { path: "/widgets", name: "Widgets", component: Widgets },
  { path: "/charts", name: "Charts", component: Charts },
  { path: "/users", exact: true,  name: "Users", component: Users },
  { path: "/users/:id", exact: true, name: "User Details", component: User },
  { path: "/template", exact: true, name: "Template", component: Template },
];

const routes_resticted = [
  { path: "/", exact: true, name: "Home", component: DefaultLayout },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  /*
  { path: "/theme", exact: true, name: "Theme", component: Colors },
  { path: "/theme/colors", name: "Colors", component: Colors },
  { path: "/theme/typography", name: "Typography", component: Typography },
  { path: "/base", exact: true, name: "Base", component: Cards },
  { path: "/base/cards", name: "Cards", component: Cards },
  { path: "/base/forms", name: "Forms", component: Forms },
  { path: "/base/switches", name: "Switches", component: Switches },
  { path: "/base/tables", name: "Tables", component: Tables },
  { path: "/base/tabs", name: "Tabs", component: Tabs },
  { path: "/base/breadcrumbs", name: "Breadcrumbs", component: Breadcrumbs },
  { path: "/base/carousels", name: "Carousel", component: Carousels },
  { path: "/base/collapses", name: "Collapse", component: Collapses },
  { path: "/base/dropdowns", name: "Dropdowns", component: Dropdowns },
  { path: "/base/jumbotrons", name: "Jumbotrons", component: Jumbotrons },
  { path: "/base/list-groups", name: "List Groups", component: ListGroups },
  { path: "/base/navbars", name: "Navbars", component: Navbars },
  { path: "/base/navs", name: "Navs", component: Navs },
  { path: "/base/paginations", name: "Paginations", component: Paginations },
  { path: "/base/popovers", name: "Popovers", component: Popovers },
  { path: "/base/progress-bar", name: "Progress Bar", component: ProgressBar },
  { path: "/base/tooltips", name: "Tooltips", component: Tooltips },
  { path: "/buttons", exact: true, name: "Buttons", component: Buttons },
  { path: "/buttons/buttons", name: "Buttons", component: Buttons },
  { path: "/buttons/button-dropdowns", name: "Button Dropdowns", component: ButtonDropdowns },
  { path: "/buttons/button-groups", name: "Button Groups", component: ButtonGroups },
  { path: "/buttons/brand-buttons", name: "Brand Buttons", component: BrandButtons },
  { path: "/icons", exact: true, name: "Icons", component: CoreUIIcons },
  { path: "/icons/coreui-icons", name: "CoreUI Icons", component: CoreUIIcons },
  { path: "/icons/flags", name: "Flags", component: Flags },
  { path: "/icons/font-awesome", name: "Font Awesome", component: FontAwesome },
  { path: "/icons/simple-line-icons", name: "Simple Line Icons", component: SimpleLineIcons },
  { path: "/notifications", exact: true, name: "Notifications", component: Alerts },
  { path: "/notifications/alerts", name: "Alerts", component: Alerts },
  { path: "/notifications/badges", name: "Badges", component: Badges },
  { path: "/notifications/modals", name: "Modals", component: Modals },
  { path: "/widgets", name: "Widgets", component: Widgets },
  { path: "/charts", name: "Charts", component: Charts },
  { path: "/users", exact: true,  name: "Users", component: Users },
  { path: "/users/:id", exact: true, name: "User Details", component: User },
  */
  { path: "/template", exact: true, name: "Template", component: Template },
];

export {routes, routes_resticted};
