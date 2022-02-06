import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));

const Widgets = React.lazy(() => import("./views/widgets/Widgets"));

const ProductIndex = React.lazy(() => import("./views/customs/product"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/widgets", name: "Widgets", component: Widgets },
  { path: "/product", name: "Product", component: ProductIndex },
];

export default routes;
