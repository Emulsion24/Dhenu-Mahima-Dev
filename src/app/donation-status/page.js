"use client";

import { Suspense } from "react";
import DonationStatusClient from "./DonationStatusClient";

export default function DonationStatusPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-600">Loading donation status...</div>}>
      <DonationStatusClient />
    </Suspense>
  );
}
