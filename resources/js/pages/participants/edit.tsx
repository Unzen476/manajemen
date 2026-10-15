import { Head } from '@inertiajs/react';
import ParticipantController from '@/actions/App/Http/Controllers/ParticipantController';
import Heading from '@/components/heading';
import ParticipantForm from '@/components/participant-form';
import { Card, CardContent } from '@/components/ui/card';
import { index } from '@/routes/participants';
import type { Participant, SchemeOption } from '@/types';

type PageProps = {
    participant: Participant;
    schemes: SchemeOption[];
};

export default function ParticipantsEdit({ participant, schemes }: PageProps) {
    return (
        <>
            <Head title="Edit Participant" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <Heading
                    title="Edit Participant"
                    description={`Update details for ${participant.full_name}.`}
                />

                <Card className="max-w-3xl">
                    <CardContent>
                        <ParticipantForm
                            form={ParticipantController.update.form(
                                participant.id,
                            )}
                            schemes={schemes}
                            participant={participant}
                        />
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

ParticipantsEdit.layout = {
    breadcrumbs: [
        { title: 'Participants', href: index() },
        { title: 'Edit', href: '' },
    ],
};
