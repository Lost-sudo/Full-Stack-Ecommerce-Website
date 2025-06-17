import React from 'react';
import { Star, Shield, Truck, Headphones } from 'lucide-react';
import FeatureCard from '../common/FeatureCard';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Shield />,
      title: "Secure Shopping",
      description: "Your data and transactions are protected with industry-leading security measures."
    },
    {
      icon: <Truck />,
      title: "Fast Delivery",
      description: "Get your orders delivered quickly with our reliable shipping partners."
    },
    {
      icon: <Star />,
      title: "Quality Products",
      description: "We offer only the highest quality products from trusted brands and sellers."
    },
    {
      icon: <Headphones />,
      title: "24/7 Support",
      description: "Our customer support team is available round the clock to help you."
    }
  ];

  return (
    <section className="features-section py-5 bg-light">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose ShopHub?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're committed to providing you with the best online shopping experience possible.
          </p>
        </div>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          {features.map((feature, index) => (
            <div className="col d-flex">
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
