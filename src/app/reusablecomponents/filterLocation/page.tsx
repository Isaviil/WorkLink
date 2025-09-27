"use client";
import { useState } from "react";
import FilterLoc from "./filterlocation";

export default function Page() {
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  return <FilterLoc onSelectDistrict={setSelectedDistrict} />;
}