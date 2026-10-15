import { Form, Link } from '@inertiajs/react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { index } from '@/routes/participants';
import type { Participant, SchemeOption } from '@/types';

type RouteForm = {
    action: string;
    method: 'get' | 'post' | 'put' | 'patch' | 'delete';
};

const statuses = ['Pending', 'Passed', 'Failed'];

export default function ParticipantForm({
    form,
    schemes,
    participant,
    submitLabel = 'Save',
}: {
    form: RouteForm;
    schemes: SchemeOption[];
    participant?: Participant;
    submitLabel?: string;
}) {
    const [schemeId, setSchemeId] = useState<string>(
        participant?.certification_scheme_id
            ? String(participant.certification_scheme_id)
            : '',
    );
    const [status, setStatus] = useState<string>(
        participant?.status ?? 'Pending',
    );

    return (
        <Form {...form} className="space-y-6">
            {({ processing, errors }) => (
                <>
                    <div className="grid gap-6 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="full_name">Full name</Label>
                            <Input
                                id="full_name"
                                name="full_name"
                                defaultValue={participant?.full_name}
                                placeholder="Full name"
                                required
                            />
                            <InputError message={errors.full_name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="nim_nik">NIM / NIK</Label>
                            <Input
                                id="nim_nik"
                                name="nim_nik"
                                defaultValue={participant?.nim_nik}
                                placeholder="NIM or NIK"
                                required
                            />
                            <InputError message={errors.nim_nik} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                defaultValue={participant?.email}
                                placeholder="email@example.com"
                                required
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="phone_number">Phone number</Label>
                            <Input
                                id="phone_number"
                                name="phone_number"
                                defaultValue={participant?.phone_number}
                                placeholder="08xxxxxxxxxx"
                                required
                            />
                            <InputError message={errors.phone_number} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="certification_scheme_id">
                                Certification scheme
                            </Label>
                            <Select
                                value={schemeId}
                                onValueChange={setSchemeId}
                            >
                                <SelectTrigger
                                    id="certification_scheme_id"
                                    className="w-full"
                                >
                                    <SelectValue placeholder="Select a scheme" />
                                </SelectTrigger>
                                <SelectContent>
                                    {schemes.map((scheme) => (
                                        <SelectItem
                                            key={scheme.id}
                                            value={String(scheme.id)}
                                        >
                                            {scheme.code} — {scheme.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <input
                                type="hidden"
                                name="certification_scheme_id"
                                value={schemeId}
                            />
                            <InputError
                                message={errors.certification_scheme_id}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="status">Status</Label>
                            <Select value={status} onValueChange={setStatus}>
                                <SelectTrigger id="status" className="w-full">
                                    <SelectValue placeholder="Select a status" />
                                </SelectTrigger>
                                <SelectContent>
                                    {statuses.map((option) => (
                                        <SelectItem key={option} value={option}>
                                            {option}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <input type="hidden" name="status" value={status} />
                            <InputError message={errors.status} />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="address">Address</Label>
                        <Textarea
                            id="address"
                            name="address"
                            defaultValue={participant?.address ?? ''}
                            placeholder="Optional address"
                            rows={3}
                        />
                        <InputError message={errors.address} />
                    </div>

                    <div className="flex items-center gap-4">
                        <Button type="submit" disabled={processing}>
                            {submitLabel}
                        </Button>
                        <Button variant="secondary" type="button" asChild>
                            <Link href={index()}>Cancel</Link>
                        </Button>
                    </div>
                </>
            )}
        </Form>
    );
}
