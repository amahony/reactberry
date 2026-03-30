"use client";
import { Box, Text } from "@/design-system/elements";
import React, { useRef, useEffect, useState, useCallback } from "react";

/**
 * List Component with Column Grouping
 *
 * A flexible data grid component that supports column grouping functionality.
 * Columns can be grouped under common headers for better organization and visual hierarchy.
 *
 * ## Basic Usage
 * ```tsx
 * <List data={myData} grid={myColumns} />
 * ```
 *
 * ## Column Grouping Methods
 *
 * ### Method 1: Direct Group Property (Simple)
 * Add a `group` property to any GridColumn to group it under a header:
 *
 * ```tsx
 * const groupedColumns = [
 *   {
 *     label: "Name",
 *     width: "200px",
 *     key: "name",
 *     component: (props) => <Text>{props.name}</Text>
 *     // No group - this will be standalone
 *   },
 *   {
 *     label: "Street",
 *     width: "150px",
 *     key: "street",
 *     group: "Address", // Grouped under "Address"
 *     component: (props) => <Text>{props.street}</Text>
 *   },
 *   {
 *     label: "City",
 *     width: "100px",
 *     key: "city",
 *     group: "Address", // Also grouped under "Address"
 *     component: (props) => <Text>{props.city}</Text>
 *   }
 * ];
 * ```
 *
 * ### Method 2: createColumnGroup Helper (Recommended)
 * Use `createColumnGroup()` to create grouped columns directly in your grid array:
 *
 * ```tsx
 * const addressGroup = createColumnGroup("Address Info", [
 *   { label: "Street", width: "150px", key: "street", component: StreetComponent },
 *   { label: "City", width: "100px", key: "city", component: CityComponent }
 * ]);
 *
 * const contactGroup = createColumnGroup("Contact Info", [
 *   { label: "Phone", width: "120px", key: "phone", component: PhoneComponent },
 *   { label: "Email", width: "180px", key: "email", component: EmailComponent }
 * ]);
 *
 * // Use directly in grid array
 * const grid = [
 *   { label: "Name", width: "200px", key: "name", component: NameComponent },
 *   addressGroup,  // Direct usage!
 *   contactGroup   // Direct usage!
 * ];
 *
 * <List data={myData} grid={grid} />
 * ```
 *
 * ### Rendering Result:
 * ```
 * Name    | Address Info  | Contact Info
 *         | Street | City | Phone | Email
 * --------|--------|------|-------|-------
 * John    | 123    | NY   | 555-1 | j@...
 * Jane    | 456    | LA   | 555-2 | jane@...
 * ```
 *
 * ## Advanced Usage
 *
 * ### Custom Group Styling
 * ```tsx
 * const styledGroup = createColumnGroup(
 *   "Financial Data",
 *   [...columns],
 *   { bg: "palette.blues.1", color: "palette.blues.8" } // Custom group header props
 * );
 * ```
 *
 * ### Mixed Arrays
 * You can mix standalone columns with grouped columns:
 * ```tsx
 * const grid = [
 *   standaloneColumn,
 *   groupedColumns1,
 *   anotherStandaloneColumn,
 *   groupedColumns2
 * ];
 * ```
 */

function debounce<T extends (...args: any[]) => any>(
  fn: T,
  ms: number
): (...args: Parameters<T>) => void {
  let timer: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, ms);
  };
}

export interface DataItem {
  [key: string]: any;
}

export interface ListProps {
  data: DataItem[];
  grid?: (GridColumn | GroupedColumn)[];
  gap?: string;
  selected?: string[];
  onSelect?: (id: string) => void;
  /**
   * Called when a row is clicked. Receives the full item.
   */
  onRowClick?: (item: DataItem) => void;
  /**
   * Fixed height for each row. Default is "2rem".
   */
  rowHeight?: string;
  [key: string]: any;
}

export interface GridColumn {
  /** Column header label - can be text or React component */
  label: string | React.ReactNode;
  /** Column width (CSS width value) */
  width: string;
  /** Data key(s) to extract from row data */
  key: string | string[];
  /** Column alignment */
  align?: any;
  /** Minimum column width */
  minWidth?: string;
  /** Maximum column width */
  maxWidth?: string;
  /** Enable auto-width calculation based on content */
  autoWidth?: boolean;
  /** Component to render cell content */
  component: React.ComponentType<any>;
  /** Props passed to column header */
  columnProps?: any;
  /** Props passed to individual cells */
  cellProps?: any;
  /**
   * Group identifier - columns with same group value will be grouped together.
   * If undefined, column will not be grouped.
   *
   * @example
   * ```tsx
   * { group: "Personal Info" } // Groups under "Personal Info" header
   * ```
   */
  group?: string;
  [key: string]: any;
}

