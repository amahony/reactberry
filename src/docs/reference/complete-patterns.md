# Reactberry - Complete Patterns Guide

This guide provides complete, production-ready patterns that you can copy and adapt for your needs. Each pattern follows best practices and includes all necessary imports and TypeScript types.

## Table of Contents

1. [Forms & Inputs](#forms--inputs)
2. [Cards & Content](#cards--content)
3. [Navigation](#navigation)
4. [Layouts](#layouts)
5. [Data Display](#data-display)
6. [Modals & Overlays](#modals--overlays)
7. [States & Feedback](#states--feedback)
8. [Interactive Components](#interactive-components)

## Forms & Inputs

### Complete Form with Validation

```tsx
import { Box, Text, Button, Field } from '@reactberry/system/elements';
import { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      // Submit form data
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Reset form
      setFormData({ name: '', email: '', message: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box 
      as="form" 
      onSubmit={handleSubmit}
      display="flex" 
      flexDirection="column" 
      gap="m" 
      maxWidth="500px"
      width="100%"
    >
      {/* Name Field */}
      <Box gap="xs">
        <Text as="label" htmlFor="name" fontSize="s" fontWeight="medium">
          Name *
        </Text>
        <Field
          id="name"
          as="input"
          type="text"
          variant="outline"
          $size="medium"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={!!errors.name}
          disabled={isSubmitting}
        />
        {errors.name && (
          <Text fontSize="xs" color="error">{errors.name}</Text>
        )}
      </Box>

      {/* Email Field */}
      <Box gap="xs">
        <Text as="label" htmlFor="email" fontSize="s" fontWeight="medium">
          Email *
        </Text>
        <Field
          id="email"
          as="input"
          type="email"
          variant="outline"
          $size="medium"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={!!errors.email}
          disabled={isSubmitting}
        />
        {errors.email && (
          <Text fontSize="xs" color="error">{errors.email}</Text>
        )}
      </Box>

      {/* Message Field */}
      <Box gap="xs">
        <Text as="label" htmlFor="message" fontSize="s" fontWeight="medium">
          Message *
        </Text>
        <Field
          id="message"
          as="textarea"
          variant="outline"
          $size="medium"
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          error={!!errors.message}
          disabled={isSubmitting}
        />
        {errors.message && (
          <Text fontSize="xs" color="error">{errors.message}</Text>
        )}
      </Box>

      {/* Submit Button */}
      <Button 
        type="submit" 
        variant="primary" 
        $size="medium"
        loading={isSubmitting}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </Box>
  );
}
```

### Search Input with Suggestions

```tsx
import { Box, Text, Field } from '@reactberry/system/elements';
import { useState, useRef, useEffect } from 'react';

interface SearchSuggestion {
  id: string;
  title: string;
  category: string;
}

export function SearchInput() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Mock search function
  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.length > 2) {
      // Mock suggestions
      setSuggestions([
        { id: '1', title: 'Search result 1', category: 'Category A' },
        { id: '2', title: 'Search result 2', category: 'Category B' },
        { id: '3', title: 'Search result 3', category: 'Category A' },
      ]);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      selectSuggestion(suggestions[selectedIndex]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.title);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    // Handle selection
  };

  return (
    <Box position="relative" ref={wrapperRef} width="100%" maxWidth="400px">
      <Field
        as="input"
        type="text"
        variant="outline"
        $size="medium"
        placeholder="Search..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => query.length > 2 && setShowSuggestions(true)}
      />
      
      {showSuggestions && suggestions.length > 0 && (
        <Box
          position="absolute"
          top="100%"
          left="0"
          right="0"
          mt="xs"
          bg="base"
          skin="overlay"
          shape="rounded"
          $shadow="medium"
          maxHeight="300px"
          overflowY="auto"
          zIndex="100"
        >
          {suggestions.map((suggestion, index) => (
            <Box
              key={suggestion.id}
              p="s"
              cursor="pointer"
              bg={index === selectedIndex ? 'surface' : undefined}
              hover="subtle"
              onClick={() => selectSuggestion(suggestion)}
            >
              <Text fontSize="s" fontWeight="medium">
                {suggestion.title}
              </Text>
              <Text fontSize="xs" color="secondary">
                {suggestion.category}
              </Text>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
```

## Cards & Content

### Feature Card with Icon

```tsx
import { Box, Text, Button } from '@reactberry/system/elements';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function FeatureCard({ icon, title, description, action }: FeatureCardProps) {
  return (
    <Box
      skin="card"
      p="l"
      shape="rounded"
      display="flex"
      flexDirection="column"
      gap="m"
      height="100%"
      hover="subtle"
      interactive={{
        hover: { transform: 'translateY(-4px)', boxShadow: '$shadows.large' }
      }}
    >
      {/* Icon */}
      <Box
        width="48px"
        height="48px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        skin="primary"
        shape="rounded"
      >
        {icon}
      </Box>

      {/* Content */}
      <Box flex="1">
        <Text as="h3" fontSize="l" fontWeight="bold" mb="s">
          {title}
        </Text>
        <Text as="p" fontSize="s" color="secondary" lineHeight="relaxed">
          {description}
        </Text>
      </Box>

      {/* Action */}
      {action && (
        <Button 
          variant="ghost" 
          $size="small" 
          onClick={action.onClick}
        >
          {action.label} →
        </Button>
      )}
    </Box>
  );
}
```

### Profile Card

```tsx
import { Box, Text, Button } from '@reactberry/system/elements';
import { Avatar } from '@reactberry/system/blocks';

interface ProfileCardProps {
  name: string;
  role: string;
  avatar?: string;
  bio?: string;
  stats?: Array<{ label: string; value: string | number }>;
}

export function ProfileCard({ name, role, avatar, bio, stats }: ProfileCardProps) {
  return (
    <Box skin="card" shape="rounded" overflow="hidden">
      {/* Header with gradient background */}
      <Box
        height="100px"
        bg="gradient.primary"
        position="relative"
      />

      {/* Content */}
      <Box p="l" display="flex" flexDirection="column" gap="m">
        {/* Avatar positioned over header */}
        <Box mt="-60px" mb="s">
          <Avatar
            src={avatar}
            name={name}
            size="xl"
            border="4px solid"
            borderColor="base"
          />
        </Box>

        {/* Name and role */}
        <Box>
          <Text as="h3" fontSize="l" fontWeight="bold">
            {name}
          </Text>
          <Text fontSize="s" color="secondary">
            {role}
          </Text>
        </Box>

        {/* Bio */}
        {bio && (
          <Text as="p" fontSize="s" lineHeight="relaxed" color="secondary">
            {bio}
          </Text>
        )}

        {/* Stats */}
        {stats && stats.length > 0 && (
          <Box 
            display="grid" 
            gridTemplateColumns={`repeat(${stats.length}, 1fr)`}
            gap="m"
            pt="m"
            borderTop="1px solid"
            borderColor="surface"
          >
            {stats.map((stat, index) => (
              <Box key={index} textAlign="center">
                <Text fontSize="l" fontWeight="bold">
                  {stat.value}
                </Text>
                <Text fontSize="xs" color="secondary">
                  {stat.label}
                </Text>
              </Box>
            ))}
          </Box>
        )}

        {/* Actions */}
        <Box display="flex" gap="s">
          <Button variant="primary" $size="small" flex="1">
            Follow
          </Button>
          <Button variant="ghost" $size="small" flex="1">
            Message
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
```

## Navigation

### Responsive Navigation Bar

```tsx
import { Box, Text, Button } from '@reactberry/system/elements';
import { useState } from 'react';

interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

interface NavigationBarProps {
  items: NavItem[];
  logo?: React.ReactNode;
}

export function NavigationBar({ items, logo }: NavigationBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <Box
        as="nav"
        bg="surface"
        p="m"
        position="sticky"
        top="0"
        zIndex="100"
        $shadow="small"
      >
        <Box 
          display="flex" 
          alignItems="center" 
          justifyContent="space-between"
          maxWidth="1200px"
          mx="auto"
        >
          {/* Logo */}
          <Box display="flex" alignItems="center" gap="m">
            {logo}
          </Box>

          {/* Desktop Navigation */}
          <Box display={['none', 'flex']} gap="s" alignItems="center">
            {items.map((item, index) => (
              <Button
                key={index}
                variant={item.active ? 'primary' : 'ghost'}
                $size="small"
                onClick={() => {/* Handle navigation */}}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Mobile Menu Button */}
          <Box display={['block', 'none']}>
            <Button
              variant="ghost"
              $size="small"
              icon
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Box as="span" fontSize="l">☰</Box>
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <Box
          display={['flex', 'none']}
          flexDirection="column"
          bg="surface"
          p="m"
          gap="xs"
          position="fixed"
          top="60px"
          left="0"
          right="0"
          zIndex="99"
          $shadow="medium"
        >
          {items.map((item, index) => (
            <Button
              key={index}
              variant={item.active ? 'primary' : 'ghost'}
              $size="medium"
              onClick={() => {
                setMobileMenuOpen(false);
                // Handle navigation
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      )}
    </>
  );
}
```

### Breadcrumb Navigation

```tsx
import { Box, Text } from '@reactberry/system/elements';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <Box as="nav" aria-label="Breadcrumb">
      <Box display="flex" alignItems="center" gap="xs" flexWrap="wrap">
        {items.map((item, index) => (
          <Box key={index} display="flex" alignItems="center" gap="xs">
            {index > 0 && (
              <Text as="span" color="secondary" fontSize="s">
                /
              </Text>
            )}
            {item.href && index < items.length - 1 ? (
              <Text
                as="a"
                href={item.href}
                fontSize="s"
                color="secondary"
                hover="primary"
                cursor="pointer"
              >
                {item.label}
              </Text>
            ) : (
              <Text
                as="span"
                fontSize="s"
                color={index === items.length - 1 ? 'primary' : 'secondary'}
                fontWeight={index === items.length - 1 ? 'medium' : 'normal'}
              >
                {item.label}
              </Text>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
```

## Layouts

### Dashboard Layout

```tsx
import { Box, Text, Button } from '@reactberry/system/elements';
import { useState } from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const sidebarItems = [
    { label: 'Dashboard', icon: '📊', active: true },
    { label: 'Projects', icon: '📁' },
    { label: 'Tasks', icon: '✓' },
    { label: 'Calendar', icon: '📅' },
    { label: 'Settings', icon: '⚙️' },
  ];

  return (
    <Box display="flex" minHeight="100vh" bg="base">
      {/* Sidebar */}
      <Box
        width={sidebarOpen ? '250px' : '60px'}
        bg="surface"
        p="m"
        display="flex"
        flexDirection="column"
        gap="xs"
        position={['fixed', 'relative']}
        height={['100vh', 'auto']}
        left={sidebarOpen ? '0' : '-190px'}
        zIndex={['100', '1']}
      >
        {/* Sidebar Header */}
        <Box display="flex" alignItems="center" justifyContent="space-between" mb="m">
          {sidebarOpen && (
            <Text as="h2" fontSize="l" fontWeight="bold">
              Dashboard
            </Text>
          )}
          <Button
            variant="ghost"
            $size="small"
            icon
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Text>{sidebarOpen ? '←' : '→'}</Text>
          </Button>
        </Box>

        {/* Sidebar Items */}
        {sidebarItems.map((item, index) => (
          <Button
            key={index}
            variant={item.active ? 'primary' : 'ghost'}
            $size="small"
            style={{ justifyContent: sidebarOpen ? 'flex-start' : 'center' }}
          >
            <Box display="flex" alignItems="center" gap="s">
              <Text>{item.icon}</Text>
              {sidebarOpen && <Text>{item.label}</Text>}
            </Box>
          </Button>
        ))}
      </Box>

      {/* Main Content */}
      <Box flex="1" display="flex" flexDirection="column">
        {/* Header */}
        <Box
          bg="base"
          p="m"
          borderBottom="1px solid"
          borderColor="surface"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text as="h1" fontSize="xl" fontWeight="bold">
            Page Title
          </Text>
          <Box display="flex" gap="s">
            <Button variant="ghost" $size="small" icon>
              🔔
            </Button>
            <Button variant="ghost" $size="small">
              Profile
            </Button>
          </Box>
        </Box>

        {/* Page Content */}
        <Box flex="1" p="l" overflow="auto">
          {children}
        </Box>
      </Box>
    </Box>
  );
}
```

### Split Layout with Sticky Sidebar

```tsx
import { Box, Text } from '@reactberry/system/elements';

interface SplitLayoutProps {
  sidebar: React.ReactNode;
  content: React.ReactNode;
}

export function SplitLayout({ sidebar, content }: SplitLayoutProps) {
  return (
    <Box display="grid" gridTemplateColumns={['1fr', '300px 1fr']} gap="l" minHeight="100vh">
      {/* Sticky Sidebar */}
      <Box display={['none', 'block']}>
        <Box position="sticky" top="20px">
          {sidebar}
        </Box>
      </Box>

      {/* Main Content */}
      <Box>
        {content}
      </Box>

      {/* Mobile Sidebar */}
      <Box display={['block', 'none']} mb="l">
        {sidebar}
      </Box>
    </Box>
  );
}
```

## Data Display

### Data Table

```tsx
import { Box, Text, Button } from '@reactberry/system/elements';

interface TableColumn<T> {
  key: keyof T;
  label: string;
  render?: (value: any, item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
}

export function DataTable<T extends { id: string | number }>({ 
  columns, 
  data, 
  onRowClick 
}: DataTableProps<T>) {
  return (
    <Box overflowX="auto">
      <Box as="table" width="100%" skin="base">
        {/* Header */}
        <Box as="thead">
          <Box as="tr" borderBottom="2px solid" borderColor="surface">
            {columns.map((column, index) => (
              <Box
                key={index}
                as="th"
                p="s"
                textAlign="left"
              >
                <Text fontSize="s" fontWeight="semibold" color="secondary">
                  {column.label}
                </Text>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Body */}
        <Box as="tbody">
          {data.map((item) => (
            <Box
              key={item.id}
              as="tr"
              borderBottom="1px solid"
              borderColor="surface"
              cursor={onRowClick ? 'pointer' : 'default'}
              hover={onRowClick ? 'subtle' : undefined}
              onClick={() => onRowClick?.(item)}
            >
              {columns.map((column, index) => (
                <Box key={index} as="td" p="s">
                  {column.render ? (
                    column.render(item[column.key], item)
                  ) : (
                    <Text fontSize="s">{String(item[column.key])}</Text>
                  )}
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

// Usage example
const columns: TableColumn<User>[] = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { 
    key: 'status', 
    label: 'Status',
    render: (value) => (
      <Box
        display="inline-block"
        px="xs"
        py="mini"
        shape="pill"
        skin={value === 'active' ? 'success' : 'neutral'}
      >
        <Text fontSize="xs" fontWeight="medium">
          {value}
        </Text>
      </Box>
    )
  },
];
```

### Stats Grid

```tsx
import { Box, Text } from '@reactberry/system/elements';

interface Stat {
  label: string;
  value: string | number;
  change?: {
    value: string;
    trend: 'up' | 'down';
  };
  icon?: React.ReactNode;
}

interface StatsGridProps {
  stats: Stat[];
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <Box
      display="grid"
      gridTemplateColumns={[
        '1fr',
        'repeat(2, 1fr)',
        `repeat(${Math.min(stats.length, 4)}, 1fr)`
      ]}
      gap="m"
    >
      {stats.map((stat, index) => (
        <Box
          key={index}
          skin="card"
          p="m"
          display="flex"
          alignItems="flex-start"
          justifyContent="space-between"
          gap="m"
        >
          <Box flex="1">
            <Text fontSize="s" color="secondary" mb="xs">
              {stat.label}
            </Text>
            <Text fontSize="xl" fontWeight="bold" mb="xs">
              {stat.value}
            </Text>
            {stat.change && (
              <Box display="flex" alignItems="center" gap="xs">
                <Text
                  fontSize="xs"
                  color={stat.change.trend === 'up' ? 'success' : 'error'}
                  fontWeight="medium"
                >
                  {stat.change.trend === 'up' ? '↑' : '↓'} {stat.change.value}
                </Text>
              </Box>
            )}
          </Box>
          {stat.icon && (
            <Box
              width="40px"
              height="40px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              skin="surface"
              shape="rounded"
            >
              {stat.icon}
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
}
```

## Modals & Overlays

### Modal Dialog

```tsx
import { Box, Text, Button } from '@reactberry/system/elements';
import { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  actions?: Array<{
    label: string;
    variant: 'primary' | 'secondary' | 'ghost';
    onClick: () => void;
  }>;
}

export function Modal({ isOpen, onClose, title, children, actions }: ModalProps) {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <Box
        position="fixed"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bg="rgba(0, 0, 0, 0.5)"
        display="flex"
        alignItems="center"
        justifyContent="center"
        zIndex="1000"
        p="m"
        onClick={onClose}
      >
        {/* Modal Content */}
        <Box
          bg="base"
          shape="rounded"
          $shadow="large"
          maxWidth="600px"
          width="100%"
          maxHeight="90vh"
          display="flex"
          flexDirection="column"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <Box
            p="l"
            borderBottom="1px solid"
            borderColor="surface"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text as="h2" fontSize="l" fontWeight="bold">
              {title}
            </Text>
            <Button
              variant="ghost"
              $size="small"
              icon
              onClick={onClose}
            >
              ✕
            </Button>
          </Box>

          {/* Body */}
          <Box p="l" flex="1" overflowY="auto">
            {children}
          </Box>

          {/* Footer */}
          {actions && actions.length > 0 && (
            <Box
              p="l"
              borderTop="1px solid"
              borderColor="surface"
              display="flex"
              gap="s"
              justifyContent="flex-end"
            >
              {actions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant}
                  $size="medium"
                  onClick={action.onClick}
                >
                  {action.label}
                </Button>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}
```

### Toast Notification

```tsx
import { Box, Text } from '@reactberry/system/elements';
import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose: () => void;
}

export function Toast({ message, type, duration = 5000, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const typeConfig = {
    success: { skin: 'success', icon: '✓' },
    error: { skin: 'error', icon: '✕' },
    warning: { skin: 'warning', icon: '⚠' },
    info: { skin: 'primary', icon: 'ℹ' },
  };

  const config = typeConfig[type];

  return (
    <Box
      position="fixed"
      bottom="20px"
      right="20px"
      skin={config.skin}
      p="m"
      shape="rounded"
      $shadow="medium"
      display="flex"
      alignItems="center"
      gap="s"
      maxWidth="400px"
      cursor="pointer"
      onClick={onClose}
      zIndex="1100"
    >
      <Text fontSize="l">{config.icon}</Text>
      <Text fontSize="s" flex="1">
        {message}
      </Text>
    </Box>
  );
}
```

## States & Feedback

### Loading States

```tsx
import { Box, Text } from '@reactberry/system/elements';

// Skeleton loader
export function SkeletonLoader() {
  return (
    <Box display="flex" flexDirection="column" gap="m">
      {[1, 2, 3].map((i) => (