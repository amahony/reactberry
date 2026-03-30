import React from "react";
import Text from "../../elements/text";

// Table component types
export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  [key: string]: any; // Allow additional props
}

export interface TableHeaderProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  [key: string]: any; // Allow additional props
}
export interface TableBodyProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}
export interface TableFooterProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}
export interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
  /** Whether this row is selected */
  selected?: boolean;
  /** Whether this row is clickable */
  clickable?: boolean;
  /** Custom width for the row */
  width?: string | number;

  [key: string]: any; // Allow additional props
}
export interface TableCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement> {
  /** Alignment of cell content */
  align?: "left" | "center" | "right";
  /** Whether this is a header cell */
  header?: boolean;
  /** Column span */
  colSpan?: number;
  /** Row span */
  rowSpan?: number;
  /** Whether to truncate text content */
  truncate?: boolean;
  [key: string]: any; // Allow additional props
}

export interface TableHeaderCellProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  /** Alignment of cell content */
  align?: "left" | "center" | "right";
  /** Column span */
  colSpan?: number;
  /** Row span */
  rowSpan?: number;
  /** Whether to show a visual sort indicator */
  sortable?: boolean;
  /** Whether to truncate text content */
  truncate?: boolean;
  /** Custom width for the row */
  width?: string | number;

  [key: string]: any; // Allow additional props
}

export const Table: React.FC<TableProps> = ({ children, ...props }) => {
  return (
    <Text
      as="table"
      width="100%"
      {...props}
      // style={{ borderCollapse: "collapse" }}
    >
      {children}
    </Text>
  );
};

// Table Header component
export const TableHeader: React.FC<TableHeaderProps> = ({
  children,
  ...props
}) => {
  return (
    <Text as="thead" {...props}>
      {children}
    </Text>
  );
};

// Table Body component
export const TableBody: React.FC<TableBodyProps> = ({ children, ...props }) => {
  return (
    <Text as="tbody" {...props}>
      {children}
    </Text>
  );
};

// Table Footer component
export const TableFooter: React.FC<TableFooterProps> = ({
  children,
  ...props
}) => {
  return (
    <Text as="tfoot" {...props}>
      {children}
    </Text>
  );
};

export const TableRow: React.FC<TableRowProps> = ({ children, ...props }) => {
  return (
    <Text as="tr" {...props}>
      {children}
    </Text>
  );
};

// Table Cell component
export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  (
    {
      children,
      align = "center",
      colSpan,
      rowSpan,
      truncate = true,
      width,
      ...props
    },
    ref,
  ) => {
    const Component = "td";

    return (
      <Text
        as={Component}
        ref={ref as any}
        textAlign={align}
        position={"relative"}
        border="1px solid"
        // borderWidth="1px 0"
        //skin="row"
        {...props}
        width={width}
        colSpan={colSpan}
        rowSpan={rowSpan}
        height="2rem"
      >
        {/* If children is text, wrap in Text component for proper typography */}
        {typeof children === "string" || typeof children === "number" ? (
          <Text
            fontSize={"s"}
            title={truncate ? String(children) : undefined}
            truncate={truncate}
            style={{ verticalAlign: "middle" }}
          >
            {children}
          </Text>
        ) : (
          <>{children}</>
        )}
      </Text>
    );
  },
);

// Table Header Cell component
export const TableHeaderCell: React.FC<TableHeaderCellProps> = ({
  children,
  align = "left",
  colSpan,
  rowSpan,
  width = "auto",
  ...props
}) => {
  return (
    <Text
      as="th"
      skin="row.header"
      border="1px solid"
      borderColor={"surface"}
      fontSize="xxs"
      fontWeight="700"
      textAlign={align}
      width={width}
      {...props}
      colSpan={colSpan}
      rowSpan={rowSpan}
    >
      <Text
        as="div"
        width={width}
        style={{
          verticalAlign: "middle",
        }}
      >
        {children}
      </Text>
    </Text>
  );
};

// Convenience exports
Table.displayName = "Table";
TableHeader.displayName = "TableHeader";
TableBody.displayName = "TableBody";
TableFooter.displayName = "TableFooter";
TableRow.displayName = "TableRow";
TableCell.displayName = "TableCell";
TableHeaderCell.displayName = "TableHeaderCell";
