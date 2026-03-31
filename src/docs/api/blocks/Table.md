# Table API Reference

The Table component provides a flexible, accessible, and themeable way to display tabular data. It consists of multiple sub-components that work together to create complex table layouts.

## Import

```jsx
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  SortableTableHeader,
  TablePagination
} from '@reactberry/system/blocks';
```

## Components

### Table

The main container component for tables.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `striped` | `boolean` | `false` | Apply alternating row colors for better readability |
| `hoverable` | `boolean` | `false` | Enable hover effects on table rows |
| `compact` | `boolean` | `false` | Reduce padding for a more condensed layout |
| `bordered` | `boolean` | `true` | Add borders to all table cells |
| `stickyHeader` | `boolean` | `false` | Make the table header sticky on scroll |
| `skin` | `'base' \| 'surface' \| 'card'` | `'surface'` | Apply predefined styling skin |
| `...props` | `PolymorphicComponentProps<'table'>` | - | All standard table HTML attributes |

#### Example

```jsx
<Table striped hoverable stickyHeader>
  <TableHeader>
    <TableRow>
      <TableCell header>Name</TableCell>
      <TableCell header>Email</TableCell>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell>john@example.com</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### TableHeader

Container for table header rows.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `...props` | `PolymorphicComponentProps<'thead'>` | - | All standard thead HTML attributes |

### TableBody

Container for table body rows.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `...props` | `PolymorphicComponentProps<'tbody'>` | - | All standard tbody HTML attributes |

### TableFooter

Container for table footer rows.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `...props` | `PolymorphicComponentProps<'tfoot'>` | - | All standard tfoot HTML attributes |

### TableRow

Individual table row component.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `selected` | `boolean` | `false` | Highlight the row as selected |
| `clickable` | `boolean` | `false` | Apply clickable styling and cursor |
| `...props` | `PolymorphicComponentProps<'tr'>` | - | All standard tr HTML attributes |

#### Example

```jsx
<TableRow selected clickable onClick={() => handleRowClick(id)}>
  <TableCell>Content</TableCell>
</TableRow>
```

### TableCell

Individual table cell component that can render as either `td` or `th`.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `header` | `boolean` | `false` | Render as a header cell (th) instead of data cell (td) |
| `align` | `'left' \| 'center' \| 'right'` | `'left'` | Text alignment within the cell |
| `colSpan` | `number` | - | Number of columns the cell should span |
| `rowSpan` | `number` | - | Number of rows the cell should span |
| `...props` | `PolymorphicComponentProps<'td'>` | - | All standard td/th HTML attributes |

#### Example

```jsx
<TableCell header colSpan={2} align="center">
  Q1 2024
</TableCell>
```

### SortableTableHeader

A specialized header cell component that adds sorting functionality to table columns.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sortKey` | `string` | - | The column key used for sorting |
| `currentSortKey` | `string` | - | Currently active sort column key |
| `currentSortDirection` | `'asc' \| 'desc' \| null` | - | Current sort direction |
| `onSort` | `(key: string, direction: SortDirection) => void` | - | Callback when header is clicked |
| `sortable` | `boolean` | `true` | Whether this column is sortable |
| `sortIcon` | `ReactNode` | - | Custom sort icon component |
| `...props` | `TableCellProps` | - | All TableCell props are supported |

#### Example

```jsx
<SortableTableHeader
  sortKey="name"
  currentSortKey={sortKey}
  currentSortDirection={sortDirection}
  onSort={handleSort}
>
  Name
</SortableTableHeader>
```

### TablePagination

A pagination component designed to work with tables, providing page navigation and items per page controls.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `currentPage` | `number` | - | Current page number (0-based) |
| `totalPages` | `number` | - | Total number of pages |
| `totalItems` | `number` | - | Total number of items |
| `itemsPerPage` | `number` | - | Number of items per page |
| `onPageChange` | `(page: number) => void` | - | Callback when page changes |
| `showPageSize` | `boolean` | `false` | Whether to show page size selector |
| `pageSizeOptions` | `number[]` | `[10, 25, 50, 100]` | Available page size options |
| `onPageSizeChange` | `(pageSize: number) => void` | - | Callback when page size changes |
| `showItemCount` | `boolean` | `true` | Whether to show item count information |
| `maxPageButtons` | `number` | `5` | Maximum number of page buttons to show |

#### Example

```jsx
<TablePagination
  currentPage={currentPage}
  totalPages={Math.ceil(data.length / itemsPerPage)}
  totalItems={data.length}
  itemsPerPage={itemsPerPage}
  onPageChange={setCurrentPage}
  showPageSize
  onPageSizeChange={setItemsPerPage}
/>
```

## Styling

### Theme Integration

The Table component automatically integrates with the design system theme:

