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

export default function SchemesCreate() {
    return (
        <>
            <Head title="Add Certification Scheme" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <Heading
                    title="Add Certification Scheme"
                    description="Create a new certification scheme."
                />

                <Card className="max-w-2xl">
                    <CardContent>
                        <Form
                            {...CertificationSchemeController.store.form()}
                            className="space-y-6"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-2">
                                        <Label htmlFor="code">Code</Label>
                                        <Input
                                            id="code"
                                            name="code"
                                            placeholder="e.g. JWD-2026"
                                            required
                                        />
                                        <InputError message={errors.code} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            placeholder="e.g. Junior Web Developer"
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
                                            placeholder="Optional description"
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

SchemesCreate.layout = {
    breadcrumbs: [
        { title: 'Certification Schemes', href: index() },
        { title: 'Add', href: '' },
    ],
};
