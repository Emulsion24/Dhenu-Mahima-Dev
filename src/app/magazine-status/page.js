"use client";

import { Suspense } from "react";

import MagazineStatusClient from "./magazinepay";

export default function MagazineStatusPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-600">Loading donation status...</div>}>
      <MagazineStatusClient />
    </Suspense>
  );
}
