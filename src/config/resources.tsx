import { ResourceProps } from "@refinedev/core";
import { FolderIcon, CheckSquare, UsersIcon } from "lucide-react";

export const resources: ResourceProps[] = [
  {
    name: "projects",
    list: "/projects",
    create: "/projects/create",
    edit: "/projects/:id/edit",
    show: "/projects/:id/show",
    meta: {
      label: "Projects",
      icon: <FolderIcon />,
    },
  },
  {
    name: "tasks",
    list: "/tasks",
    create: "/tasks/create",
    edit: "/tasks/:id/edit",
    show: "/tasks/:id/show",
    meta: {
      label: "Tasks",
      icon: <CheckSquare />,
    },
  },
  {
    name: "profiles",
    list: "/profiles",
    show: "/profiles/:id/show",
    meta: {
      label: "Team Members",
      icon: <UsersIcon />,
    },
  },
];
