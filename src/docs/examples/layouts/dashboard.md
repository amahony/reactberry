# Dashboard Layout Examples

This document provides comprehensive examples for building dashboard layouts using the PocketAgent Design System.

## Basic Dashboard

```jsx
import { Box, Text, Button } from '@/design-system/elements';

function BasicDashboard() {
  return (
    <Box minHeight="100vh" bg="base">
      {/* Header */}
      <Box as="header" skin="surface" p="m" borderBottom="1px solid" borderColor="neutral.3">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Text as="h1" fontSize="l" fontWeight="bold" color="primary">
            Dashboard
          </Text>
          <Box display="flex" gap="s" alignItems="center">
            <Button variant="outline" $size="small">Settings</Button>
            <Button variant="primary" $size="small">New Project</Button>
          </Box>
        </Box>
      </Box>

      {/* Main Content */}
      <Box display="flex" flex="1">
        {/* Sidebar */}
        <Box as="aside" width="250px" skin="panel" p="m">
          <NavigationMenu />
        </Box>

        {/* Content Area */}
        <Box as="main" flex="1" p="l">
          <StatsGrid />
          <RecentActivity />
        </Box>
      </Box>
    </Box>
  );
}
```

## Responsive Dashboard

```jsx
function ResponsiveDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Box minHeight="100vh" bg="base">
      {/* Mobile Header */}
      <Box 
        as="header" 
        skin="surface" 
        p="m" 
        display={["flex", "none"]} 
        alignItems="center" 
        justifyContent="space-between"
      >
        <Button 
          variant="ghost" 
          $size="small" 
          onClick={() => setSidebarOpen(true)}
        >
          ☰
        </Button>
        <Text as="h1" fontSize="m" fontWeight="bold">Dashboard</Text>
        <Box width="32px" /> {/* Spacer */}
      </Box>

      <Box display="flex" flex="1">
        {/* Sidebar - Desktop persistent, mobile overlay */}
        <Box
          as="aside"
          width={["100vw", "250px"]}
          position={["fixed", "relative"]}
          top={["0", "auto"]}
          left={[sidebarOpen ? "0" : "-100vw", "auto"]}
          height={["100vh", "auto"]}
          zIndex={[1000, "auto"]}
          skin="panel"
          p="m"
          transition="left 0.3s ease"
        >
          {/* Mobile close button */}
          <Box display={["flex", "none"]} justifyContent="flex-end" mb="m">
            <Button 
              variant="ghost" 
              $size="small" 
              onClick={() => setSidebarOpen(false)}
            >
              ✕
            </Button>
          </Box>
          
          <NavigationMenu onItemClick={() => setSidebarOpen(false)} />
        </Box>

        {/* Main Content */}
        <Box as="main" flex="1" p={["m", "l"]}>
          {/* Desktop Header */}
          <Box 
            display={["none", "flex"]} 
            alignItems="center" 
            justifyContent="space-between" 
            mb="l"
          >
            <Text as="h1" fontSize="xl" fontWeight="bold" color="primary">
              Dashboard
            </Text>
            <Box display="flex" gap="s">
              <Button variant="outline" $size="medium">Settings</Button>
              <Button variant="primary" $size="medium">New Project</Button>
            </Box>
          </Box>

          <StatsGrid />
          <RecentActivity />
        </Box>
      </Box>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <Box
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="rgba(0, 0, 0, 0.5)"
          zIndex={999}
          display={["block", "none"]}
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </Box>
  );
}
```

## Navigation Menu Component

