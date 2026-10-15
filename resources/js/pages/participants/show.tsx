import { Head, Link } from '@inertiajs/react';
import { Pencil, ArrowLeft } from 'lucide-react';
import Heading from '@/components/heading';
import StatusBadge from '@/components/status-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { edit, index } from '@/routes/participants';
import type { Participant } from '@/types';

type PageProps = {
    participant: Participant;
};

function DetailItem({
    label,
    value,
}: {
    label: string;
    value: string | null | undefined;
}) {
    return (
        <div className="grid gap-1">
            <span className="text-sm text-muted-foreground">{label}</span>
            <span className="text-sm font-medium">{value || '—'}</span>
        </div>
    );
}

export default function ParticipantsShow({ participant }: PageProps) {
    const scheme = participant.certification_scheme;

    return (
        <>
            <Head title={participant.full_name} />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between gap-4">
                    <Heading
                        title="Participant Detail"
                        description="Complete profile and linked certification scheme."
                    />

                    <div className="flex items-center gap-2">
                        <Button variant="secondary" asChild>
                            <Link href={index()}>
                                <ArrowLeft />
                                Back
                            </Link>
                        </Button>

                        <Button asChild>
                            <Link href={edit(participant.id)}>
                                <Pencil />
                                Edit
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-3">
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Participant Information</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4 sm:grid-cols-2">
                            <DetailItem
                                label="Full name"
                                value={participant.full_name}
                            />
                            <DetailItem
                                label="NIM / NIK"
                                value={participant.nim_nik}
                            />
                            <DetailItem
                                label="Email"
                                value={participant.email}
                            />
                            <DetailItem
                                label="Phone number"
                                value={participant.phone_number}
                            />
                            <div className="grid gap-1">
                                <span className="text-sm text-muted-foreground">
                                    Status
                                </span>
                                <div>
                                    <StatusBadge status={participant.status} />
                                </div>
                            </div>
                            <DetailItem
                                label="Registered at"
                                value={new Date(
                                    participant.created_at,
                                ).toLocaleString()}
                            />
                            <div className="grid gap-1 sm:col-span-2">
                                <span className="text-sm text-muted-foreground">
                                    Address
                                </span>
                                <span className="text-sm font-medium">
                                    {participant.address || '—'}
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Certification Scheme</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <DetailItem label="Code" value={scheme?.code} />
                            <Separator />
                            <DetailItem label="Name" value={scheme?.name} />
                            <Separator />
                            <div className="grid gap-1">
                                <span className="text-sm text-muted-foreground">
                                    Description
                                </span>
                                <span className="text-sm font-medium">
                                    {scheme?.description || '—'}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

ParticipantsShow.layout = {
    breadcrumbs: [
        { title: 'Participants', href: index() },
        { title: 'Detail', href: '' },
    ],
};
