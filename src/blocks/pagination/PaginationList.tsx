"use client";

import { ReactNode } from "react";
import { Box } from "../../elements";
import { Pagination } from "./Pagination";

interface PaginationListProps {
  total: number; // total number of items
  pageSize?: number; // items per page (default: 20)
  children: ReactNode; // the list content to render
  onPageChange?: (page: number) => void; // optional callback when page changes
}

export default function PaginationList({
  total,
  pageSize = 10,
  children,
  onPageChange,
}: PaginationListProps) {
  // Simply pass the onPageChange handler to the Pagination component
  const handlePageChange = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    }
  };

  return (
    <>
      {/* Render the paginated content */}
      {children}
      {/* Render the pagination controls */}
      <Box position="sticky" bottom="0" bg="base" p="small">
        <Pagination
          total={total}
          pageSize={pageSize}
          onPageChange={handlePageChange}
        />
      </Box>
    </>
  );
}
