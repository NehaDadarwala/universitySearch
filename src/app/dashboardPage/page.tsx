"use client";

import { useEffect, useState } from "react";
import DropDown from "./components/DropDown";
import { University } from "../utils/University";
import UniversitiesTable from "../commonComponents/UniversitiesTable";
import SearchBox from "./components/SearchBox";
import { Button } from "@/components/ui/button";
import { ApiPerformanceMetrics } from "../utils/ApiPerformanceMetrics ";
import ApiPerformanceDisplay from "./components/ApiPerformanceMetrics";
import Link from 'next/link';
import { Header } from "@/components/common/header";

interface UniversitiesResponse {
  universities: University[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

const Page = () => {
  const [uniqueCountries, setUniqueCountries] = useState<string[]>([]);
  const [universities, setUniversities] = useState<University[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(10);

  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [universityNameFilter, setUniversityNameFilter] = useState<string | null>(null);

  const [metrics, setMetrics] = useState<ApiPerformanceMetrics>({
    lastResponseTime: null,
    lastStatus: null,
    callCount: 0,
    errorCount: 0,
    history: [],
  });

  async function fetchData(url: string) {
    const start = performance.now();
    let status = null;
    let error = false;

    try {
      const res = await fetch(url);
      const data: UniversitiesResponse = await res.json();

      setUniversities(data.universities);
      setTotalPages(data.totalPages);
      setCurrentPage(data.page);

      status = res.status;
      if (!res.ok) error = true;

    } catch (error) {
      error = true;
      status = "Network Error";
    }

    const end = performance.now();
    const responseTime = Math.round(end - start);

    setMetrics((prev) => {
      const newCallCount = prev.callCount + 1;
      const newErrorCount = prev.errorCount + (error ? 1 : 0);
      return {
        lastResponseTime: responseTime,
        lastStatus: status,
        callCount: newCallCount,
        errorCount: newErrorCount,
        history: [
          ...prev.history,
          { responseTime, status, time: new Date().toLocaleTimeString() },
        ].slice(-10),
      };
    });
  }

  useEffect(() => {
    async function uniqueCountries() {
      const uniqueCountriesUrl = "/api/universities/countries";

      try {
        const res = await fetch(uniqueCountriesUrl);
        const data: string[] = await res.json();

        setUniqueCountries(data);
      } catch (error) {
        console.error("Error occurred");
      }
    }

    const url = "/api/universities";
    fetchData(url);

    uniqueCountries();
  }, []);

  useEffect(() => {
    let url = "/api/universities";
    const params = [];

    if (selectedCountry) {
      params.push(`country=${encodeURIComponent(selectedCountry)}`);
    }

    if (universityNameFilter) {
      params.push(`name=${encodeURIComponent(universityNameFilter)}`);
    }

    params.push(`page=${currentPage}`);
    params.push(`pageSize=${pageSize}`);

    if (params.length > 0) {
      url += `?${params.join("&")}`;
    }

    fetchData(url);
  }, [selectedCountry, universityNameFilter, currentPage, pageSize]);

  const onUniversityNameFilter = (name: string) => {
    setUniversityNameFilter(name);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const clearFilters = () => {
    setSelectedCountry("Canada");
    setUniversityNameFilter(null);
    setCurrentPage(1);
  };

  const handleCountrySelect = (value: string) => {
    setSelectedCountry(value === "none" ? "" : value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFavoriteToggle = async (id: number) => {
    const url = `/api/universities?page=${currentPage}&pageSize=${pageSize}${selectedCountry ? `&country=${selectedCountry}` : ''}${universityNameFilter ? `&name=${universityNameFilter}` : ''}`;
    await fetchData(url);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-x-6 p-6">
      {/* Filters and Performance - Top on mobile, Right on desktop */}
      <div className="order-1 lg:order-2 flex-1 flex flex-col gap-y-4 max-w-md mb-6 lg:mb-0">
        <SearchBox onChange={onUniversityNameFilter} />
        <DropDown
          items={uniqueCountries}
          onSelect={handleCountrySelect}
          selectedItem={selectedCountry}
        />
        <Button onClick={clearFilters}>Clear All Filters</Button>
        <ApiPerformanceDisplay metrics={metrics} />
      </div>

      {/* Table - Bottom on mobile, Left on desktop */}
      <div className="order-2 lg:order-1 w-full lg:w-[75%]">
        <Header 
          title="All Universities" 
          actions={
            <Link href="/favoritesPage">
              <Button variant="outline">View Favorites</Button>
            </Link>
          }
        />
        <UniversitiesTable 
          universities={universities}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onFavoriteToggle={handleFavoriteToggle}
        />
      </div>
    </div>
  );
};

export default Page;
