export default function SectionHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h2 className="from-primary bg-gradient-to-r to-blue-600 bg-clip-text text-xl font-bold tracking-tight text-transparent sm:text-3xl">
        {title}
      </h2>
      <p className="text-muted-foreground mt-2 text-sm sm:text-lg">
        {description}
      </p>
    </div>
  );
}
