<?php

namespace Tests\Feature;

use App\Models\CertificationScheme;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class CertificationSchemeTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_redirected_to_the_login_page(): void
    {
        $this->get(route('schemes.index'))->assertRedirect(route('login'));
    }

    public function test_schemes_index_can_be_rendered(): void
    {
        $this->actingAs(User::factory()->create())
            ->get(route('schemes.index'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page->component('schemes/index'));
    }

    public function test_a_scheme_can_be_created(): void
    {
        $this->actingAs(User::factory()->create())
            ->post(route('schemes.store'), [
                'code' => 'JWD-2026',
                'name' => 'Junior Web Developer',
                'description' => 'Skema pengembang web.',
            ])
            ->assertSessionHasNoErrors()
            ->assertRedirect(route('schemes.index'));

        $this->assertDatabaseHas('certification_schemes', [
            'code' => 'JWD-2026',
            'name' => 'Junior Web Developer',
        ]);
    }

    public function test_scheme_code_must_be_unique(): void
    {
        CertificationScheme::factory()->create(['code' => 'JWD-2026']);

        $this->actingAs(User::factory()->create())
            ->post(route('schemes.store'), [
                'code' => 'JWD-2026',
                'name' => 'Duplicate',
            ])
            ->assertSessionHasErrors('code');
    }

    public function test_a_scheme_can_be_updated(): void
    {
        $scheme = CertificationScheme::factory()->create();

        $this->actingAs(User::factory()->create())
            ->put(route('schemes.update', $scheme), [
                'code' => 'UPD-2026',
                'name' => 'Updated Scheme',
                'description' => null,
            ])
            ->assertSessionHasNoErrors()
            ->assertRedirect(route('schemes.index'));

        $this->assertDatabaseHas('certification_schemes', [
            'id' => $scheme->id,
            'code' => 'UPD-2026',
            'name' => 'Updated Scheme',
        ]);
    }

    public function test_a_scheme_can_be_soft_deleted(): void
    {
        $scheme = CertificationScheme::factory()->create();

        $this->actingAs(User::factory()->create())
            ->delete(route('schemes.destroy', $scheme))
            ->assertRedirect(route('schemes.index'));

        $this->assertSoftDeleted('certification_schemes', ['id' => $scheme->id]);
    }
}
