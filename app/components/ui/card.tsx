interface CardProps {
  children: React.ReactNode;
  title?: string;
}

export function Card({ children, title }: CardProps) {
  return (
    <div className="card">
      {title && <h3 className="section-header">{title}</h3>}
      {children}
    </div>
  );
}
