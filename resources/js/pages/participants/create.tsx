import { Head } from '@inertiajs/react';
import ParticipantController from '@/actions/App/Http/Controllers/ParticipantController';
import Heading from '@/components/heading';
import ParticipantForm from '@/components/participant-form';
import { Card, CardContent } from '@/components/ui/card';
import { index } from '@/routes/participants';
import type { SchemeOption } from '@/types';

type PageProps = {
    schemes: SchemeOption[];
};

export default function ParticipantsCreate({ schemes }: PageProps) {
    return (
        <>
            <Head title="Register Participant" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <Heading
                    title="Register Participant"
                    description="Add a new participant and link them to a certification scheme."
                />

                <Card className="max-w-3xl">
                    <CardContent>
                        <ParticipantForm
                            form={ParticipantController.store.form()}
                            schemes={schemes}
                            submitLabel="Register"
                        />
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

ParticipantsCreate.layout = {
    breadcrumbs: [
        { title: 'Participants', href: index() },
        { title: 'Register', href: '' },
    ],
};
