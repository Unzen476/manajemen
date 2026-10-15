import { Form, Head, Link } from '@inertiajs/react';
import CertificationSchemeController from '@/actions/App/Http/Controllers/CertificationSchemeController';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { index } from '@/routes/schemes';
import type { CertificationScheme } from '@/types';

type PageProps = {
    scheme: CertificationScheme;
};

export default function SchemesEdit({ scheme }: PageProps) {
    return (
        <>
            <Head title="Edit Certification Scheme" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <Heading
                    title="Edit Certification Scheme"
                    description={`Update details for ${scheme.name}.`}
                />

                <Card className="max-w-2xl">
                    <CardContent>
                        <Form
                            {...CertificationSchemeController.update.form(
                                scheme.id,
                            )}
                            className="space-y-6"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-2">
                                        <Label htmlFor="code">Code</Label>
                                        <Input
                                            id="code"
                                            name="code"
                                            defaultValue={scheme.code}
                                            required
                                        />
                                        <InputError message={errors.code} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            defaultValue={scheme.name}
                                            required
                                        />
                                        <InputError message={errors.name} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="description">
                                            Description
                                        </Label>
                                        <Textarea
                                            id="description"
                                            name="description"
                                            defaultValue={
                                                scheme.description ?? ''
                                            }
                                            rows={4}
                                        />
                                        <InputError
                                            message={errors.description}
                                        />
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <Button
                                            type="submit"
                                            disabled={processing}
                                        >
                                            Save
                                        </Button>
                                        <Button
                                            variant="secondary"
                                            type="button"
                                            asChild
                                        >
                                            <Link href={index()}>Cancel</Link>
                                        </Button>
                                    </div>
                                </>
                            )}
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

SchemesEdit.layout = {
    breadcrumbs: [
        { title: 'Certification Schemes', href: index() },
        { title: 'Edit', href: '' },
    ],
};
