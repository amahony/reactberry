# Table Component Patterns

The Table component provides a flexible and accessible way to display tabular data using the design system's theming and styling capabilities.

## Basic Table

The simplest table with default styling:

```jsx
import { Table, TableHeader, TableBody, TableRow, TableCell } from '@/design-system/blocks';

function BasicTable() {
  return (
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
        <TableRow>
          <TableCell>Jane Smith</TableCell>
          <TableCell>jane@example.com</TableCell>
          <TableCell>Designer</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
```

## Striped Table with Hover

A table with alternating row colors and hover effects:

```jsx
function StripedTable() {
  return (
    <Table striped hoverable>
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
        <TableRow>
          <TableCell>Widget B</TableCell>
          <TableCell align="center">5</TableCell>
          <TableCell align="right">$149.99</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
```

## Complex Table with Merged Cells

Tables with colspan and rowspan for complex layouts:

```jsx
function ComplexTable() {
  return (
    <Table bordered stickyHeader>
      <TableHeader>
        <TableRow>
          <TableCell header rowSpan={2}>ID</TableCell>
          <TableCell header colSpan={2} align="center">
            Q1 2024
          </TableCell>
          <TableCell header colSpan={2} align="center">
            Q2 2024
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell header>Revenue</TableCell>
          <TableCell header>Profit</TableCell>
          <TableCell header>Revenue</TableCell>
          <TableCell header>Profit</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>001</TableCell>
          <TableCell>$10,000</TableCell>
          <TableCell>$2,000</TableCell>
          <TableCell>$12,000</TableCell>
          <TableCell>$3,000</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
```

## Interactive Table with Actions

A table with interactive elements:

