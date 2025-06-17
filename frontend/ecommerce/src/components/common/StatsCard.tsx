import React from 'react';

interface StatsCardProps {
  number: string;
  label: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ number, label }) => {
  return (
    <div className="text-center">
      <div className="h2 fw-bold text-primary mb-2">{number}</div>
      <div className="text-secondary fw-medium">{label}</div>
    </div>
  );
};

export default StatsCard;
