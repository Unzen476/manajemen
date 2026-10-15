<?php

namespace Tests\Feature;

use App\Models\CertificationScheme;
use App\Models\Participant;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ParticipantTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_redirected_to_the_login_page(): void
    {
        $this->get(route('participants.index'))->assertRedirect(route('login'));
    }

    public function test_participants_index_can_be_rendered(): void
    {
        $this->actingAs(User::factory()->create())
            ->get(route('participants.index'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('participants/index')
                ->has('participants.data')
                ->has('schemes'));
    }

    public function test_a_participant_can_be_registered_and_linked_to_a_scheme(): void
    {
        $scheme = CertificationScheme::factory()->create();

        $this->actingAs(User::factory()->create())
            ->post(route('participants.store'), [
                'certification_scheme_id' => $scheme->id,
                'nim_nik' => '1234567890123456',
                'full_name' => 'Jane Doe',
                'email' => 'jane@example.com',
                'phone_number' => '081234567890',
                'address' => 'Jl. Mawar No. 1',
                'status' => 'Pending',
            ])
            ->assertSessionHasNoErrors()
            ->assertRedirect(route('participants.index'));

        $this->assertDatabaseHas('participants', [
            'nim_nik' => '1234567890123456',
            'certification_scheme_id' => $scheme->id,
        ]);
    }

    public function test_required_fields_are_validated_on_store(): void
    {
        $this->actingAs(User::factory()->create())
            ->post(route('participants.store'), [])
            ->assertSessionHasErrors([
                'certification_scheme_id',
                'nim_nik',
                'full_name',
                'email',
                'phone_number',
                'status',
            ]);
    }

    public function test_nim_nik_must_be_unique(): void
    {
        $existing = Participant::factory()->create(['nim_nik' => '9999999999']);

        $this->actingAs(User::factory()->create())
            ->post(route('participants.store'), [
                'certification_scheme_id' => $existing->certification_scheme_id,
                'nim_nik' => '9999999999',
                'full_name' => 'Duplicate',
                'email' => 'dup@example.com',
                'phone_number' => '081200000000',
                'status' => 'Pending',
            ])
            ->assertSessionHasErrors('nim_nik');
    }

    public function test_certification_scheme_must_exist(): void
    {
        $this->actingAs(User::factory()->create())
            ->post(route('participants.store'), [
                'certification_scheme_id' => 99999,
                'nim_nik' => '1111111111',
                'full_name' => 'Ghost',
                'email' => 'ghost@example.com',
                'phone_number' => '081200000001',
                'status' => 'Pending',
            ])
            ->assertSessionHasErrors('certification_scheme_id');
    }

    public function test_participants_can_be_searched_by_name(): void
    {
        $scheme = CertificationScheme::factory()->create();
        Participant::factory()->for($scheme, 'certificationScheme')->create(['full_name' => 'Jane Doe']);
        Participant::factory()->for($scheme, 'certificationScheme')->create(['full_name' => 'John Smith']);

        $this->actingAs(User::factory()->create())
            ->get(route('participants.index', ['search' => 'Jane']))
            ->assertInertia(fn (Assert $page) => $page
                ->component('participants/index')
                ->has('participants.data', 1)
                ->where('participants.data.0.full_name', 'Jane Doe'));
    }

    public function test_participants_can_be_searched_by_nim_nik(): void
    {
        $scheme = CertificationScheme::factory()->create();
        Participant::factory()->for($scheme, 'certificationScheme')->create(['nim_nik' => '5551234567']);
        Participant::factory()->for($scheme, 'certificationScheme')->create(['nim_nik' => '5557654321']);

        $this->actingAs(User::factory()->create())
            ->get(route('participants.index', ['search' => '1234567']))
            ->assertInertia(fn (Assert $page) => $page
                ->component('participants/index')
                ->has('participants.data', 1)
                ->where('participants.data.0.nim_nik', '5551234567'));
    }

    public function test_participants_can_be_filtered_by_scheme(): void
    {
        $schemeA = CertificationScheme::factory()->create();
        $schemeB = CertificationScheme::factory()->create();

        Participant::factory()->for($schemeA, 'certificationScheme')->count(2)->create();
        Participant::factory()->for($schemeB, 'certificationScheme')->create();

        $this->actingAs(User::factory()->create())
            ->get(route('participants.index', ['scheme' => $schemeA->id]))
            ->assertInertia(fn (Assert $page) => $page
                ->component('participants/index')
                ->has('participants.data', 2));
    }

    public function test_participant_detail_displays_linked_scheme(): void
    {
        $scheme = CertificationScheme::factory()->create(['name' => 'Junior Web Developer']);
        $participant = Participant::factory()->for($scheme, 'certificationScheme')->create();

        $this->actingAs(User::factory()->create())
            ->get(route('participants.show', $participant))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('participants/show')
                ->where('participant.id', $participant->id)
                ->where('participant.certification_scheme.name', 'Junior Web Developer'));
    }

    public function test_a_participant_can_be_updated(): void
    {
        $participant = Participant::factory()->create();

        $this->actingAs(User::factory()->create())
            ->put(route('participants.update', $participant), [
                'certification_scheme_id' => $participant->certification_scheme_id,
                'nim_nik' => $participant->nim_nik,
                'full_name' => 'Updated Name',
                'email' => $participant->email,
                'phone_number' => $participant->phone_number,
                'address' => $participant->address,
                'status' => 'Passed',
            ])
            ->assertSessionHasNoErrors()
            ->assertRedirect(route('participants.index'));

        $this->assertDatabaseHas('participants', [
            'id' => $participant->id,
            'full_name' => 'Updated Name',
            'status' => 'Passed',
        ]);
    }

    public function test_a_participant_can_be_soft_deleted(): void
    {
        $participant = Participant::factory()->create();

        $this->actingAs(User::factory()->create())
            ->delete(route('participants.destroy', $participant))
            ->assertRedirect(route('participants.index'));

        $this->assertSoftDeleted('participants', ['id' => $participant->id]);
    }
}
