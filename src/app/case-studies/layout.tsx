export default function CaseStudyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="case-study-page"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      {children}
    </div>
  );
}
