"use client";

import Icon from "../Icon";
import { Box, Button } from "../../elements";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface PaginationProps {
  total: number;
  pageSize?: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  total,
  pageSize = 10,
  onPageChange,
}: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page") || 1);
  const isLastPage = currentPage * pageSize >= total;
  const pageCount = Math.ceil(total / pageSize);

  const createQueryString = useCallback(
    (page: number | string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());
      return params.toString();
    },
    [searchParams],
  );

  const handlePageChange = (page: number | string) => {
    onPageChange(Number(page));
    router.push(`${pathname}?${createQueryString(page)}`);
  };

  const getPageNumbers = (): (number | string)[] => {
    const pageNumbersToShow = 3;
    const maxPagesBeforeCurrentPage = Math.floor(pageNumbersToShow / 2);
    const maxPagesAfterCurrentPage = Math.ceil(pageNumbersToShow / 2) - 1;
    let startPage = 1;
    let endPage = pageCount;

    if (pageCount <= 1) {
      return [];
    }

    if (currentPage <= maxPagesBeforeCurrentPage) {
      startPage = 1;
      endPage = pageNumbersToShow;
    } else if (currentPage + maxPagesAfterCurrentPage >= pageCount) {
      startPage = pageCount - pageNumbersToShow + 1;
    } else {
      startPage = currentPage - maxPagesBeforeCurrentPage;
      endPage = currentPage + maxPagesAfterCurrentPage;
    }

    let numbers: number[] = Array.from(Array(endPage + 1 - startPage).keys())
      .map((num) => startPage + num)
      .filter((num) => num <= pageCount && num > 0);

    if (numbers[0] > 1) {
      numbers =
        numbers[0] <= 2
          ? [1, ...numbers]
          : ([1, "...", ...numbers] as number[]);
    }

    if (numbers[numbers.length - 1] < pageCount) {
      numbers =
        numbers[numbers.length - 1] >= pageCount - 1
          ? [...numbers, pageCount]
          : ([...numbers, "...", pageCount] as number[]);
    }

    return numbers;
  };

  // If total items are less than or equal to pageSize, don't show pagination
  if (total <= pageSize) {
    return null;
  }

  return (
    <Box as="nav" display="flex" justifyContent="center" alignItems="center">
      <Box display="flex" gap="xxsmall">
        <Button
          variant="outline"
          $size="icon.xsmall"
          onClick={() => currentPage !== 1 && handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label={
            currentPage === 1 ? "No previous page available" : "Previous page"
          }
        >
          <Icon icon="IconArrowLeft" size="medium" />
        </Button>

        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <Button
              key={`ellipsis-${index}`}
              disabled
              variant="outline"
              $size="icon.xsmall"
            >
              &hellip;
            </Button>
          ) : page === currentPage ? (
            <Button
              key={page}
              $size="icon.xsmall"
              variant="primary"
              aria-current="true"
              // disabled
            >
              {page}
            </Button>
          ) : (
            <Button
              key={page}
              variant="outline"
              $size="icon.xsmall"
              onClick={() => handlePageChange(page)}
              aria-label={`Page ${page}`}
            >
              {page}
            </Button>
          ),
        )}

        <Button
          variant="outline"
          $size="icon.xsmall"
          onClick={() => !isLastPage && handlePageChange(currentPage + 1)}
          disabled={isLastPage}
          aria-label={isLastPage ? "No next page available" : "Next page"}
        >
          <Icon icon="IconArrowRight" size="medium" />
        </Button>
      </Box>
    </Box>
  );
}
