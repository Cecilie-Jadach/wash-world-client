export type InputProps = {
  label: string;
  id: string;
  showLicensePlate?: boolean;
  phoneLabel?: string;
  error?: string;
  showRequired?: boolean;
  bgWhite?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;
