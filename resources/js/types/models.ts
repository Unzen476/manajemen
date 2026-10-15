export type CertificationScheme = {
    id: number;
    code: string;
    name: string;
    description: string | null;
    participants_count?: number;
    created_at: string;
    updated_at: string;
};

export type ParticipantStatus = 'Pending' | 'Passed' | 'Failed';

export type Participant = {
    id: number;
    certification_scheme_id: number;
    nim_nik: string;
    full_name: string;
    email: string;
    phone_number: string;
    address: string | null;
    status: ParticipantStatus;
    certification_scheme?: Pick<
        CertificationScheme,
        'id' | 'code' | 'name' | 'description'
    >;
    created_at: string;
    updated_at: string;
};

export type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

export type Paginated<T> = {
    data: T[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
};

export type SchemeOption = Pick<CertificationScheme, 'id' | 'code' | 'name'>;
