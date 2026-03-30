"use client";
import { useState, useMemo, useCallback } from "react";

export type SortDirection = "asc" | "desc" | null;

export interface UseTableControlsOptions<T> {
  /** Initial data array */
  data: T[];
  /** Initial items per page */
  initialItemsPerPage?: number;
  /** Initial sort key */
  initialSortKey?: string | null;
  /** Initial sort direction */
  initialSortDirection?: SortDirection;
  /** Custom sort function */
  customSort?: (data: T[], key: string, direction: "asc" | "desc") => T[];
}

export interface UseTableControlsReturn<T> {
  // Sorted and paginated data
  currentData: T[];
  // Sorting
  sortKey: string | null;
  sortDirection: SortDirection;
  handleSort: (key: string, direction: SortDirection) => void;
  // Pagination
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  handlePageChange: (page: number) => void;
  handlePageSizeChange: (pageSize: number) => void;
  // Utilities
  resetPagination: () => void;
  resetSorting: () => void;
  resetAll: () => void;
}

/**
 * Hook for managing table sorting and pagination
 *
 * @example
 * ```tsx
 * const tableControls = useTableControls({
 *   data: users,
 *   initialItemsPerPage: 10
 * });
 *
 * return (
 *   <>
 *     <Table>
 *       <TableHeader>
 *         <TableRow>
 *           <SortableTableHeader
 *             sortKey="name"
 *             currentSortKey={tableControls.sortKey}
 *             currentSortDirection={tableControls.sortDirection}
 *             onSort={tableControls.handleSort}
 *           >
 *             Name
 *           </SortableTableHeader>
 *         </TableRow>
 *       </TableHeader>
 *       <TableBody>
 *         {tableControls.currentData.map(user => (
 *           <TableRow key={user.id}>
 *             <TableCell>{user.name}</TableCell>
 *           </TableRow>
 *         ))}
 *       </TableBody>
 *     </Table>
 *     <TablePagination
 *       currentPage={tableControls.currentPage}
 *       totalPages={tableControls.totalPages}
 *       totalItems={tableControls.totalItems}
 *       itemsPerPage={tableControls.itemsPerPage}
 *       onPageChange={tableControls.handlePageChange}
 *       onPageSizeChange={tableControls.handlePageSizeChange}
 *     />
 *   </>
 * );
 * ```
 */