/**
 * Represents a group of columns under a common header
 */
export interface GroupedColumn {
  /** Header text/component displayed above the grouped columns */
  groupHeader: string | React.ReactNode;
  /** Array of columns belonging to this group */
  columns: GridColumn[];
  /** Props passed to the group header element */
  groupProps?: any;
}

const DEFAULT_GRID_SETUP: GridColumn[] = [
  {
    label: "id",
    width: "4rem",
    key: "id",
    align: "center",
    component: (props: DataItem) => <Text fontWeight={600}>{props.id}</Text>,
  },
  {
    label: "name",
    width: "1fr",
    key: "name",
    align: "start",
    component: (props: DataItem) => <Text fontWeight={600}>{props.name}</Text>,
  },
  {
    label: "",
    width: "1fr",
    key: "empty",
    align: "start",
    component: () => <></>,
  },
];

/**
 * Utility function to create a grouped column structure
 *
 * @param groupHeader - The header text/component for the group
 * @param columns - Array of columns to include in this group
 * @param groupProps - Optional props for the group header styling
 * @returns GroupedColumn object
 *
 * @example
 * ```tsx
 * const contactGroup = createColumnGroup(
 *   "Contact Information",
 *   [
 *     { label: "Email", width: "200px", key: "email", component: EmailCell },
 *     { label: "Phone", width: "150px", key: "phone", component: PhoneCell }
 *   ],
 *   { bg: "palette.blues.1" } // Custom group header styling
 * );
 * ```
 */
export const createColumnGroup = (
  groupHeader: string | React.ReactNode,
  columns: GridColumn[],
  groupProps?: any
): GroupedColumn => ({
  groupHeader,
  columns,
  groupProps,
});

/**
 * Internal utility function to process mixed grid input.
 * Handles both flat arrays of columns with group properties and
 * arrays containing GroupedColumn objects.
 *
 * @param grid - Array of GridColumn and/or GroupedColumn objects
 * @returns Array containing both individual columns and GroupedColumn objects
 */
const processGridInput = (
  grid: (GridColumn | GroupedColumn)[]
): (GridColumn | GroupedColumn)[] => {
  const result: (GridColumn | GroupedColumn)[] = [];

  grid.forEach((item) => {
    if ("columns" in item) {
      // It's already a GroupedColumn, add it directly
      result.push(item);
    } else {
      // It's a GridColumn, check if it has a group property
      if (item.group) {
        // Find if we already have a group with this name
        const existingGroupIndex = result.findIndex(
          (r) => "columns" in r && r.groupHeader === item.group
        );

        if (existingGroupIndex >= 0) {
          // Add to existing group
          (result[existingGroupIndex] as GroupedColumn).columns.push(item);
        } else {
          // Create new group
          result.push({
            groupHeader: item.group,
            columns: [item],
          });
        }
      } else {
        // No group, add as standalone column
        result.push(item);
      }
    }
  });

  return result;
};

/**
 * Internal utility function to flatten grouped columns back to regular columns.
 * Used for data processing where the flat structure is needed.
 *
 * @param groupedColumns - Mixed array of columns and groups
 * @returns Flat array of GridColumn objects
 */
const flattenColumns = (
  groupedColumns: (GridColumn | GroupedColumn)[]
): GridColumn[] => {
  const flattened: GridColumn[] = [];

  groupedColumns.forEach((item) => {
    if ("columns" in item) {
      flattened.push(...item.columns);
    } else {
      flattened.push(item);
    }
  });

  return flattened;
};

// Utility function to filter data items based on grid keys
const filterDataByGridKeys = (data: DataItem[], grid: GridColumn[]) => {
  const gridKeys = grid.map((col) => col.key).flat();
  return data.map((item) => {
    const filteredItem: Partial<DataItem> = {};
    gridKeys.forEach((key) => {
      if (typeof key === "string" && key in item) {
        filteredItem[key] = item[key as keyof DataItem];
      }
    });
    return filteredItem as DataItem;
  });
};

// Helper function to get value from item using key or array of keys
const getItemValue = (item: DataItem, key: string | string[]) => {
  if (typeof key === "string") {
    return item[key];
  }
  // If key is an array, return an object with all specified keys
  return key.reduce(
    (acc, k) => ({
      ...acc,
      [k]: item[k],
    }),
    {}
  );
};

