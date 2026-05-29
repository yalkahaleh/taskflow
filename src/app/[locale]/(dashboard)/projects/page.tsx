"use client";
import { useList } from "@refinedev/core";

const ProjectsPage = () => {
  const { query } = useList({
    resource: "projects",
  });

  if (query.isLoading) return <div>Loading...</div>;
  if (query.isError) return <div>Error!</div>;

  return (
    <div>
      <h1>Projects</h1>
      <pre>{JSON.stringify(query.data, null, 2)}</pre>
    </div>
  );
};

export default ProjectsPage;
