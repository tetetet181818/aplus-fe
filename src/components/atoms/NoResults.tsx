import { Card, CardContent } from '@/components/ui/card';

interface NoResultsProps {
  icon: React.ReactNode;
  title: string;
  message: string;
  actionButton?: React.ReactNode;
}

const NoResults = ({ icon, title, message, actionButton }: NoResultsProps) => {
  return (
    <Card className="mx-auto w-full max-w-lg border-dashed border-gray-300 shadow-none dark:border-gray-700">
      <CardContent className="px-6 py-12 text-center">
        {icon && <div className="mb-4 flex justify-center">{icon}</div>}
        <h3 className="mb-2 text-xl font-bold text-gray-700 dark:text-gray-300">
          {title}
        </h3>
        <p className="mb-6 text-gray-600 dark:text-gray-400">{message}</p>
        {actionButton}
      </CardContent>
    </Card>
  );
};

export default NoResults;
