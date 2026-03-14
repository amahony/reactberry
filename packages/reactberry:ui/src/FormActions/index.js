const PropTypes = require('prop-types');
const React = require('react');

const {Box, Group} = require('@reactberry/core');

function FormActions({align = 'flex-end', children, vertical = false, ...rest}) {
  return (
    <Box width="100%" display="flex" justifyContent={align} {...rest}>
      <Group type="buttons" vertical={vertical}>
        {children}
      </Group>
    </Box>
  );
}

FormActions.propTypes = {
  align: PropTypes.string,
  children: PropTypes.node.isRequired,
  vertical: PropTypes.bool
};

module.exports = FormActions;