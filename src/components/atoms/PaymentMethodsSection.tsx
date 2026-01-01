import Image from 'next/image';

import { motion } from 'framer-motion';

import mastercard_image from '../../../public/MasterCard-logo.webp';
import applepay_image from '../../../public/apple_pay_logo.png';
import mada_image from '../../../public/mada.svg';
import visaImage from '../../../public/visa.png';

const PaymentMethodsSection = () => {
  const paymentMethods = [
    {
      name: 'Visa',
      icon: (
        <Image
          loading="lazy"
          alt="Visa logo"
          className="h-10 w-auto"
          src={visaImage}
        />
      ),
    },
    {
      name: 'Mada',
      icon: (
        <Image
          loading="lazy"
          alt="Mada logo"
          className="h-6 w-auto"
          src={mada_image}
        />
      ),
    },
    {
      name: 'Master card',
      icon: (
        <Image
          loading="lazy"
          alt="master card logo"
          className="h-6 w-auto"
          src={mastercard_image}
        />
      ),
    },
    {
      name: 'Apple Pay',
      icon: (
        <Image
          loading="lazy"
          alt="apple pay logo"
          className="h-6 w-auto"
          src={applepay_image}
        />
      ),
    },
  ];

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="space-y-4">
      <h3 className="mb-6 text-lg font-bold text-gray-900 dark:text-white">
        طرق الدفع
      </h3>
      <motion.div
        className="grid grid-cols-2 gap-3"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        {paymentMethods.map(method => (
          <motion.div
            key={method.name}
            variants={itemVariants}
            className="group relative flex flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-gray-200/50 bg-white p-4 text-center shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg dark:border-gray-700/50 dark:bg-gray-800 dark:hover:border-blue-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-purple-50/0 to-pink-50/0 transition-all duration-300 group-hover:from-blue-50/50 group-hover:via-purple-50/30 group-hover:to-pink-50/50 dark:group-hover:from-blue-950/20 dark:group-hover:via-purple-950/10 dark:group-hover:to-pink-950/20"></div>
            <div className="relative z-10 mb-2 transition-transform duration-300 group-hover:scale-110">
              {method.icon}
            </div>
            <p className="relative z-10 text-xs font-semibold text-gray-700 transition-colors duration-300 group-hover:text-blue-600 dark:text-gray-300 dark:group-hover:text-blue-400">
              {method.name}
            </p>
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-green-50/50 px-3 py-2 dark:bg-green-950/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
        <p className="text-xs font-medium text-green-700 dark:text-green-400">
          جميع المعاملات مشفرة وآمنة
        </p>
      </motion.div>
    </div>
  );
};

export default PaymentMethodsSection;
