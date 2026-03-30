import React from "react";
import Box from "../../elements/box";
import Text from "../../elements/text";
import Button from "../../elements/button";

export interface TablePaginationProps {
  /** Current page number (0-based) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Total number of items */
  totalItems: number;
  /** Number of items per page */
  itemsPerPage: number;
  /** Callback when page changes */
  onPageChange: (page: number) => void;
  /** Whether to show page size selector */
  showPageSize?: boolean;
  /** Available page size options */
  pageSizeOptions?: number[];
  /** Callback when page size changes */
  onPageSizeChange?: (pageSize: number) => void;
  /** Whether to show item count information */
  showItemCount?: boolean;
  /** Maximum number of page buttons to show */
  maxPageButtons?: number;
}

export const TablePagination: React.FC<TablePaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  showPageSize = false,
  pageSizeOptions = [10, 25, 50, 100],
  onPageSizeChange,
  showItemCount = true,
  maxPageButtons = 5,
}) => {
  const startItem = currentPage * itemsPerPage + 1;
  const endItem = Math.min((currentPage + 1) * itemsPerPage, totalItems);

  // Calculate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= maxPageButtons) {
      // Show all pages
      for (let i = 0; i < totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page
      pages.push(0);

      // Calculate range around current page
      const halfRange = Math.floor((maxPageButtons - 3) / 2);
      const startRange = Math.max(1, currentPage - halfRange);
      const endRange = Math.min(totalPages - 2, currentPage + halfRange);

      // Add ellipsis if needed
      if (startRange > 1) {
        pages.push("...");
      }

      // Add pages in range
      for (let i = startRange; i <= endRange; i++) {
        pages.push(i);
      }

      // Add ellipsis if needed
      if (endRange < totalPages - 2) {
        pages.push("...");
      }

      // Show last page
      pages.push(totalPages - 1);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <Box
      display="flex"
      flexDirection={["column", "row"]}
      alignItems={["stretch", "center"]}
      justifyContent="space-between"
      gap="m"
      p="m"
      borderTop="1px solid"
      borderColor="palette.neutrals.200"
    >
      {/* Left side - Item count and page size */}
      <Box display="flex" alignItems="center" gap="m" flexWrap="wrap">
        {showItemCount && (
          <Text fontSize="s" color="secondary">
            Showing {startItem}-{endItem} of {totalItems} items
          </Text>
        )}

        {showPageSize && onPageSizeChange && (
          <Box display="flex" alignItems="center" gap="xs">
            <Text fontSize="s" color="secondary">
              Items per page:
            </Text>
            <select
              style={{
                padding: "var(--space-s)",
                borderRadius: "var(--radii-s)",
                border: "1px solid var(--colors-palette-neutrals-300)",
                fontSize: "var(--fontSizes-s)",
                backgroundColor: "white",
                cursor: "pointer",
              }}
              value={itemsPerPage}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </Box>
        )}
      </Box>

      {/* Right side - Pagination controls */}
      <Box display="flex" alignItems="center" gap="xs">
        <Button
          variant="ghost"
          $size="small"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 0}
          aria-label="Previous page"
        >
          ←
        </Button>

        {pageNumbers.map((page, index) => {
          if (page === "...") {
            return (
              <Box key={`ellipsis-${index}`} px="s">
                <Text fontSize="s" color="secondary">
                  ...
                </Text>
              </Box>
            );
          }

          const pageNumber = page as number;
          const isActive = pageNumber === currentPage;

          return (
            <Button
              key={pageNumber}
              variant={isActive ? "primary" : "ghost"}
              $size="small"
              onClick={() => onPageChange(pageNumber)}
              aria-label={`Go to page ${pageNumber + 1}`}
              aria-current={isActive ? "page" : undefined}
              style={{
                minWidth: "32px",
              }}
            >
              {pageNumber + 1}
            </Button>
          );
        })}

        <Button
          variant="ghost"
          $size="small"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
          aria-label="Next page"
        >
          →
        </Button>
      </Box>
    </Box>
  );
};

TablePagination.displayName = "TablePagination";
