export function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div>
      <p className="font-mono text-sm text-slate">{eyebrow}</p>
      <h2 className="mt-2 font-mono text-2xl sm:text-3xl font-bold text-paper">
        {title}
      </h2>
    </div>
  );
}

export default SectionHeading;
