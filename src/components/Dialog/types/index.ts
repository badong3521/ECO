export interface DialogPropTypes {
  visible: boolean;
  dismissible?: boolean;
  children: React.ReactNode;
  onDismiss?: () => void;
}
