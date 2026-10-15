import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { ParticipantStatus } from '@/types';

const statusStyles: Record<ParticipantStatus, string> = {
    Passed: 'border-transparent bg-green-600 text-white',
    Failed: 'border-transparent bg-red-600 text-white',
    Pending: 'border-transparent bg-amber-500 text-white',
};

export default function StatusBadge({ status }: { status: ParticipantStatus }) {
    return <Badge className={cn(statusStyles[status])}>{status}</Badge>;
}
