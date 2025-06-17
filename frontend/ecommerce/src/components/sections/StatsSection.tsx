import React from 'react';

const StatsSection: React.FC = () => {
  const stats = [
    { number: "10K+", label: "Happy Customers" },
    { number: "500+", label: "Products" },
    { number: "50+", label: "Brands" },
    { number: "99.9%", label: "Uptime" }
  ];

  return (
    <section className="stats-section py-5 bg-primary">
      <div className="container">
        <div className="row text-center g-4">
          {stats.map((stat, index) => (
            <div key={index} className="col">
              <div className="h2 fw-bold text-white mb-2">{stat.number}</div>
              <div className="text-info fw-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection; 