const List: React.FC<ListProps> = ({
  data = [],
  grid = DEFAULT_GRID_SETUP,
  selected = [],
  gap = "xxxsmall",
  rowHeight = "2rem",
  onSelect,
  onRowClick,
  ...rest
}) => {
  // Process grid input and flatten for processing
  const groupedColumns = processGridInput(grid);
  const flattenedGrid = flattenColumns(groupedColumns);

  // Create a ref for each column that will hold calculated widths
  const [columnWidths, setColumnWidths] = useState<string[]>([]);
  const columnRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hasAutoWidthColumns = flattenedGrid.some((col) => col.autoWidth);
  const [measuredOnce, setMeasuredOnce] = useState(false);

  // Create initial grid template based on fixed widths
  const initialGridTemplate = flattenedGrid
    .map((col: GridColumn) => (col.autoWidth ? "auto" : col.width))
    .join(" ");

  // Filter the data based on the grid keys
  const filteredData = filterDataByGridKeys(data, flattenedGrid);

  // Memoize grid structure to prevent unnecessary recalculations
  const gridStructureKey = JSON.stringify(
    flattenedGrid.map((col) => ({
      width: col.width,
      autoWidth: col.autoWidth,
    }))
  );

  const measureColumnWidths = useCallback(() => {
    if (filteredData.length === 0 || !hasAutoWidthColumns) return;

    // Initialize or resize the refs array to match grid length
    columnRefs.current = columnRefs.current.slice(0, flattenedGrid.length);
    headerRefs.current = headerRefs.current.slice(0, flattenedGrid.length);

    const widths = flattenedGrid.map((col, index) => {
      if (!col.autoWidth) return col.width;

      // Get width of the column content and header
      const columnElements = document.querySelectorAll(`.column-${index}`);
      let maxWidth = 0;

      // Include header width in calculation
      const headerEl = headerRefs.current[index];
      if (headerEl) {
        const headerWidth = headerEl.getBoundingClientRect().width;
        maxWidth = Math.max(maxWidth, headerWidth);
      }

      // Find the max width among all cells in this column
      // Only measure a reasonable number of rows for performance
      const maxRowsToMeasure = Math.min(columnElements.length, 20);
      for (let i = 0; i < maxRowsToMeasure; i++) {
        const el = columnElements[i];
        const width = el.getBoundingClientRect().width;
        maxWidth = Math.max(maxWidth, width);
      }

      // Add padding + buffer to prevent layout shifts
      return `${maxWidth + 24}px`;
    });

    // Only update if there's a significant change
    const hasSignificantChange = widths.some((width, i) => {
      const current = columnWidths[i];
      if (!current || current === "auto") return true;

      // Extract numeric values for comparison
      const currentVal = parseFloat(current);
      const newVal = parseFloat(width);
      return Math.abs(currentVal - newVal) > 5; // 5px threshold
    });

    if (hasSignificantChange || !measuredOnce) {
      setColumnWidths(widths);
      setMeasuredOnce(true);
    }
  }, [
    filteredData.length,
    flattenedGrid,
    hasAutoWidthColumns,
    columnWidths,
    measuredOnce,
  ]);
  // Use a layout effect to measure sizes after DOM update but before paint
  useEffect(() => {
    if (!hasAutoWidthColumns) return;

    // Only measure if we haven't measured yet or if grid structure changed
    if (!measuredOnce || columnWidths.length !== flattenedGrid.length) {
      // Use requestAnimationFrame to ensure DOM is ready
      const timeoutId = setTimeout(() => {
        measureColumnWidths();
      }, 0);

      return () => clearTimeout(timeoutId);
    }
  }, [
    gridStructureKey,
    measureColumnWidths,
    measuredOnce,
    hasAutoWidthColumns,
    flattenedGrid.length,
    columnWidths.length,
  ]);

  // Remeasure when window resizes
  useEffect(() => {
    if (!hasAutoWidthColumns) return;

    // Use a debounced resize handler that only triggers on width changes
    let lastWidth = window.innerWidth;
    const handleResize = () => {
      // Only remeasure on horizontal resizes
      if (window.innerWidth !== lastWidth) {
        lastWidth = window.innerWidth;
        measureColumnWidths();
      }
    };

    const debouncedResize = debounce(handleResize, 250);
    window.addEventListener("resize", debouncedResize);

    return () => {
      window.removeEventListener("resize", debouncedResize);
    };
  }, [hasAutoWidthColumns, measureColumnWidths]);

  // Determine which grid template to use (calculated or initial)
  const gridTemplateColumns =
    columnWidths.length === flattenedGrid.length
      ? columnWidths.join(" ")
      : initialGridTemplate;

  return (
    <Box
      width="100%"
      overflow="hidden"
      shape="rounded"
      border="1px solid"
      skin="surface"
    >
      {/* Group Headers */}
      {groupedColumns.some((item) => "columns" in item) && (
        <Box
          display={"grid"}
          gridTemplateColumns={gridTemplateColumns}
          pb={gap}
          border="none"
          gap={gap}
          backgroundColor="palette.neutrals.0"
          borderTopLeftRadius="rounded"
          borderTopRightRadius="rounded"
          width="100%"
          {...rest}
        >
          {(() => {
            let colIndex = 0;
            return groupedColumns.map((item, groupIndex) => {
              if ("columns" in item) {
                const groupSpan = item.columns.length;
                const groupHeader = (
                  <Text
                    key={`group-${groupIndex}`}
                    as="div"
                    skin="row.group"
                    shape="roundedSmall"
                    fontSize="small"
                    fontWeight={600}
                    textAlign="center"
                    display={"flex"}
                    alignItems="center"
                    justifyContent="center"
                    width="100%"
                    height="2.5rem"
                    backgroundColor="palette.neutrals.1"
                    borderBottom="1px solid"
                    borderColor="border"
                    padding="xxsmall"
                    gridColumn={`${colIndex + 1} / span ${groupSpan}`}
                    {...item.columns[0].groupProps}
                  >
                    {item.groupHeader}
                  </Text>
                );
                colIndex += groupSpan;
                return groupHeader;
              } else {
                colIndex += 1;
                return <Box key={`empty-${groupIndex}`} />;
              }
            });
          })()}
        </Box>
      )}

      {/* Column Headers */}
      <Box
        display={"grid"}
        gridTemplateColumns={gridTemplateColumns}
        border="none"
        //gap={gap}
        borderBottom="1px solid"
        borderColor="neutral"
        skin="base"
        p="xxxs"
      >
        {flattenedGrid.map((column: GridColumn, i: number) => {
          const align = column?.align || "start";
          return (
            <Text
              as={React.isValidElement(column.label) ? "div" : "span"}
              key={i}
              ref={(el: any) => (headerRefs.current[i] = el)}
              // shape="roundedSmall"
              fontSize="xs"
              fontWeight={600}
              textAlign={align}
              width="100%"
              justifyContent={align}
              px="xxxs"
              color="primary"
              {...column.columnProps}
              lineClamp={1}
            >
              {React.isValidElement(column.label) ? column.label : column.label}
            </Text>
          );
        })}
      </Box>
      <Box display="grid" overflow="hidden" width="100%">
        {filteredData?.map((item, rowIndex) => {
          const isSelected = selected.includes(item.id);
          return (
            <Text
              key={rowIndex}
              as="div"
              display="grid"
              gridTemplateColumns={gridTemplateColumns}
              alignItems="center"
              // py="xxxsmall"
              fontSize={"small"}
              borderBottom={
                rowIndex !== filteredData.length - 1 ? "1px solid" : "0"
              }
              height={rowHeight}
              maxHeight={rowHeight}
              // skin={rowIndex % 2 === 1 ? "row.alt" : "row"}
              borderColor="neutral"
              onClick={() => {
                if (onSelect) onSelect(item.id);
                if (onRowClick) onRowClick(item);
              }}
              cursor={onSelect || onRowClick ? "pointer" : "default"}
              // gap={gap}
            >
              {flattenedGrid.map((column, colIndex) => {
                const Component = column.component;
                const align = column?.align || "start";
                const itemValue = getItemValue(item, column.key);
                return (
                  <Text
                    as="div"
                    key={colIndex}
                    className={`column-${colIndex}`}
                    ref={
                      rowIndex === 0
                        ? (el: any) => (columnRefs.current[colIndex] = el)
                        : null
                    }
                    display="flex"
                    alignItems="center"
                    justifyContent={align}
                    width="100%"
                    height={"100%"}
                    // maxHeight={rowHeight}
                    // whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    borderRight={
                      colIndex !== flattenedGrid.length - 1 ? "1px solid" : "0"
                    }
                    //skin={rowIndex % 2 === 1 ? "row.alt" : "row"}
                    borderColor="neutral"
                    // px={colIndex === 0 ? "small" : "xxsmall"}
                    minWidth={column.minWidth || "initial"}
                    maxWidth={column.maxWidth || "initial"}
                    {...column.cellProps}
                  >
                    {isSelected && <>✅</>}
                    <Box
                      width="100%"
                      overflow="hidden"
                      display="flex"
                      alignItems="center"
                      justifyContent={align}
                      maxHeight="100%"
                      style={{
                        textOverflow: "ellipsis",
                      }}
                    >
                      <Component {...item} value={itemValue} />
                    </Box>
                  </Text>
                );
              })}
            </Text>
          );
        })}
      </Box>
    </Box>
  );
};

export default List;
