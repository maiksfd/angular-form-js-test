import classNames from 'classnames';
import {
  Errors,
  FormContext,
  Numberfield,
  Description,
  Label,
} from '@bpmn-io/form-js';
import { html, useContext } from 'diagram-js/lib/ui';

class CustomFormFields {
  constructor(formFields: any) {
    formFields.register(rangeType, RangeRenderer);
  }
}

export const RangeRendererExtension = {
  __init__: ['rangeField'],
  rangeField: ['type', CustomFormFields],
};

const rangeType = 'range';
function RangeRenderer(props: any) {
  const { disabled, errors = [], field, readonly, value } = props;
  const { description, range = {}, id, label } = field;
  const { min, max, step } = range;
  const { formId } = useContext(FormContext);

  const errorMessageId =
    errors.length === 0 ? undefined : `${prefixId(id, formId)}-error-message`;

  const onChange = (event: any) => {
    const { target } = event;
    props.onChange({
      field,
      value: Number(target.value),
    });
  };

  return html`<div class=${formFieldClasses(rangeType)}>
    <${Label} id=${prefixId(id, formId)} label=${label} />
    <div class="range-group">
      <input
        type="range"
        disabled=${disabled}
        id=${prefixId(id, formId)}
        max=${max}
        min=${min}
        onInput=${onChange}
        readonly=${readonly}
        value=${value}
        step=${step}
      />
      <div class="range-value">${value}</div>
    </div>
    <${Description} description=${description} />
    <${Errors} errors=${errors} id=${errorMessageId} />
  </div>`;
}

RangeRenderer.config = {
  ...Numberfield.config,
  type: rangeType,
  label: 'Range',
  group: 'selection',
  iconUrl: `data:image/svg+xml,${encodeURIComponent(`<svg width="800" height="800" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"><path d="M8.042 29h56M8.042 26v8M64.042 26v8M36.042 26v8M22.042 26v6M50.042 26v6M8.008 45.905h0a1.916 1.916 0 0 1-1.915-1.915v-3.17c0-1.057.858-1.915 1.915-1.915h0c1.059 0 1.916.858 1.916 1.916v3.169a1.916 1.916 0 0 1-1.915 1.915zM61.833 40.612a2.151 2.151 0 0 1 2.107-1.717h0c.594 0 1.131.24 1.52.63.606.605.55 1.61-.018 2.251l-3.652 4.119h4.3M35.121 40.412l1.938-1.451v7"/></g></svg>`)}`,
  propertiesPanelEntries: [
    'key',
    'label',
    'description',
    'min',
    'max',
    'disabled',
    'readonly',
  ],
};

// helper //////////////////////

function formFieldClasses(
  type: any,
  { errors = [], disabled = false, readonly = false } = {},
) {
  if (!type) {
    throw new Error('type required');
  }

  return classNames('fjs-form-field', `fjs-form-field-${type}`, {
    'fjs-has-errors': errors.length > 0,
    'fjs-disabled': disabled,
    'fjs-readonly': readonly,
  });
}

function prefixId(id: any, formId: any) {
  if (formId) {
    return `fjs-form-${formId}-${id}`;
  }

  return `fjs-form-${id}`;
}
