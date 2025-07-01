type Props = {
  title?: string;
  description?: string;
};

export default function AdminSectionHeading({ description, title }: Props) {
  return (
    <div>
      <h3 className="text-lg font-medium capitalize">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}
