import { useState } from "react";
import Hero from "../components/home/Hero";
import UniversityList from "../components/home/UniversityList";

export default function Home() {
  const [filters, setFilters] = useState({});

  return (
    <>
      <Hero onFilter={setFilters} />
      <UniversityList filters={filters} />
    </>
  );
}
