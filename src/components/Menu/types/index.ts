export interface MenuPropType {
  children: React.ReactNode;
  anchor: React.ReactNode; // Component that will open Menu
  visible: boolean;
  onDismiss: () => void;
}