```jsx
function NavigationMenu({ onItemClick }) {
  const [activeItem, setActiveItem] = useState('overview');

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'projects', label: 'Projects', icon: '📁' },
    { id: 'team', label: 'Team', icon: '👥' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <Box display="flex" flexDirection="column" gap="xs">
      <Text as="h3" fontSize="s" fontWeight="medium" color="secondary" mb="xs">
        Navigation
      </Text>
      
      {menuItems.map(item => (
        <NavigationItem
          key={item.id}
          {...item}
          active={activeItem === item.id}
          onClick={() => {
            setActiveItem(item.id);
            onItemClick?.();
          }}
        />
      ))}
    </Box>
  );
}

function NavigationItem({ label, icon, active, onClick }) {
  return (
    <Box
      as="button"
      p="s"
      width="100%"
      display="flex"
      alignItems="center"
      gap="s"
      textAlign="left"
      skin={active ? "highlight" : "transparent"}
      hover="subtle"
      shape="rounded"
      cursor="pointer"
      onClick={onClick}
    >
      <Text fontSize="s">{icon}</Text>
      <Text fontSize="s" fontWeight={active ? "medium" : "normal"}>
        {label}
      </Text>
    </Box>
  );
}
```

## Stats Grid Component

```jsx
function StatsGrid() {
  const stats = [
    { title: 'Total Projects', value: '24', trend: '+12%', trendType: 'positive' },
    { title: 'Active Users', value: '1,847', trend: '+5%', trendType: 'positive' },
    { title: 'Revenue', value: '$12,450', trend: '+18%', trendType: 'positive' },
    { title: 'Conversion Rate', value: '3.2%', trend: '-2%', trendType: 'negative' },
  ];

  return (
    <Box mb="xl">
      <Text as="h2" fontSize="l" fontWeight="bold" color="primary" mb="m">
        Overview
      </Text>
      
      <Box 
        display="grid" 
        gridTemplateColumns={[
          "1fr",
          "1fr 1fr",
          "repeat(4, 1fr)"
        ]}
        gap={["s", "m", "l"]}
      >
        {stats.map(stat => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </Box>
    </Box>
  );
}

function StatsCard({ title, value, trend, trendType }) {
  return (
    <Box skin="card" p="m" gap="s">
      <Text as="h3" fontSize="s" fontWeight="medium" color="secondary">
        {title}
      </Text>
      <Text as="p" fontSize={["xl", "xxl"]} fontWeight="bold" color="primary">
        {value}
      </Text>
      <Box display="flex" alignItems="center" gap="xs">
        <Text 
          fontSize="xs" 
          color={trendType === 'positive' ? 'success' : 'error'} 
          fontWeight="medium"
        >
          {trend}
        </Text>
        <Text fontSize="xs" color="secondary">
          vs last month
        </Text>
      </Box>
    </Box>
  );
}
```

## Recent Activity Component

```jsx
function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: 'project_created',
      user: 'John Doe',
      action: 'created a new project',
      target: 'Website Redesign',
      timestamp: '2 hours ago',
      avatar: 'JD'
    },
    {
      id: 2,
      type: 'task_completed',
      user: 'Jane Smith',
      action: 'completed task',
      target: 'User Authentication',
      timestamp: '4 hours ago',
      avatar: 'JS'
    },
    {
      id: 3,
      type: 'comment_added',
      user: 'Mike Johnson',
      action: 'added a comment to',
      target: 'API Documentation',
      timestamp: '6 hours ago',
      avatar: 'MJ'
    },
  ];

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb="m">
        <Text as="h2" fontSize="l" fontWeight="bold" color="primary">
          Recent Activity
        </Text>
        <Button variant="outline" $size="small">
          View All
        </Button>
      </Box>

      <Box skin="card" overflow="hidden">
        {activities.map((activity, index) => (
          <Box
            key={activity.id}
            p="m"
            borderBottom={index < activities.length - 1 ? "1px solid" : "none"}
            borderColor="neutral.3"
            hover="surface"
          >
            <Box display="flex" alignItems="center" gap="m">
              {/* Avatar */}
              <Box
                width="40px"
                height="40px"
                skin="primary"
                shape="circle"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Text fontSize="s" fontWeight="bold" color="white">
                  {activity.avatar}
                </Text>
              </Box>

              {/* Content */}
              <Box flex="1">
                <Text fontSize="s" lineHeight="relaxed">
                  <Text as="span" fontWeight="medium">{activity.user}</Text>
                  {' '}
                  <Text as="span" color="secondary">{activity.action}</Text>
                  {' '}
                  <Text as="span" fontWeight="medium">{activity.target}</Text>
                </Text>
                <Text fontSize="xs" color="tertiary">
                  {activity.timestamp}
                </Text>
              </Box>

              {/* Action Icon */}
              <Box
                skin={getActivitySkin(activity.type)}
                px="xs"
                py="mini"
                shape="rounded"
              >
                <Text fontSize="xs">
                  {getActivityIcon(activity.type)}
                </Text>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

function getActivityIcon(type) {
  const icons = {
    project_created: '📁',
    task_completed: '✅',
    comment_added: '💬',
  };
  return icons[type] || '📌';
}

function getActivitySkin(type) {
  const skins = {
    project_created: 'blue',
    task_completed: 'green',
    comment_added: 'yellow',
  };
  return skins[type] || 'neutral';
}
```

