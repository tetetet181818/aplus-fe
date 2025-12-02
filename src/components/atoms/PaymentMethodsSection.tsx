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
    <div>
      <h3 className="mb-4 text-lg font-semibold text-gray-700 dark:text-gray-200">
        طرق الدفع
      </h3>
      <motion.div
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        {paymentMethods.map(method => (
          <motion.div
            key={method.name}
            variants={itemVariants}
            className="flex flex-1 flex-col items-center justify-center rounded-md bg-gray-100 p-3 text-center dark:bg-gray-800"
          >
            <div className="mb-1">{method.icon}</div>
            <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
              {method.name}
            </p>
          </motion.div>
        ))}
      </motion.div>
      <motion.p
        className="mt-3 text-xs text-gray-500 dark:text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        جميع المعاملات مشفرة وآمنة.
      </motion.p>
    </div>
  );
};

export default PaymentMethodsSection;
