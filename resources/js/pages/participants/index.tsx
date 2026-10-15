import { Head, Link, router } from '@inertiajs/react';
import { Eye, Pencil, Plus, Search, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import ParticipantController from '@/actions/App/Http/Controllers/ParticipantController';
import ConfirmDelete from '@/components/confirm-delete';
import Heading from '@/components/heading';
import Pagination from '@/components/pagination';
import StatusBadge from '@/components/status-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { create, edit, index, show } from '@/routes/participants';
import type { Paginated, Participant, SchemeOption } from '@/types';

type PageProps = {
    participants: Paginated<Participant>;
    schemes: SchemeOption[];
    filters: {
        search: string;
        scheme: string | null;
    };
};

export default function ParticipantsIndex({
    participants,
    schemes,
    filters,
}: PageProps) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [scheme, setScheme] = useState<string>(
        filters.scheme ? String(filters.scheme) : 'all',
    );

    function applyFilters(event: React.FormEvent) {
        event.preventDefault();

        const params: Record<string, string> = {};

        if (search.trim() !== '') {
            params.search = search.trim();
        }

        if (scheme !== 'all') {
            params.scheme = scheme;
        }

        router.get(index().url, params, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    }

    function resetFilters() {
        setSearch('');
        setScheme('all');

        router.get(
            index().url,
            {},
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    }

    const hasFilters = filters.search !== '' || filters.scheme !== null;

    return (
        <>
            <Head title="Participants" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between gap-4">
                    <Heading
                        title="Participants"
                        description="Manage certification participants."
                    />

                    <Button asChild>
                        <Link href={create()}>
                            <Plus />
                            Register participant
                        </Link>
                    </Button>
                </div>

                <form
                    onSubmit={applyFilters}
                    className="flex flex-col gap-2 sm:flex-row sm:items-center"
                >
                    <div className="relative sm:max-w-xs">
                        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search by name or NIM/NIK"
                            className="pl-9"
                        />
                    </div>

                    <Select value={scheme} onValueChange={setScheme}>
                        <SelectTrigger className="w-full sm:w-64">
                            <SelectValue placeholder="All schemes" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All schemes</SelectItem>
                            {schemes.map((option) => (
                                <SelectItem
                                    key={option.id}
                                    value={String(option.id)}
                                >
                                    {option.code} — {option.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <div className="flex items-center gap-2">
                        <Button type="submit" variant="secondary">
                            <Search />
                            Search
                        </Button>

                        {hasFilters && (
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={resetFilters}
                            >
                                <X />
                                Reset
                            </Button>
                        )}
                    </div>
                </form>

                <Card className="py-0">
                    <CardContent className="px-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="pl-6">Name</TableHead>
                                    <TableHead>NIM / NIK</TableHead>
                                    <TableHead>Scheme</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="pr-6 text-right">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {participants.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={5}
                                            className="h-24 text-center text-muted-foreground"
                                        >
                                            No participants found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    participants.data.map((participant) => (
                                        <TableRow key={participant.id}>
                                            <TableCell className="pl-6 font-medium">
                                                {participant.full_name}
                                            </TableCell>
                                            <TableCell>
                                                {participant.nim_nik}
                                            </TableCell>
                                            <TableCell>
                                                {participant
                                                    .certification_scheme
                                                    ?.name ?? '—'}
                                            </TableCell>
                                            <TableCell>
                                                <StatusBadge
                                                    status={participant.status}
                                                />
                                            </TableCell>
                                            <TableCell className="pr-6">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        asChild
                                                    >
                                                        <Link
                                                            href={show(
                                                                participant.id,
                                                            )}
                                                        >
                                                            <Eye />
                                                            Detail
                                                        </Link>
                                                    </Button>

                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        asChild
                                                    >
                                                        <Link
                                                            href={edit(
                                                                participant.id,
                                                            )}
                                                        >
                                                            <Pencil />
                                                            Edit
                                                        </Link>
                                                    </Button>

                                                    <ConfirmDelete
                                                        form={ParticipantController.destroy.form(
                                                            participant.id,
                                                        )}
                                                        title="Delete participant?"
                                                        description={`This will remove ${participant.full_name}. This action cannot be undone.`}
                                                    >
                                                        <Button
                                                            variant="destructive"
                                                            size="sm"
                                                        >
                                                            <Trash2 />
                                                            Delete
                                                        </Button>
                                                    </ConfirmDelete>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Pagination paginator={participants} />
            </div>
        </>
    );
}

ParticipantsIndex.layout = {
    breadcrumbs: [
        {
            title: 'Participants',
            href: index(),
        },
    ],
};
