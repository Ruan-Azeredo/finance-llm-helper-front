export default function SectionContainer({ children, title, className }: { children: React.ReactNode, title: string, className?: string }) {
    return (
        <section aria-labelledby={title} className={className}>
            <h2 id={title} className="sr-only">
            {title}
            </h2>
            <div className={`overflow-visible rounded-lg bg-white shadow`}>
            {children}
            </div>
        </section>
    )
}