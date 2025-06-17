import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="card shadow-sm border-0">
      <div className="icon-box">
        {icon}
      </div>
      <div className="card-title">{title}</div>
      <div className="card-text">{description}</div>
    </div>
  );
};

export default FeatureCard;
