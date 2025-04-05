import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"), route("routes/editor", "routes/editor.tsx")] satisfies RouteConfig;