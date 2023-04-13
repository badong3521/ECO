import RStepIndicator from 'react-native-step-indicator';
import React from 'react';
import { applicationColors } from '../../../style.css';
import Icon from '../Icon';
import Text from '../Text';

export type StepIndicatorPropTypes = {
  currentPosition: number;
  stepCount: number;
};

function renderStepIndicator(position: number, stepStatus: string) {
  if (stepStatus === 'finished') {
    return <Icon iconPack="material" name="check" size={10} />;
  }
  return (
    <Text style={{ color: applicationColors.neutral.shade300 }}>
      {(position + 1).toString()}
    </Text>
  );
}

export default function StepIndicator(props: StepIndicatorPropTypes) {
  const { currentPosition, stepCount } = props;
  return (
    <RStepIndicator
      customStyles={DEFAULT_STYLE}
      currentPosition={currentPosition}
      stepCount={stepCount}
      // @ts-ignore
      renderStepIndicator={({ position, stepStatus }) =>
        renderStepIndicator(position, stepStatus)
      }
    />
  );
}

const DEFAULT_STYLE = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 25,
  separatorStrokeWidth: 1,
  separatorFinishedColor: applicationColors.primary.shade900,
  stepStrokeWidth: 1,
  stepStrokeFinishedColor: applicationColors.primary.shade900,
  stepIndicatorFinishedColor: applicationColors.primary.shade900,
  stepStrokeUnFinishedColor: applicationColors.neutral.shade300,
  stepIndicatorCurrentColor: applicationColors.primary.shade900,
  stepStrokeCurrentColor: applicationColors.primary.shade900,
  stepIndicatorLabelCurrentColor: applicationColors.primary.white,
  stepIndicatorUnFinishedColor: applicationColors.primary.white,
  separatorUnFinishedColor: applicationColors.neutral.shade300,
};
