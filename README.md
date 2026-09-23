## 🚀 Getting Started

### Prerequisites

- **Node.js**: Version 14.x or higher (Commands are optimized below for Node 17+ compatibility)
- **Package Manager**: `npm` (v6+) or `yarn` (v1.x+)

### Installation

Install all required project dependencies using one of the following commands from the root directory:

```bash
# Using npm
$ npm install

# Using yarn
$ yarn install
```

### Development Server

Run the local development server with hot module reloading (HMR) active.

```bash
# Standard environment (Node 16 and below)
$ npm start
# OR
$ yarn start

# Modern environment (Node 17+)
$ npm run start:n17
# OR
$ yarn start:n17
```

Once initialized, navigate your browser to **[http://localhost:3000](http://localhost:3000)**. The page automatically shifts and updates whenever you save edits inside the `src/` directory.

### Production Build

Compile and optimize the React application for live production deployment. The minified, production-ready assets will be compiled into the root `build/` directory.

```bash
# Standard environment (Node 16 and below)
$ npm run build
# OR
$ yarn build

# Modern environment (Node 17+)
$ npm run build:n17
# OR
$ yarn build:n17
```

---

## 📂 Codebase Architecture & File Layout

The application isolates visual view presentation, shared functional layout wrappers, and state layers into a clean, modular file structure:

```text
coreui-free-react-admin-template
├── public/                # Static public assets
│   └── index.html         # Application root HTML template
├── src/                   # Main application source directory
│   ├── assets/            # Global media assets (images, logos, icons)
│   ├── components/        # Reusable global layout elements (Header, Footer, Sidebar)
│   ├── layouts/           # Page structural wrappers and route layouts
│   ├── scss/              # Global application styles and CoreUI design overrides
│   ├── views/             # Domain-specific page views and features (Dashboard, Users, Settings)
│   ├── _nav.js            # Sidebar menu structural navigation schema
│   ├── App.js             # Root application component and shell execution
│   ├── index.js           # DOM entry point that initializes React and Redux contexts
│   ├── routes.js          # Dynamic structural mapping array for views
│   └── store.js           # Central Redux / state management layout
└── package.json           # Application dependencies and execution script actions
```

---

## 🛠️ Application Engine & Key Architectures

### 1. Global Navigation Configuration (`src/_nav.js`)

The layout sidebar is dynamically driven by a JSON array export configuration found in `_nav.js`. Adding links, drop-downs, or sub-menus to your navigation panel does not require UI rewrites. Instead, simply insert objects matching this structural format:

```javascript
const _nav = [
  {
    component: 'CNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer',
    badge: { color: 'info', text: 'NEW' },
  },
  {
    component: 'CNavGroup',
    name: 'Buttons',
    to: '/buttons',
    icon: 'cil-cursor',
    items: [
      { component: 'CNavItem', name: 'Buttons', to: '/buttons/buttons' },
      { component: 'CNavItem', name: 'Dropdowns', to: '/buttons/dropdowns' },
    ],
  },
]
```

### 2. Centralized Routing Logic (`src/routes.js`)

To decouple path configurations from component files, paths are declared as an object array mapping within `routes.js`. The layout wrapper parses this file to lazy-load routes on demand.

```javascript
import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/theme/colors', name: 'Colors', element: Colors },
]

export default routes
```

### 3. State Management Setup (`src/store.js`)

Global application interactions (such as opening/closing the sidebar, theme switching, and user interface states) are governed via a Redux centralized store architecture initialized within `store.js`.

- To append a global slice, define your standard actions and execution mutations directly inside this module.
- To read or mutate store values within functional page views, invoke the standard native hook selectors:

  ```javascript
  import { useSelector, useDispatch } from 'react-redux'

  // Sample state usage within a component
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const dispatch = useDispatch()

  const toggleSidebar = () => {
    dispatch({ type: 'set', sidebarShow: !sidebarShow })
  }
  ```
