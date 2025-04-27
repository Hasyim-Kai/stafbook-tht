import { RoleTypes } from "@/domain/model/etc";
import { Path } from "@/router";

export const adminRoutes: Path[] = [
    `/`,
]

export function isRouteAuthorized(pathname: string, role: RoleTypes): boolean {
    const routes = adminRoutes

    for (const route of routes) {
        const regex = new RegExp(`^${route.replace(/:\w+/, "(.+)")}$`);
        if (regex.test(pathname)) {
            return true;
        }
    }
    return false;
}