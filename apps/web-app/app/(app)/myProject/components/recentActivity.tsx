"use client";


import ProjectProgress from "./projectProgress";

export default function RecentActivity() {
  return (
    <div className="w-full gap-8 flex flex-col mt-10">
      <div className="flex flex-row justify-between items-center w-full">
        <h2 className="text-xl font-semibold">Recent Activity</h2>
        <p className="text-gray-500 text-sm">Showing 4 of 12 projects</p>
      </div>

      <div className=" items-center justify-between grid grid-cols-3  gap-6">
        <ProjectProgress />
        <ProjectProgress />
        <ProjectProgress />
        <ProjectProgress />
      </div>
    </div>
  );
}
