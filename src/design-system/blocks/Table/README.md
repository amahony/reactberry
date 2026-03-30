# Table Component

A flexible, accessible, and themeable table component built with the design system's Box and Text components. It provides a complete solution for displaying tabular data with support for sorting, pagination, and various styling options.

## Components

### Core Components

- **Table** - Main container component with theming support
- **TableHeader** - Container for header rows (`<thead>`)
- **TableBody** - Container for body rows (`<tbody>`)
- **TableFooter** - Container for footer rows (`<tfoot>`)
- **TableRow** - Individual table row (`<tr>`)
- **TableCell** - Table cell that can be either `<td>` or `<th>`

### Advanced Components

- **SortableTableHeader** - Header cell with built-in sorting functionality
- **TablePagination** - Pagination controls for large datasets

### Utility Hooks

- **useTableControls** - Manages sorting and pagination state
- **useTableFilters** - Handles filtering logic
- **useFilteredTableControls** - Combines filtering with table controls

## Installation

The Table component is part of the design system blocks:

```tsx
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  SortableTableHeader,
  TablePagination,
  useTableControls
} from '@/design-system/blocks';
```

## Basic Usage

### Simple Table

```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableCell header>Name</TableCell>
      <TableCell header>Email</TableCell>
      <TableCell header>Role</TableCell>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell>john@example.com</TableCell>
      <TableCell>Developer</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### Styled Table

```tsx
<Table striped hoverable stickyHeader>
  <TableHeader>
    <TableRow>
      <TableCell header>Product</TableCell>
      <TableCell header align="center">Quantity</TableCell>
      <TableCell header align="right">Price</TableCell>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Widget A</TableCell>
      <TableCell align="center">10</TableCell>
      <TableCell align="right">$99.99</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

## Advanced Usage

### Table with Sorting and Pagination

```tsx
function DataTable() {
  const {
    currentData,
    sortKey,
    sortDirection,
    handleSort,
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    handlePageChange,
    handlePageSizeChange,
  } = useTableControls({
    data: users,
    initialItemsPerPage: 10,
  });

  return (
    <>
      <Table striped hoverable>
        <TableHeader>
          <TableRow>
            <SortableTableHeader
              sortKey="name"
              currentSortKey={sortKey}
              currentSortDirection={sortDirection}
              onSort={handleSort}
            >
              Name
            </SortableTableHeader>
            <SortableTableHeader
              sortKey="email"
              currentSortKey={sortKey}
              currentSortDirection={sortDirection}
              onSort={handleSort}
            >
              Email
            </SortableTableHeader>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        showPageSize
        onPageSizeChange={handlePageSizeChange}
      />
    </>
  );
}
```

## Props

### Table Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `striped` | `boolean` | `false` | Apply alternating row colors |
| `hoverable` | `boolean` | `false` | Enable hover effects on rows |
| `compact` | `boolean` | `false` | Reduce padding for a condensed layout |
| `bordered` | `boolean` | `true` | Add borders to all cells |
| `stickyHeader` | `boolean` | `false` | Make the header sticky on scroll |
| `skin` | `'base' \| 'surface' \| 'card'` | `'surface'` | Apply predefined styling |

### TableCell Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `header` | `boolean` | `false` | Render as header cell (th) |
| `align` | `'left' \| 'center' \| 'right'` | `'left'` | Text alignment |
| `colSpan` | `number` | - | Column span |
| `rowSpan` | `number` | - | Row span |

### TableRow Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `selected` | `boolean` | `false` | Highlight the row as selected |
| `clickable` | `boolean` | `false` | Apply clickable styling |

### SortableTableHeader Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sortKey` | `string` | - | Column key for sorting |
| `currentSortKey` | `string` | - | Currently active sort key |
| `currentSortDirection` | `'asc' \| 'desc' \| null` | - | Current sort direction |
| `onSort` | `(key: string, direction: SortDirection) => void` | - | Sort handler |
| `sortable` | `boolean` | `true` | Enable/disable sorting |

### TablePagination Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `currentPage` | `number` | - | Current page (0-based) |
| `totalPages` | `number` | - | Total number of pages |
| `totalItems` | `number` | - | Total number of items |
| `itemsPerPage` | `number` | - | Items per page |
| `onPageChange` | `(page: number) => void` | - | Page change handler |
| `showPageSize` | `boolean` | `false` | Show page size selector |
| `pageSizeOptions` | `number[]` | `[10, 25, 50, 100]` | Page size options |
| `onPageSizeChange` | `(size: number) => void` | - | Page size change handler |

## Styling

The Table component integrates seamlessly with the design system theme:

- Uses theme tokens for colors, spacing, and typography
- Supports all Box component props for custom styling
- Maintains semantic HTML structure
- Fully responsive with horizontal scrolling

### Custom Styling Example

```tsx
<Table
  striped
  style={{
    '--table-header-bg': 'var(--colors-palette-blue-100)',
    '--table-header-color': 'var(--colors-palette-blue-900)',
  }}
>
  {/* Table content */}
</Table>
```

## Accessibility

- Semantic HTML with proper table structure
- ARIA labels and roles where appropriate
- Keyboard navigation support
- Screen reader friendly
- Proper focus management

## Best Practices

1. **Always use semantic structure** - Include TableHeader, TableBody, and optionally TableFooter
2. **Provide descriptive headers** - Every column should have a clear header
3. **Use appropriate alignment** - Numbers right, text left, actions center
4. **Consider mobile** - Use horizontal scrolling or compact mode for responsive tables
5. **Limit visible rows** - Use pagination for large datasets
6. **Provide feedback** - Show loading, empty, and error states appropriately

## Examples

See the [Table Patterns documentation](../../docs/examples/tables/table-patterns.md) for more examples and use cases.