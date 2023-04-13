import React from 'react';
import {
  FieldError,
  FieldErrors,
  SetValueConfig,
  ValidationRules,
} from 'react-hook-form';
import { useTranslation, UseTranslationResponse } from 'react-i18next';
import { View, ViewStyle } from 'react-native';

interface FormProps {
  children: React.ReactElement | React.ReactElement[];
  register: (name: string, rules?: ValidationRules) => void;
  errors: FieldErrors;
  setValue: (name: string, value: any, config: SetValueConfig) => void;
  style?: ViewStyle;
}

// Used to get, update and validate value for all fields easy.
// We used `react-hook-form` library to support it.
// To understand how to use this. Please refer to the `Form` section in README.md file
export default function Form(props: FormProps) {
  const { children, register, errors, setValue, style } = props;
  const inputRefs = React.useRef<Map<string, any>>(new Map<string, any>());
  const i18n = useTranslation();

  function onInputEditSubmitting(child: React.ReactElement) {
    if (child?.props?.onSubmitEditing) {
      child?.props?.onSubmitEditing();
    }
    // focus to next field when click `submit` on keyboard
    const keys = Array.from(inputRefs.current.keys());
    const key = keys[keys.indexOf(child.props.name) + 1];
    if (key) {
      inputRefs.current.get(key)?.focus();
    }
  }

  // need to update value changed for its field in form
  function onInputValueChange(name: string, value: any) {
    setValue(name, value, {
      shouldDirty: true,
    });
  }

  // if a child is input. It must be recreated to setup some special props
  function createNewInput(child: React.ReactElement): React.ReactElement {
    return React.cloneElement(child, {
      key: child?.props?.name,
      // use for TextInput to get the refs then we can use later to request focus for blur
      inputRef: (ref: any) => {
        inputRefs.current.set(child.props.name, ref);
      },
      // use for custom input to update value
      onValueChange: (value: any) => {
        if (child?.props?.onInputValueChange) {
          child?.props?.onValueChange(value);
        }
        onInputValueChange(child.props.name, value);
      },
      // use for TextInput to update value
      onChangeText: (value: any) => {
        if (child?.props?.onChangeText) {
          child?.props?.onChangeText(value);
        }
        onInputValueChange(child.props.name, value);
      },
      // use for TextInput to handle when it clicks on submit button on keyboard
      onSubmitEditing: () => {
        onInputEditSubmitting(child);
      },
      blurOnSubmit: child?.props?.returnKeyType !== 'next',
      errorMessage: getErrorMessage(i18n, errors[child.props.name]),
    });
  }

  // parse every child component
  function parseChild(child: React.ReactElement): React.ReactNode {
    if (child?.props?.name) {
      // if it is an input: (has `name` props) will be registered and handled the changes of value
      register(child?.props?.name, child?.props?.rules);
      return createNewInput(child);
    }
    // if there are some inputs what placed in the `child`, also check the children of `child` to find the input
    if (child?.props?.children) {
      return React.cloneElement(child, {
        children: renderChildren(child?.props?.children),
      });
    }
    // otherwise return it directly
    return child;
  }

  // check children and register all inputs (which has `name` props) to the form
  // Ex: <Input name="email"/>
  function renderChildren(
    node: React.ReactElement | React.ReactElement[],
  ): React.ReactNode {
    if (Array.isArray(node)) {
      return node.map(child => {
        return parseChild(child);
      });
    }
    return parseChild(node);
  }

  return <View style={style}>{renderChildren(children)}</View>;
}

// parse the error to error message in selected language.
// with `required` error, all input will only have the red highlight border, otherwise will show the detail message.
function getErrorMessage(
  i18n: UseTranslationResponse,
  error?: FieldError,
): string | undefined {
  if (error) {
    if (error.type === 'required') {
      return 'required';
    }
    return i18n.t(error.message!);
  }
  return undefined;
}
