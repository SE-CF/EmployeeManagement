// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from '/home/scq/employee-management/employee-frontend/node_modules/umi/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "component": require('@/layouts/index.jsx').default,
    "routes": [
      {
        "path": "/employee",
        "exact": true,
        "component": require('@/pages/employee/index.jsx').default
      },
      {
        "path": "/employee/:id",
        "exact": true,
        "component": require('@/pages/employee/[id].jsx').default
      },
      {
        "path": "/",
        "exact": true,
        "component": require('@/pages/index.jsx').default
      }
    ]
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