## Admin Dashboard Layout

```jsx
function AdminDashboard() {
  return (
    <Box minHeight="100vh" bg="base">
      {/* Top Navigation */}
      <Box as="header" skin="surface" px="l" py="m" borderBottom="1px solid" borderColor="neutral.3">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap="l">
            <Text as="h1" fontSize="l" fontWeight="bold" color="primary">
              Admin Dashboard
            </Text>
            
            {/* Breadcrumbs */}
            <Box display="flex" alignItems="center" gap="xs">
              <Text fontSize="s" color="secondary">Dashboard</Text>
              <Text fontSize="s" color="tertiary">></Text>
              <Text fontSize="s" color="primary">Overview</Text>
            </Box>
          </Box>

          {/* User Menu */}
          <Box display="flex" alignItems="center" gap="m">
            <Box skin="warning" px="s" py="xs" shape="rounded">
              <Text fontSize="xs" fontWeight="medium">
                🔔 3 alerts
              </Text>
            </Box>
            
            <Box display="flex" alignItems="center" gap="s" cursor="pointer" hover="subtle" p="xs" shape="rounded">
              <Box
                width="32px"
                height="32px"
                skin="primary"
                shape="circle"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Text fontSize="s" fontWeight="bold" color="white">
                  AD
                </Text>
              </Box>
              <Text fontSize="s" fontWeight="medium">Admin User</Text>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box display="flex" flex="1">
        {/* Sidebar */}
        <Box as="aside" width="280px" skin="panel" p="m" borderRight="1px solid" borderColor="neutral.3">
          <AdminNavigation />
        </Box>

        {/* Main Content */}
        <Box as="main" flex="1" p="l">
          <AdminStats />
          <AdminTables />
        </Box>
      </Box>
    </Box>
  );
}

function AdminNavigation() {
  const sections = [
    {
      title: 'Main',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: '📊' },
        { id: 'analytics', label: 'Analytics', icon: '📈' },
      ]
    },
    {
      title: 'Management',
      items: [
        { id: 'users', label: 'Users', icon: '👥' },
        { id: 'projects', label: 'Projects', icon: '📁' },
        { id: 'billing', label: 'Billing', icon: '💳' },
      ]
    },
    {
      title: 'System',
      items: [
        { id: 'settings', label: 'Settings', icon: '⚙️' },
        { id: 'logs', label: 'Logs', icon: '📋' },
        { id: 'security', label: 'Security', icon: '🔒' },
      ]
    }
  ];

  return (
    <Box display="flex" flexDirection="column" gap="l">
      {sections.map(section => (
        <Box key={section.title}>
          <Text as="h3" fontSize="xs" fontWeight="bold" color="tertiary" textTransform="uppercase" mb="s">
            {section.title}
          </Text>
          <Box display="flex" flexDirection="column" gap="xs">
            {section.items.map(item => (
              <NavigationItem key={item.id} {...item} />
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
}
```

## Multi-Panel Dashboard

