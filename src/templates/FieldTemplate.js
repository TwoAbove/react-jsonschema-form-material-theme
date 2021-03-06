import React from "react";
import PropTypes from "prop-types";
import InputLabel from '@material-ui/core/InputLabel';
import FormGroup from '@material-ui/core/FormGroup';

const REQUIRED_FIELD_SYMBOL = "*";

export default function FieldTemplate(props) {
  const {
    id,
    label,
    children,
    errors,
    help,
    description,
    hidden,
    required,
    displayLabel,
    formContext,
    registry: {
      templates: { DescriptionTemplate },
    },
  } = props;
  const classNames = [props.classNames, "form-group"].join(" ").trim();

  if (hidden) {
    return children;
  }

  return (
    <FormGroup>
      {displayLabel && <Label label={label} required={required} id={id} />}
      {displayLabel && description ? (
        <DescriptionTemplate
          id={`${id}__description`}
          description={description}
          formContext={formContext}
        />
      ) : null}
      {children}
      <ErrorList errors={errors} />
      <Help help={help} />
    </FormGroup>
  );
}

FieldTemplate.defaultProps = {
  hidden: false,
  readonly: false,
  required: false,
  displayLabel: true,
};


  FieldTemplate.propTypes = {
    id: PropTypes.string,
    classNames: PropTypes.string,
    label: PropTypes.string,
    children: PropTypes.node.isRequired,
    errors: PropTypes.arrayOf(PropTypes.string),
    help: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    hidden: PropTypes.bool,
    required: PropTypes.bool,
    readonly: PropTypes.bool,
    displayLabel: PropTypes.bool,
    fields: PropTypes.object,
    formContext: PropTypes.object,
  };

function Label(props) {
  const { label, required, id } = props;
  if (!label) {
    // See #312: Ensure compatibility with old versions of React.
    return <div />;
  }
  return (
    <InputLabel htmlFor={id}>
      {label}
      {required && <span className="required">{REQUIRED_FIELD_SYMBOL}</span>}
    </InputLabel>
  );
}

function Help(props) {
  const { help } = props;
  if (!help) {
    // See #312: Ensure compatibility with old versions of React.
    return <div />;
  }
  if (typeof help === "string") {
    return <p className="help-block">{help}</p>;
  }
  return <div className="help-block">{help}</div>;
}

function ErrorList(props) {
  const { errors = [] } = props;
  if (errors.length === 0) {
    return <div />;
  }
  return (
    <div>
      <p />
      <ul className="error-detail bs-callout bs-callout-info">
        {errors.map((error, index) => {
          return (
            <li className="text-danger" key={index}>
              {error}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
