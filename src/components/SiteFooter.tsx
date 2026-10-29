export default function SiteFooter() {
  return (
    <footer className="wrap mt-24 pb-10">
      <div className="flex flex-wrap justify-between gap-3 border-t border-line pt-4 text-sm text-muted">
        <p>&copy; {new Date().getFullYear()} Awab Elkhalil &middot; Istanbul</p>
        <a href="mailto:awabe.adam@gmail.com" className="hover:text-fg">
          awabe.adam@gmail.com
        </a>
      </div>
    </footer>
  );
}
