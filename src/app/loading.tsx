"use client";

export default function Loading() {
  console.log("Londing Start");

  return (
    <div className="flex justify-center min-h-screen">
      <span className="loading loading-ring loading-lg"></span>
      <span className="loading loading-ring loading-lg"></span>
      <span className="loading loading-ring loading-lg"></span>
      <span className="loading loading-ring loading-lg"></span>
    </div>
  );
}
