export type AlertType = 'info' | 'success' | 'warning' | 'error';

export interface AlertOptions {
  title: string;
  message: string;
  type?: AlertType;
  isConfirm?: boolean;
}