```jsx
function MultiPanelDashboard() {
  return (
    <Box minHeight="100vh" bg="base" p="m" gap="m">
      {/* Header Row */}
      <Box display="grid" gridTemplateColumns="2fr 1fr" gap="m" height="120px">
        <Box skin="card" p="m" display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Text as="h1" fontSize="xl" fontWeight="bold" color="primary" mb="xs">
              Project Alpha
            </Text>
            <Text fontSize="s" color="secondary">
              Last updated 2 hours ago
            </Text>
          </Box>
          <Button variant="primary" $size="medium">
            Deploy
          </Button>
        </Box>

        <Box skin="card" p="m" display="flex" flexDirection="column" justifyContent="center">
          <Text fontSize="s" color="secondary" mb="xs">
            Overall Health
          </Text>
          <Box display="flex" alignItems="center" gap="s">
            <Box width="12px" height="12px" bg="success" shape="circle" />
            <Text fontSize="m" fontWeight="bold" color="success">
              All Systems Operational
            </Text>
          </Box>
        </Box>
      </Box>

      {/* Main Content Row */}
      <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" gap="m" height="300px">
        <Box skin="card" p="m">
          <Text as="h3" fontSize="m" fontWeight="bold" mb="m">
            Performance Metrics
          </Text>
          {/* Chart placeholder */}
          <Box bg="neutral.2" height="200px" shape="rounded" display="flex" alignItems="center" justifyContent="center">
            <Text color="secondary">Performance Chart</Text>
          </Box>
        </Box>

        <Box skin="card" p="m">
          <Text as="h3" fontSize="m" fontWeight="bold" mb="m">
            Active Users
          </Text>
          <Box bg="neutral.2" height="200px" shape="rounded" display="flex" alignItems="center" justifyContent="center">
            <Text color="secondary">Users Chart</Text>
          </Box>
        </Box>

        <Box skin="card" p="m">
          <Text as="h3" fontSize="m" fontWeight="bold" mb="m">
            Server Status
          </Text>
          <Box display="flex" flexDirection="column" gap="s">
            <ServerStatusItem name="Web Server" status="online" />
            <ServerStatusItem name="Database" status="online" />
            <ServerStatusItem name="Cache" status="warning" />
            <ServerStatusItem name="CDN" status="offline" />
          </Box>
        </Box>
      </Box>

      {/* Bottom Row */}
      <Box display="grid" gridTemplateColumns="2fr 1fr" gap="m" minHeight="250px">
        <Box skin="card" p="m">
          <Text as="h3" fontSize="m" fontWeight="bold" mb="m">
            Recent Deployments
          </Text>
          <DeploymentsList />
        </Box>

        <Box skin="card" p="m">
          <Text as="h3" fontSize="m" fontWeight="bold" mb="m">
            Quick Actions
          </Text>
          <Box display="flex" flexDirection="column" gap="s">
            <Button variant="outline" $size="medium" width="100%">
              Create Backup
            </Button>
            <Button variant="outline" $size="medium" width="100%">
              View Logs
            </Button>
            <Button variant="outline" $size="medium" width="100%">
              Run Tests
            </Button>
            <Button variant="primary" $size="medium" width="100%">
              New Deployment
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function ServerStatusItem({ name, status }) {
  const statusConfig = {
    online: { color: 'success', icon: '🟢', text: 'Online' },
    warning: { color: 'warning', icon: '🟡', text: 'Warning' },
    offline: { color: 'error', icon: '🔴', text: 'Offline' },
  };

  const config = statusConfig[status];

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" p="s" hover="surface" shape="rounded">
      <Text fontSize="s" fontWeight="medium">
        {name}
      </Text>
      <Box display="flex" alignItems="center" gap="xs">
        <Text fontSize="xs">{config.icon}</Text>
        <Text fontSize="xs" color={config.color} fontWeight="medium">
          {config.text}
        </Text>
      </Box>
    </Box>
  );
}
```

## Best Practices

### Layout Structure
- Use semantic HTML elements (`header`, `main`, `aside`, `section`)
- Maintain consistent spacing with theme values
- Design mobile-first with responsive breakpoints

### Navigation
- Provide clear visual feedback for active states
- Ensure keyboard accessibility
- Use appropriate hover states

### Content Organization
- Group related content in cards or sections
- Use consistent typography hierarchy
- Provide adequate white space

### Responsive Behavior
- Stack content vertically on mobile
- Use overlay navigation on small screens
- Adapt grid columns based on screen size

### Performance
- Lazy load non-critical content
- Use skeleton states for loading
- Optimize for different viewport sizes