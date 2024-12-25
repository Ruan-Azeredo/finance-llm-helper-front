export default function SectionContainer({ children, title }: { children: React.ReactNode, title: string}) {
    return (
        <section aria-labelledby={title}>
            <h2 id={title} className="sr-only">
            {title}
            </h2>
            <div className="overflow-visible rounded-lg bg-white shadow">
            {children}
            </div>
        </section>
    )
}