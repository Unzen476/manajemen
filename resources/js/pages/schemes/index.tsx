import { Head, Link } from '@inertiajs/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import CertificationSchemeController from '@/actions/App/Http/Controllers/CertificationSchemeController';
import ConfirmDelete from '@/components/confirm-delete';
import Heading from '@/components/heading';
import Pagination from '@/components/pagination';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { create, edit, index } from '@/routes/schemes';
import type { CertificationScheme, Paginated } from '@/types';

type PageProps = {
    schemes: Paginated<CertificationScheme>;
};

export default function SchemesIndex({ schemes }: PageProps) {
    return (
        <>
            <Head title="Certification Schemes" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between gap-4">
                    <Heading
                        title="Certification Schemes"
                        description="Manage the certification schemes offered."
                    />

                    <Button asChild>
                        <Link href={create()}>
                            <Plus />
                            Add scheme
                        </Link>
                    </Button>
                </div>

                <Card className="py-0">
                    <CardContent className="px-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="pl-6">Code</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Participants</TableHead>
                                    <TableHead className="pr-6 text-right">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {schemes.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={4}
                                            className="h-24 text-center text-muted-foreground"
                                        >
                                            No certification schemes found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    schemes.data.map((scheme) => (
                                        <TableRow key={scheme.id}>
                                            <TableCell className="pl-6 font-medium">
                                                {scheme.code}
                                            </TableCell>
                                            <TableCell>{scheme.name}</TableCell>
                                            <TableCell>
                                                {scheme.participants_count ?? 0}
                                            </TableCell>
                                            <TableCell className="pr-6">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        asChild
                                                    >
                                                        <Link
                                                            href={edit(
                                                                scheme.id,
                                                            )}
                                                        >
                                                            <Pencil />
                                                            Edit
                                                        </Link>
                                                    </Button>

                                                    <ConfirmDelete
                                                        form={CertificationSchemeController.destroy.form(
                                                            scheme.id,
                                                        )}
                                                        title="Delete certification scheme?"
                                                        description={`This will remove "${scheme.name}". This action cannot be undone.`}
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

                <Pagination paginator={schemes} />
            </div>
        </>
    );
}

SchemesIndex.layout = {
    breadcrumbs: [
        {
            title: 'Certification Schemes',
            href: index(),
        },
    ],
};
