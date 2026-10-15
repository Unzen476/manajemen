<?php

namespace App\Models;

use Database\Factories\ParticipantFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $certification_scheme_id
 * @property string $nim_nik
 * @property string $full_name
 * @property string $email
 * @property string $phone_number
 * @property string|null $address
 * @property string $status
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property Carbon|null $deleted_at
 * @property-read CertificationScheme $certificationScheme
 */
#[Fillable([
    'certification_scheme_id',
    'nim_nik',
    'full_name',
    'email',
    'phone_number',
    'address',
    'status',
])]
class Participant extends Model
{
    /** @use HasFactory<ParticipantFactory> */
    use HasFactory, SoftDeletes;

    /**
     * The attributes that should be cast to native types.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'certification_scheme_id' => 'integer',
        ];
    }

    /**
     * The certification scheme this participant is registered under.
     *
     * @return BelongsTo<CertificationScheme, $this>
     */
    public function certificationScheme(): BelongsTo
    {
        return $this->belongsTo(CertificationScheme::class);
    }
}
