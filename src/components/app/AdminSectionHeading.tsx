import React from "react";

type Props = {
  title?: string;
  description?: string;
};

export default function AdminSectionHeading({ description, title }: Props) {
  return (
    <div>
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
