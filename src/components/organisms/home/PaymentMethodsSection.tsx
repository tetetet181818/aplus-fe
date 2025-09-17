import visaImage from "../../../public/visa.png";
import mada_image from "../../../public/mada.svg";
import mastercard_image from "../../../public/MasterCard-logo.webp";
import Image from "next/image";
import { JSX } from "react";

interface PaymentMethod {
  name: string;
  icon: JSX.Element;
  description: string;
}

const PaymentMethodsSection = (): JSX.Element => {
  const paymentMethods: PaymentMethod[] = [
    {
      name: "Visa",
      description: "Pay securely with Visa credit or debit cards",
      icon: (
        <Image
          loading="lazy"
          alt="Visa logo"
          className="h-6 w-auto"
          src={visaImage}
          width={40}
          height={24}
        />
      ),
    },
    {
      name: "Mada",
      description: "Saudi Arabian Mada payment system",
      icon: (
        <Image
          loading="lazy"
          alt="Mada logo"
          className="h-6 w-auto"
          src={mada_image}
          width={40}
          height={24}
        />
      ),
    },
    {
      name: "MasterCard",
      description: "Pay with Mastercard credit or debit cards",
      icon: (
        <Image
          loading="lazy"
          alt="Mastercard logo"
          className="h-6 w-auto"
          src={mastercard_image}
          width={40}
          height={24}
        />
      ),
    },
  ];

  return (
    <section aria-labelledby="payment-methods-heading">
      <h3
        id="payment-methods-heading"
        className="font-semibold text-lg mb-4 text-gray-700 dark:text-gray-200"
      >
        طرق الدفع المتاحة
      </h3>

      <div className="flex gap-2" role="list" aria-label="Payment methods">
        {paymentMethods.map((method) => (
          <div
            key={method.name}
            className="p-3 bg-gray-100 dark:bg-gray-800 rounded-md flex flex-col flex-1 text-center items-center justify-center"
            role="listitem"
          >
            <div className="mb-1" aria-hidden="true">
              {method.icon}
            </div>
            <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
              {method.name}
            </p>
          </div>
        ))}
      </div>

      <p className="text-gray-500 dark:text-gray-500 mt-3 text-xs">
        جميع المعاملات مشفرة وآمنة.
      </p>

      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "طرق الدفع المتاحة",
            description: "خيارات الدفع الآمنة والمشفرة المتاحة للعملاء",
            paymentAccepted: paymentMethods
              .map((method) => method.name)
              .join(", "),
          }),
        }}
      />
    </section>
  );
};

export default PaymentMethodsSection;
