const PropTypes = require('prop-types');
const React = require('react');

const {Box, Card, Heading, Text} = require('@reactberry/core');

function FormCard({actions, children, description, title, ...rest}) {
  const hasHeader = Boolean(title) || Boolean(description);
  const hasContent = Boolean(children);

  return (
    <Card width="100%" {...rest}>
      {hasHeader && (
        <Box mb={hasContent || actions ? 'large' : 0}>
          {title && (
            <Heading as="h3" fontSize="medium" mb={description ? 'xxsmall' : 0}>
              {title}
            </Heading>
          )}
          {description && <Text color="text.muted">{description}</Text>}
        </Box>
      )}

      {children}

      {actions && (
        <Box width="100%" mt={hasContent ? 'large' : 'medium'}>
          {actions}
        </Box>
      )}
    </Card>
  );
}

FormCard.propTypes = {
  actions: PropTypes.node,
  children: PropTypes.node,
  description: PropTypes.node,
  title: PropTypes.node
};

module.exports = FormCard;