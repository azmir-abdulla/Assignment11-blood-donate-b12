import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Users, Droplet, HeartHandshake, Award } from 'lucide-react';

const stats = [
  { id: 1, title: 'Total Donors', value: 1250, icon: Users, color: 'text-red-500' },
  { id: 2, title: 'Blood Requests', value: 840, icon: Droplet, color: 'text-red-600' },
  { id: 3, title: 'Lives Saved', value: 3100, icon: HeartHandshake, color: 'text-pink-500' },
  { id: 4, title: 'Awards Won', value: 15, icon: Award, color: 'text-yellow-500' },
];

const Counter = ({ value }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const animation = animate(count, value, { duration: 2.5, ease: 'easeOut' });
    
    const unsubscribe = rounded.on('change', (latest) => {
      setDisplayValue(latest);
    });
    
    return () => {
      animation.stop();
      unsubscribe();
    };
  }, [value, count, rounded]);

  return <motion.span>{displayValue}</motion.span>;
};

const Counting = () => {
  return (
    <section className="py-16 bg-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Impact in Numbers
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Every drop counts. Join our community and help us save more lives.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: stat.id * 0.1 }}
              className="bg-white rounded-xl shadow-md p-8 text-center"
            >
              <div className="flex justify-center mb-4">
                <stat.icon className={`w-12 h-12 ${stat.color}`} />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                <Counter value={stat.value} />+
              </div>
              <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                {stat.title}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Counting;
