# Complete Table Example

This example demonstrates a fully-featured data table using all the Table components and hooks together.

## Full Implementation

```jsx
import React, { useState } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  SortableTableHeader,
  TablePagination,
  useFilteredTableControls,
  Box,
  Text,
  Field,
  Button,
} from '@/design-system';

// Sample data type
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  status: 'active' | 'inactive';
  joinDate: string;
  lastActive: string;
}

// Sample data
const users: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Senior Developer',
    department: 'Engineering',
    status: 'active',
    joinDate: '2023-01-15',
    lastActive: '2024-01-10',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Product Designer',
    department: 'Design',
    status: 'active',
    joinDate: '2023-02-20',
    lastActive: '2024-01-09',
  },
  // ... add more sample data
];

function UserManagementTable() {
  const [selectedUsers, setSelectedUsers] = useState<Set<number>>(new Set());

  // Use the combined table controls hook
  const {
    // Filtered and paginated data
    data: currentUsers,
    // Filter controls
    filters,
    updateFilter,
    resetFilters,
    hasActiveFilters,
    // Sort controls
    sortKey,
    sortDirection,
    handleSort,
    // Pagination controls
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    handlePageChange,
    handlePageSizeChange,
  } = useFilteredTableControls(
    {
      // Filter configuration
      data: users,
      filterFunctions: {
        search: (user, value) => {
          if (!value) return true;
          const searchLower = value.toLowerCase();
          return (
            user.name.toLowerCase().includes(searchLower) ||
            user.email.toLowerCase().includes(searchLower) ||
            user.role.toLowerCase().includes(searchLower)
          );
        },
        status: (user, value) => value === 'all' || user.status === value,
        department: (user, value) => value === 'all' || user.department === value,
      },
      initialFilters: {
        search: '',
        status: 'all',
        department: 'all',
      },
    },
    {
      // Table control configuration
      initialItemsPerPage: 10,
      initialSortKey: 'name',
      initialSortDirection: 'asc',
    }
  );

  // Toggle user selection
  const toggleUserSelection = (userId: number) => {
    setSelectedUsers((prev) => {
      const next = new Set(prev);
      if (next.has(userId)) {
        next.delete(userId);
      } else {
        next.add(userId);
      }
      return next;
    });
  };

  // Select all users on current page
  const toggleSelectAll = () => {
    const currentUserIds = currentUsers.map((u) => u.id);
    const allSelected = currentUserIds.every((id) => selectedUsers.has(id));

    if (allSelected) {
      // Deselect all on current page
      setSelectedUsers((prev) => {
        const next = new Set(prev);
        currentUserIds.forEach((id) => next.delete(id));
        return next;
      });
    } else {
      // Select all on current page
      setSelectedUsers((prev) => {
        const next = new Set(prev);
        currentUserIds.forEach((id) => next.add(id));
        return next;
      });
    }
  };

  const isAllSelected =
    currentUsers.length > 0 &&
    currentUsers.every((user) => selectedUsers.has(user.id));

  return (
    <Box>
      {/* Header */}
      <Box mb="l">
        <Text as="h2" fontSize="xl" fontWeight="bold" mb="s">
          User Management
        </Text>
        <Text fontSize="m" color="secondary">
          Manage your organization's users and permissions
        </Text>
      </Box>

      {/* Filters */}
      <Box mb="m" p="m" skin="surface" shape="rounded">
        <Box display="flex" gap="m" flexWrap="wrap" alignItems="flex-end">
          <Box flex="1" minWidth="200px">
            <Text as="label" fontSize="s" color="secondary" mb="xs">
              Search
            </Text>
            <Field
              as="input"
              type="text"
              placeholder="Search by name, email, or role..."
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              variant="outline"
              $size="medium"
            />
          </Box>

          <Box minWidth="150px">
            <Text as="label" fontSize="s" color="secondary" mb="xs">
              Status
            </Text>
            <Box
              as="select"
              p="s"
              shape="rounded"
              border="1px solid"
              borderColor="palette.neutrals.300"
              fontSize="s"
              width="100%"
              value={filters.status}
              onChange={(e) => updateFilter('status', e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </Box>
          </Box>

          <Box minWidth="150px">
            <Text as="label" fontSize="s" color="secondary" mb="xs">
              Department
            </Text>
            <Box
              as="select"
              p="s"
              shape="rounded"
              border="1px solid"
              borderColor="palette.neutrals.300"
              fontSize="s"
              width="100%"
              value={filters.department}
              onChange={(e) => updateFilter('department', e.target.value)}
            >
              <option value="all">All Departments</option>
              <option value="Engineering">Engineering</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
            </Box>
          </Box>

          {hasActiveFilters && (
            <Button variant="ghost" $size="small" onClick={resetFilters}>
              Clear Filters
            </Button>
          )}
        </Box>

        {/* Results summary */}
        <Box mt="s">
          <Text fontSize="s" color="secondary">
            Found {totalItems} user{totalItems !== 1 ? 's' : ''}
            {hasActiveFilters && ' matching your filters'}
          </Text>
        </Box>
      </Box>

      {/* Actions Bar */}
      {selectedUsers.size > 0 && (
        <Box mb="s" p="s" skin="blue" shape="rounded" display="flex" alignItems="center" gap="m">
          <Text fontSize="s" color="white">
            {selectedUsers.size} user{selectedUsers.size !== 1 ? 's' : ''} selected
          </Text>
          <Box display="flex" gap="s">
            <Button variant="secondary" $size="small">
              Export
            </Button>
            <Button variant="secondary" $size="small">
              Send Email
            </Button>
            <Button variant="secondary" $size="small">
              Deactivate
            </Button>
          </Box>
        </Box>
      )}

      {/* Table */}
      <Table striped hoverable stickyHeader>
        <TableHeader>
          <TableRow>
            <TableCell header width="40px">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={toggleSelectAll}
                aria-label="Select all users"
              />
            </TableCell>
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
              sortKey="department"
              currentSortKey={sortKey}
              currentSortDirection={sortDirection}
              onSort={handleSort}
            >
              Department
            </SortableTableHeader>
            <TableCell header align="center">
              Status
            </TableCell>
            <SortableTableHeader
              sortKey="lastActive"
              currentSortKey={sortKey}
              currentSortDirection={sortDirection}
              onSort={handleSort}
              align="right"
            >
              Last Active
            </SortableTableHeader>
            <TableCell header align="center">
              Actions
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentUsers.map((user) => (
            <TableRow key={user.id} selected={selectedUsers.has(user.id)}>
              <TableCell>
                <input
                  type="checkbox"
                  checked={selectedUsers.has(user.id)}
                  onChange={() => toggleUserSelection(user.id)}
                  aria-label={`Select ${user.name}`}
                />
              </TableCell>
              <TableCell>
                <Box display="flex" alignItems="center" gap="s">
                  <Box
                    width="32px"
                    height="32px"
                    borderRadius="50%"
                    bg="palette.blue.200"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text fontSize="xs" fontWeight="semibold" color="palette.blue.800">
                      {user.name.charAt(0).toUpperCase()}
                    </Text>
                  </Box>
                  <Text fontSize="s" fontWeight="medium">
                    {user.name}
                  </Text>
                </Box>
              </TableCell>
              <TableCell>
                <Text fontSize="s" color="secondary">
                  {user.email}
                </Text>
              </TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.department}</TableCell>
              <TableCell align="center">
                <Box
                  display="inline-flex"
                  px="s"
                  py="xs"
                  shape="pill"
                  skin={user.status === 'active' ? 'success' : 'neutral'}
                >
                  <Text fontSize="xs" color="white" fontWeight="medium">
                    {user.status === 'active' ? 'Active' : 'Inactive'}
                  </Text>
                </Box>
              </TableCell>
              <TableCell align="right">
                <Text fontSize="s" color="secondary">
                  {new Date(user.lastActive).toLocaleDateString()}
                </Text>
              </TableCell>
              <TableCell align="center">
                <Box display="flex" gap="xs" justifyContent="center">
                  <Button variant="ghost" $size="small">
                    Edit
                  </Button>
                  <Button variant="ghost" $size="small">
                    Delete
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        showPageSize
        pageSizeOptions={[5, 10, 25, 50]}
        onPageSizeChange={handlePageSizeChange}
      />
    </Box>
  );
}

export default UserManagementTable;
```

## Key Features Demonstrated

1. **Filtering**: Search box and dropdown filters with real-time updates
2. **Sorting**: Click column headers to sort ascending/descending
3. **Pagination**: Navigate pages and change items per page
4. **Selection**: Individual and bulk selection with actions
5. **Responsive**: Mobile-friendly with horizontal scrolling
6. **Accessible**: Proper ARIA labels and keyboard navigation
7. **Themed**: Uses design system tokens for consistent styling

## Usage Tips

- The `useFilteredTableControls` hook combines filtering and table controls
- Filter functions should return `true` to include items
- Sort functions can be customized for complex data types
- Use `useMemo` for expensive computations outside the hooks
- Consider server-side operations for very large datasets