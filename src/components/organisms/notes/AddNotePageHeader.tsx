import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

const AddNotePageHeader = ({ onBack }: { onBack: () => void }) => (
  <div className="mb-8 border-b border-gray-200 pb-6 dark:border-gray-700">
    <Button
      variant="ghost"
      className="hover:text-primary dark:hover:text-primary-light mb-4 text-gray-600 dark:text-gray-300"
      onClick={onBack}
    >
      <ArrowRight className="ml-2 size-4" /> العودة
    </Button>
    <h1 className="text-3xl font-extrabold text-gray-800 sm:text-4xl dark:text-white">
      إضافة ملخص جديد
    </h1>
    <p className="text-md mt-2 text-gray-600 sm:text-lg dark:text-gray-400">
      &quot;شارك معرفتك وساعد زملائك بإضافة ملخص جديد للبيع على المنصة.&quot;
    </p>
  </div>
);

export default AddNotePageHeader;
