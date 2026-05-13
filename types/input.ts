export type InputProps = {
  label: string;
  id: string;
  showLicensePlate?: boolean;
  phoneLabel?: string;
  error?: string;
  showRequired?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;
