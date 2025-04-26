"use client";

import { useEffect, useState } from "react";
import { University } from "../utils/University";
import UniversitiesTable from "../commonComponents/UniversitiesTable";
import { Button } from "@/components/ui/button";
import { ApiPerformanceMetrics } from "../utils/ApiPerformanceMetrics ";
import ApiPerformanceDisplay from "./components/ApiPerformanceMetrics";
import Link from 'next/link';

interface UniversitiesResponse {
  universities: University[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

const Page = () => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(10);

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
    const url = `/api/universities/favorites?page=${currentPage}&pageSize=${pageSize}`;
    fetchData(url);
  }, [currentPage, pageSize]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFavoriteToggle = async (id: number) => {
    const url = `/api/universities/favorites?page=${currentPage}&pageSize=${pageSize}`;
    await fetchData(url);
  };

  return (
    <div className="flex gap-x-6 p-6">
      {/* Left side: Table */}
      <div className="w-[75%]">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Favorite Universities</h1>
          <Link href="/">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
        <UniversitiesTable 
          universities={universities}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onFavoriteToggle={handleFavoriteToggle}
        />
      </div>

      {/* Right side: Performance */}
      <div className="flex-1 flex flex-col gap-y-4 max-w-md">
        <ApiPerformanceDisplay metrics={metrics} />
      </div>
    </div>
  );
};

export default Page;