- Uses theme colors for borders, backgrounds, and hover states
- Applies theme spacing for padding
- Uses theme typography for font sizes and weights

### Custom Styling

You can customize the table appearance using the `css` prop:

```jsx
<Table
  css={{
    '& thead th': {
      backgroundColor: 'var(--colors-palette-blue-100)',
      color: 'var(--colors-palette-blue-900)',
    },
    '& tbody tr:hover': {
      backgroundColor: 'var(--colors-palette-blue-50)',
    },
  }}
>
  {/* Table content */}
</Table>
```

### Skin Variants

The `skin` prop provides pre-defined styling combinations:

- `base`: Minimal styling with base background
- `surface`: Secondary surface styling (default)
- `card`: Card-like appearance with elevation

## Accessibility

The Table component follows accessibility best practices:

- Semantic HTML structure with proper table elements
- Supports screen readers through proper use of th/td elements
- Keyboard navigation works out of the box
- ARIA attributes can be added through props

## Advanced Features

### Sorting Implementation

Use `SortableTableHeader` with state management:

```jsx
const [sortKey, setSortKey] = useState(null);
const [sortDirection, setSortDirection] = useState(null);

const handleSort = (key, direction) => {
  setSortKey(direction ? key : null);
  setSortDirection(direction);
};

const sortedData = useMemo(() => {
  if (!sortKey || !sortDirection) return data;
  
  return [...data].sort((a, b) => {
    const aValue = a[sortKey];
    const bValue = b[sortKey];
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });
}, [data, sortKey, sortDirection]);
```

### Pagination Implementation

Combine table with `TablePagination` for paginated data:

```jsx
const [currentPage, setCurrentPage] = useState(0);
const [itemsPerPage, setItemsPerPage] = useState(10);

const paginatedData = useMemo(() => {
  const start = currentPage * itemsPerPage;
  return data.slice(start, start + itemsPerPage);
}, [data, currentPage, itemsPerPage]);

return (
  <>
    <Table>
      {/* Render paginatedData */}
    </Table>
    <TablePagination
      currentPage={currentPage}
      totalPages={Math.ceil(data.length / itemsPerPage)}
      totalItems={data.length}
      itemsPerPage={itemsPerPage}
      onPageChange={setCurrentPage}
    />
  </>
);
```

## Common Patterns

### Sortable Table Headers

```jsx
<SortableTableHeader
  sortKey="name"
  currentSortKey={sortKey}
  currentSortDirection={sortDirection}
  onSort={handleSort}
>
  Name
</SortableTableHeader>
```

### Status Indicators

```jsx
<TableCell>
  <Box 
    display="inline-flex" 
    px="s" 
    py="xs" 
    shape="pill" 
    skin={status === 'active' ? 'success' : 'neutral'}
  >
    <Text fontSize="xs" color="white">
      {status}
    </Text>
  </Box>
</TableCell>
```

### Action Buttons

```jsx
<TableCell>
  <Box display="flex" gap="xs" justifyContent="flex-end">
    <Button variant="ghost" $size="small">Edit</Button>
    <Button variant="ghost" $size="small">Delete</Button>
  </Box>
</TableCell>
```

### Responsive Tables

For mobile responsiveness, wrap the table in a scrollable container:

```jsx
<Box overflowX="auto">
  <Table compact>
    {/* Table content */}
  </Table>
</Box>
```

## TypeScript

All components are fully typed with TypeScript:

```typescript
import type {
  TableProps,
  TableHeaderProps,
  TableBodyProps,
  TableFooterProps,
  TableRowProps,
  TableCellProps,
  SortableTableHeaderProps,
  TablePaginationProps,
  SortDirection
} from '@reactberry/system/blocks';
```

## Performance Considerations

1. **Large datasets**: For tables with many rows, consider implementing virtualization
2. **Sticky headers**: Use `stickyHeader` prop for better UX with long tables
3. **Compact mode**: Use `compact` prop for data-dense tables
4. **Conditional rendering**: Only render visible columns based on viewport

## Migration from HTML Tables

To migrate from standard HTML tables:

1. Replace `<table>` with `<Table>`
2. Replace `<thead>` with `<TableHeader>`
3. Replace `<tbody>` with `<TableBody>`
4. Replace `<tr>` with `<TableRow>`
5. Replace `<td>` with `<TableCell>`
6. Replace `<th>` with `<TableCell header>`

```jsx
// Before
<table>
  <thead>
    <tr>
      <th>Name</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>John</td>
    </tr>
  </tbody>
</table>

// After
<Table>
  <TableHeader>
    <TableRow>
      <TableCell header>Name</TableCell>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>John</TableCell>
    </TableRow>
  </TableBody>
</Table>
```