export function useTableControls<T>({
  data,
  initialItemsPerPage = 10,
  initialSortKey = null,
  initialSortDirection = null,
  customSort,
}: UseTableControlsOptions<T>): UseTableControlsReturn<T> {
  // Sorting state
  const [sortKey, setSortKey] = useState<string | null>(initialSortKey);
  const [sortDirection, setSortDirection] =
    useState<SortDirection>(initialSortDirection);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  // Default sort function
  const defaultSort = useCallback(
    (data: T[], key: string, direction: "asc" | "desc"): T[] => {
      return [...data].sort((a, b) => {
        const aValue = (a as any)[key];
        const bValue = (b as any)[key];

        // Handle null/undefined values
        if (aValue === null || aValue === undefined) return 1;
        if (bValue === null || bValue === undefined) return -1;

        // Handle different types
        if (typeof aValue === "string" && typeof bValue === "string") {
          const comparison = aValue
            .toLowerCase()
            .localeCompare(bValue.toLowerCase());
          return direction === "asc" ? comparison : -comparison;
        }

        if (aValue < bValue) return direction === "asc" ? -1 : 1;
        if (aValue > bValue) return direction === "asc" ? 1 : -1;
        return 0;
      });
    },
    [],
  );

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortKey || !sortDirection) return data;

    const sortFunction = customSort || defaultSort;
    return sortFunction(data, sortKey, sortDirection);
  }, [data, sortKey, sortDirection, customSort, defaultSort]);

  // Calculate pagination
  const totalItems = sortedData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Ensure current page is valid
  const validCurrentPage = Math.min(currentPage, Math.max(0, totalPages - 1));

  // Paginate data
  const currentData = useMemo(() => {
    const start = validCurrentPage * itemsPerPage;
    return sortedData.slice(start, start + itemsPerPage);
  }, [sortedData, validCurrentPage, itemsPerPage]);

  // Handlers
  const handleSort = useCallback((key: string, direction: SortDirection) => {
    setSortKey(direction ? key : null);
    setSortDirection(direction);
    // Reset to first page when sorting changes
    setCurrentPage(0);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handlePageSizeChange = useCallback((pageSize: number) => {
    setItemsPerPage(pageSize);
    // Reset to first page when page size changes
    setCurrentPage(0);
  }, []);

  // Utility functions
  const resetPagination = useCallback(() => {
    setCurrentPage(0);
    setItemsPerPage(initialItemsPerPage);
  }, [initialItemsPerPage]);

  const resetSorting = useCallback(() => {
    setSortKey(initialSortKey);
    setSortDirection(initialSortDirection);
  }, [initialSortKey, initialSortDirection]);

  const resetAll = useCallback(() => {
    resetPagination();
    resetSorting();
  }, [resetPagination, resetSorting]);

  return {
    // Data
    currentData,
    // Sorting
    sortKey,
    sortDirection,
    handleSort,
    // Pagination
    currentPage: validCurrentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    handlePageChange,
    handlePageSizeChange,
    // Utilities
    resetPagination,
    resetSorting,
    resetAll,
  };
}

/**
 * Hook for filtering table data
 *
 * @example
 * ```tsx
 * const { filteredData, filters, updateFilter, resetFilters } = useTableFilters({
 *   data: users,
 *   filterFunctions: {
 *     search: (item, value) =>
 *       item.name.toLowerCase().includes(value.toLowerCase()) ||
 *       item.email.toLowerCase().includes(value.toLowerCase()),
 *     status: (item, value) => value === 'all' || item.status === value,
 *     department: (item, value) => value === 'all' || item.department === value
 *   },
 *   initialFilters: {
 *     search: '',
 *     status: 'all',
 *     department: 'all'
 *   }
 * });
 * ```
 */
export interface UseTableFiltersOptions<T, F extends Record<string, any>> {
  /** Data to filter */
  data: T[];
  /** Filter functions for each filter key */
  filterFunctions: {
    [K in keyof F]: (item: T, value: F[K]) => boolean;
  };
  /** Initial filter values */
  initialFilters: F;
}

export interface UseTableFiltersReturn<T, F> {
  /** Filtered data */
  filteredData: T[];
  /** Current filter values */
  filters: F;
  /** Update a single filter */
  updateFilter: <K extends keyof F>(key: K, value: F[K]) => void;
  /** Update multiple filters at once */
  updateFilters: (filters: Partial<F>) => void;
  /** Reset all filters to initial values */
  resetFilters: () => void;
  /** Check if any filters are active */
  hasActiveFilters: boolean;
}

export function useTableFilters<T, F extends Record<string, any>>({
  data,
  filterFunctions,
  initialFilters,
}: UseTableFiltersOptions<T, F>): UseTableFiltersReturn<T, F> {
  const [filters, setFilters] = useState<F>(initialFilters);

  // Apply filters
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      for (const [key, filterFn] of Object.entries(filterFunctions)) {
        const filterValue = filters[key as keyof F];
        if (!filterFn(item, filterValue)) {
          return false;
        }
      }
      return true;
    });
  }, [data, filters, filterFunctions]);

  // Update single filter
  const updateFilter = useCallback(<K extends keyof F>(key: K, value: F[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  // Update multiple filters
  const updateFilters = useCallback((newFilters: Partial<F>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  // Reset filters
  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return Object.entries(filters).some(([key, value]) => {
      return value !== initialFilters[key as keyof F];
    });
  }, [filters, initialFilters]);

  return {
    filteredData,
    filters,
    updateFilter,
    updateFilters,
    resetFilters,
    hasActiveFilters,
  };
}

/**
 * Combine filtering with table controls
 *
 * @example
 * ```tsx
 * const filters = useTableFilters({ ... });
 * const controls = useTableControls({
 *   data: filters.filteredData,
 *   ...
 * });
 * ```
 */
export function useFilteredTableControls<T, F extends Record<string, any>>(
  filterOptions: UseTableFiltersOptions<T, F>,
  controlOptions: Omit<UseTableControlsOptions<T>, "data">,
) {
  const filters = useTableFilters(filterOptions);
  const controls = useTableControls({
    ...controlOptions,
    data: filters.filteredData,
  });

  return {
    ...filters,
    ...controls,
    // Override data with the current page data
    data: controls.currentData,
  };
}
