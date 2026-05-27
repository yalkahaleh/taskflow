import { ResourceProps } from "@refinedev/core";
import { FolderIcon, CheckSquareIcon, UsersIcon } from "lucide-react";

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
    meta: {
      label: "Tasks",
      icon: <CheckSquareIcon />,
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
