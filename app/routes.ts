import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("health", "routes/health.tsx"),
  route("components-test", "routes/components-test.tsx"),
  route("contact", "routes/contact.tsx"),
] satisfies RouteConfig;
