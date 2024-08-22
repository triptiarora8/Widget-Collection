# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

Project Structure:-
Here's a brief overview of the project's structure and components:

src/ - Contains the main source code for the application.
components/ - Reusable React components:
Dashboard.js - The main component managing the application’s state, displaying categories, and handling widget interactions.
WidgetList.js - Displays a list of widgets within a category, with options to add, edit, or delete widgets.
WidgetItem.js - Represents an individual widget.
CategoryHeader.js - Displays category headers and includes a button to add widgets.
AddWidgetModal.js - Modal component for adding or editing widgets, including validation for widget names, content, and optional graph data.
Heading.js - The dashboard header component, which includes a search bar and login button.
App.css - Styles for the application.
App.js - Main component that renders the Dashboard.

Usage
To add a widget: Click on the "Add Widgets" button within a category to open the modal and enter the widget details.
To edit a widget: Click on a widget to open the modal where you can modify its details.
To remove a widget: Click the delete icon on the widget you want to remove.
To search widgets: Use the search bar in the header to filter widgets based on name or content.