```jsx
import { Button, Text } from '@/design-system/elements';

function InteractiveTable() {
  const [selectedRows, setSelectedRows] = useState([]);

  const toggleRow = (id) => {
    setSelectedRows(prev => 
      prev.includes(id) 
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    );
  };

  return (
    <Table hoverable>
      <TableHeader>
        <TableRow>
          <TableCell header width="50px">
            <input type="checkbox" />
          </TableCell>
          <TableCell header>Name</TableCell>
          <TableCell header>Status</TableCell>
          <TableCell header>Actions</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(item => (
          <TableRow 
            key={item.id} 
            selected={selectedRows.includes(item.id)}
            clickable
          >
            <TableCell>
              <input 
                type="checkbox" 
                checked={selectedRows.includes(item.id)}
                onChange={() => toggleRow(item.id)}
              />
            </TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>
              <Box display="inline-flex" px="s" py="xs" shape="pill" 
                   skin={item.active ? 'success' : 'neutral'}>
                <Text fontSize="xs" color="white">
                  {item.active ? 'Active' : 'Inactive'}
                </Text>
              </Box>
            </TableCell>
            <TableCell>
              <Box display="flex" gap="xs">
                <Button variant="ghost" $size="small">Edit</Button>
                <Button variant="ghost" $size="small">Delete</Button>
              </Box>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

## Responsive Table Pattern

For mobile-responsive tables, wrap in a scrollable container:

```jsx
function ResponsiveTable() {
  return (
    <Box overflowX="auto">
      <Table compact>
        <TableHeader>
          <TableRow>
            <TableCell header>Order ID</TableCell>
            <TableCell header>Customer</TableCell>
            <TableCell header>Date</TableCell>
            <TableCell header>Status</TableCell>
            <TableCell header align="right">Total</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map(order => (
            <TableRow key={order.id}>
              <TableCell>
                <Text fontSize="xs" fontFamily="mono">
                  {order.id}
                </Text>
              </TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>
                <Text fontSize="xs" color="secondary">
                  {order.date}
                </Text>
              </TableCell>
              <TableCell>
                <StatusBadge status={order.status} />
              </TableCell>
              <TableCell align="right">
                <Text fontWeight="semibold">
                  ${order.total.toFixed(2)}
                </Text>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
```

## Custom Styled Table

Using custom styling with the design system:

```jsx
function CustomStyledTable() {
  return (
    <Table
      skin="card"
      css={{
        '& thead th': {
          backgroundColor: 'var(--colors-palette-blue-100)',
          color: 'var(--colors-palette-blue-900)',
          textTransform: 'uppercase',
          fontSize: 'var(--fontSizes-xs)',
          letterSpacing: '0.05em',
        },
        '& tbody tr:hover': {
          backgroundColor: 'var(--colors-palette-blue-50)',
        },
      }}
    >
      <TableHeader>
        <TableRow>
          <TableCell header>Feature</TableCell>
          <TableCell header align="center">Basic</TableCell>
          <TableCell header align="center">Pro</TableCell>
          <TableCell header align="center">Enterprise</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>
            <Text fontWeight="medium">Users</Text>
          </TableCell>
          <TableCell align="center">10</TableCell>
          <TableCell align="center">100</TableCell>
          <TableCell align="center">Unlimited</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Text fontWeight="medium">Storage</Text>
          </TableCell>
          <TableCell align="center">10GB</TableCell>
          <TableCell align="center">100GB</TableCell>
          <TableCell align="center">1TB</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
```

## Table with Footer

Including a footer for totals or summaries:

```jsx
import { TableFooter } from '@/design-system/blocks';

function TableWithFooter() {
  const items = [
    { name: 'Product A', quantity: 5, price: 10.00 },
    { name: 'Product B', quantity: 3, price: 25.00 },
    { name: 'Product C', quantity: 2, price: 15.00 },
  ];

  const total = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);

  return (
    <Table bordered>
      <TableHeader>
        <TableRow>
          <TableCell header>Product</TableCell>
          <TableCell header align="center">Quantity</TableCell>
          <TableCell header align="right">Price</TableCell>
          <TableCell header align="right">Subtotal</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.name}</TableCell>
            <TableCell align="center">{item.quantity}</TableCell>
            <TableCell align="right">${item.price.toFixed(2)}</TableCell>
            <TableCell align="right">
              ${(item.quantity * item.price).toFixed(2)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3} align="right">
            <Text fontWeight="bold">Total:</Text>
          </TableCell>
          <TableCell align="right">
            <Text fontWeight="bold" fontSize="l">
              ${total.toFixed(2)}
            </Text>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
```

## Advanced Table with Sorting and Pagination

Using the SortableTableHeader and TablePagination components:

```jsx
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableCell,
  SortableTableHeader,
  TablePagination 
} from '@/design-system/blocks';
import { useState, useMemo } from 'react';

function AdvancedTable() {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortKey, setSortKey] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);

  // Sample data
  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Developer', joinDate: '2023-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Designer', joinDate: '2023-02-20' },
    // ... more data
  ];

  // Sort data
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

  // Paginate data
  const paginatedData = useMemo(() => {
    const start = currentPage * itemsPerPage;
    return sortedData.slice(start, start + itemsPerPage);
  }, [sortedData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const handleSort = (key, direction) => {
    setSortKey(direction ? key : null);
    setSortDirection(direction);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size) => {
    setItemsPerPage(size);
    setCurrentPage(0); // Reset to first page
  };

  return (
    <Box>
      <Table striped hoverable stickyHeader>
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
            <SortableTableHeader
              sortKey="role"
              currentSortKey={sortKey}
              currentSortDirection={sortDirection}
              onSort={handleSort}
            >
              Role
            </SortableTableHeader>
            <SortableTableHeader
              sortKey="joinDate"
              currentSortKey={sortKey}
              currentSortDirection={sortDirection}
              onSort={handleSort}
              align="right"
            >
              Join Date
            </SortableTableHeader>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell align="right">{user.joinDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={sortedData.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        showPageSize
        onPageSizeChange={handlePageSizeChange}
      />
    </Box>
  );
}
```

## Data Table with Filters

Combining table with filter controls:

```jsx
function FilterableTable() {
  const [filters, setFilters] = useState({
    status: 'all',
    department: 'all',
    search: ''
  });

  const filteredData = useMemo(() => {
    return data.filter(item => {
      if (filters.status !== 'all' && item.status !== filters.status) return false;
      if (filters.department !== 'all' && item.department !== filters.department) return false;
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return (
          item.name.toLowerCase().includes(searchLower) ||
          item.email.toLowerCase().includes(searchLower)
        );
      }
      return true;
    });
  }, [data, filters]);

  return (
    <Box>
      {/* Filter Controls */}
      <Box display="flex" gap="m" mb="m" flexWrap="wrap">
        <Box>
          <Text as="label" fontSize="s" color="secondary" mb="xs">
            Search
          </Text>
          <Field
            as="input"
            type="text"
            placeholder="Search by name or email..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            variant="outline"
            $size="small"
          />
        </Box>
        
        <Box>
          <Text as="label" fontSize="s" color="secondary" mb="xs">
            Status
          </Text>
          <Box as="select" p="xs" shape="rounded" skin="surface">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </Box>
        </Box>
        
        <Box>
          <Text as="label" fontSize="s" color="secondary" mb="xs">
            Department
          </Text>
          <Box as="select" p="xs" shape="rounded" skin="surface">
            <option value="all">All Departments</option>
            <option value="engineering">Engineering</option>
            <option value="design">Design</option>
            <option value="marketing">Marketing</option>
          </Box>
        </Box>
      </Box>

      {/* Results Summary */}
      <Box mb="s">
        <Text fontSize="s" color="secondary">
          Found {filteredData.length} results
        </Text>
      </Box>

      {/* Table */}
      <Table striped hoverable>
        {/* Table content */}
      </Table>
    </Box>
  );
}
```

## Expandable Row Table

Table with expandable rows for additional details:

```jsx
function ExpandableTable() {
  const [expandedRows, setExpandedRows] = useState(new Set());

  const toggleRow = (id) => {
    setExpandedRows(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell header width="40px"></TableCell>
          <TableCell header>Order ID</TableCell>
          <TableCell header>Customer</TableCell>
          <TableCell header align="right">Total</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map(order => (
          <React.Fragment key={order.id}>
            <TableRow clickable onClick={() => toggleRow(order.id)}>
              <TableCell>
                <Button variant="ghost" $size="small">
                  {expandedRows.has(order.id) ? '−' : '+'}
                </Button>
              </TableCell>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell align="right">${order.total}</TableCell>
            </TableRow>
            
            {expandedRows.has(order.id) && (
              <TableRow>
                <TableCell colSpan={4}>
                  <Box p="m" skin="base">
                    <Text fontSize="s" fontWeight="semibold" mb="s">
                      Order Details
                    </Text>
                    <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap="m">
                      <Box>
                        <Text fontSize="xs" color="secondary">Shipping Address</Text>
                        <Text fontSize="s">{order.shippingAddress}</Text>
                      </Box>
                      <Box>
                        <Text fontSize="xs" color="secondary">Order Date</Text>
                        <Text fontSize="s">{order.date}</Text>
                      </Box>
                      <Box>
                        <Text fontSize="xs" color="secondary">Status</Text>
                        <Text fontSize="s">{order.status}</Text>
                      </Box>
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </React.Fragment>
        ))}
      </TableBody>
    </Table>
  );
}
```

## Best Practices for Advanced Tables

### 1. Performance Optimization

- Use `useMemo` for expensive computations (sorting, filtering)
- Implement virtualization for very large datasets
- Debounce search/filter inputs
- Consider server-side pagination for massive datasets

### 2. Accessibility

- Provide clear labels for sortable columns
- Include aria-labels for pagination controls
- Ensure keyboard navigation works properly
- Announce changes to screen readers

### 3. Mobile Responsiveness

- Use horizontal scrolling for wide tables
- Consider card-based layouts for mobile
- Hide non-essential columns on small screens
- Use the `compact` prop for mobile views

### 4. User Experience

- Maintain sort/filter state in URL for shareable views
- Show loading states during data fetches
- Provide clear feedback for user actions
- Include export functionality for data tables

## Props Reference

### Table Props
- `striped?: boolean` - Apply alternating row colors
- `hoverable?: boolean` - Enable hover effects on rows
- `compact?: boolean` - Reduce padding for a more compact layout
- `bordered?: boolean` - Add borders to all cells (default: true)
- `stickyHeader?: boolean` - Make the header sticky on scroll
- `skin?: 'base' | 'surface' | 'card'` - Apply predefined styling

### TableCell Props
- `header?: boolean` - Render as a header cell (th)
- `align?: 'left' | 'center' | 'right'` - Text alignment
- `colSpan?: number` - Column span
- `rowSpan?: number` - Row span

### TableRow Props
- `selected?: boolean` - Highlight the row as selected
- `clickable?: boolean` - Apply clickable styling

## Best Practices

1. **Use semantic structure**: Always include TableHeader and TableBody
2. **Provide headers**: Every column should have a descriptive header
3. **Align content appropriately**: Numbers right, text left, actions center
4. **Keep it scannable**: Use striping or hover effects for long tables
5. **Mobile consideration**: Use compact mode or horizontal scrolling for responsive tables
6. **Accessibility**: Use proper table structure and header cells for screen readers