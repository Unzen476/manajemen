import { Head } from '@inertiajs/react';
import {
    Award,
    CheckCircle2,
    Clock,
    TrendingUp,
    Users,
    XCircle,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { dashboard } from '@/routes';

type Stats = {
    totalParticipants: number;
    totalSchemes: number;
    passed: number;
    failed: number;
    pending: number;
    passRate: number;
};

function StatCard({
    title,
    value,
    icon: Icon,
    hint,
}: {
    title: string;
    value: string | number;
    icon: LucideIcon;
    hint?: string;
}) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>
                <Icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {hint && (
                    <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
                )}
            </CardContent>
        </Card>
    );
}

export default function Dashboard({ stats }: { stats: Stats }) {
    return (
        <>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="Total Participants"
                        value={stats.totalParticipants}
                        icon={Users}
                    />
                    <StatCard
                        title="Certification Schemes"
                        value={stats.totalSchemes}
                        icon={Award}
                    />
                    <StatCard
                        title="Pass Rate"
                        value={`${stats.passRate}%`}
                        icon={TrendingUp}
                        hint={`${stats.passed} of ${stats.totalParticipants} passed`}
                    />
                    <StatCard
                        title="Pending"
                        value={stats.pending}
                        icon={Clock}
                        hint="Awaiting assessment"
                    />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <StatCard
                        title="Passed"
                        value={stats.passed}
                        icon={CheckCircle2}
                        hint="Participants who passed"
                    />
                    <StatCard
                        title="Failed"
                        value={stats.failed}
                        icon={XCircle}
                        hint="Participants who failed"
                    />
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
