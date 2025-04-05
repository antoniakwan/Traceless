import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"), 
    route("editor", "routes/editor.tsx"),
    route("ImageEditor", "routes/ImageEditor.tsx")
] satisfies RouteConfig;
