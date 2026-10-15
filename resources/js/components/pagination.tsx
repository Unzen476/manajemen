import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import type { Paginated } from '@/types';

export default function Pagination<T>({
    paginator,
}: {
    paginator: Paginated<T>;
}) {
    if (paginator.last_page <= 1) {
        return null;
    }

    return (
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
                Showing {paginator.from ?? 0} to {paginator.to ?? 0} of{' '}
                {paginator.total} results
            </p>

            <div className="flex flex-wrap items-center gap-1">
                {paginator.links.map((link, index) =>
                    link.url === null ? (
                        <span
                            key={index}
                            className="rounded-md border border-transparent px-3 py-1.5 text-sm text-muted-foreground opacity-50"
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ) : (
                        <Link
                            key={index}
                            href={link.url}
                            preserveScroll
                            className={cn(
                                'rounded-md border px-3 py-1.5 text-sm transition-colors',
                                link.active
                                    ? 'border-primary bg-primary text-primary-foreground'
                                    : 'border-input hover:bg-accent hover:text-accent-foreground',
                            )}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ),
                )}
            </div>
        </div>
    );
}
