export type MembershipCardProps = {
  membership: string;
  price: number;
  description: string;
  selectedCard: boolean;
  onSelect: (membership: string) => void;
  showMembershipBadge?: boolean;
};
