import React from 'react';
import { TextInput } from '@patternfly/react-core';
import { TypeaheadSelect } from '@patternfly/react-templates';
import { RoleBindingSubject } from '~/k8sTypes';
import { RoleBindingPermissionsRBType } from './types';

type RoleBindingPermissionsNameInputProps = {
  subjectKind: RoleBindingSubject['kind'];
  value: string;
  onChange: (selection: string) => void;
  onClear: () => void;
  placeholderText: string;
  typeAhead?: string[];
};

const RoleBindingPermissionsNameInput: React.FC<RoleBindingPermissionsNameInputProps> = ({
  subjectKind,
  value,
  onChange,
  onClear,
  placeholderText,
  typeAhead,
}) => {
  if (!typeAhead) {
    return (
      <TextInput
        data-testid={`role-binding-name-input ${value}`}
        isRequired
        aria-label="role-binding-name-input"
        type="text"
        value={value}
        placeholder={`Type ${
          subjectKind === RoleBindingPermissionsRBType.GROUP ? 'group name' : 'username'
        }`}
        onChange={(e, newValue) => onChange(newValue)}
      />
    );
  }

  return (
    <TypeaheadSelect
      aria-label="Name selection"
      initialOptions={typeAhead.map((option) => ({
        value: option,
        content: option,
        selected: option === value,
      }))}
      onSelect={(_ev, selection) => {
        if (typeof selection === 'string') {
          onChange(selection);
        }
      }}
      onClearSelection={onClear}
      // TODO: Allow creation when https://github.com/patternfly/patternfly-react/pull/10802 is released
      // isCreatable
      placeholder={placeholderText}
    />
  );
};

export default RoleBindingPermissionsNameInput;
