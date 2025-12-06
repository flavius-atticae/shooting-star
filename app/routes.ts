import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("doula", "routes/doula.tsx"),
  route("health", "routes/health.tsx"),
  route("components-test", "routes/components-test.tsx"),
] satisfies RouteConfig;
