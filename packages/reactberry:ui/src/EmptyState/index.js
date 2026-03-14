const PropTypes = require('prop-types');
const React = require('react');

const {Box, Card, Heading, Placeholder, Text} = require('@reactberry/core');

function EmptyState({actions, children, description, icon, title, ...rest}) {
  const hasSupportingContent = Boolean(description) || Boolean(children);

  return (
    <Card
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="100%"
      maxWidth="24rem"
      p="xlarge"
      {...rest}
    >
      {icon && (
        <Box mb={title || hasSupportingContent || actions ? 'small' : 0}>
          <Placeholder icon={icon} size="xlarge" bg="surface.subtle" color="text.subtle" />
        </Box>
      )}

      <Heading
        as="h3"
        fontSize="medium"
        textAlign="center"
        width="100%"
        mb={hasSupportingContent || actions ? 'xxsmall' : 0}
      >
        {title}
      </Heading>

      {description && (
        <Text width="100%" textAlign="center" color="text.muted">
          {description}
        </Text>
      )}

      {children && <Box width="100%" mt={description ? 'small' : 'medium'}>{children}</Box>}

      {actions && (
        <Box width="100%" mt={hasSupportingContent ? 'medium' : 'small'} display="flex" justifyContent="center">
          {actions}
        </Box>
      )}
    </Card>
  );
}

EmptyState.propTypes = {
  actions: PropTypes.node,
  children: PropTypes.node,
  description: PropTypes.node,
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.func, PropTypes.string]),
  title: PropTypes.node.isRequired
};

module.exports = EmptyState;