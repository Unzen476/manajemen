<?php

namespace Database\Factories;

use App\Models\CertificationScheme;
use App\Models\Participant;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Participant>
 */
class ParticipantFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'certification_scheme_id' => CertificationScheme::factory(),
            'nim_nik' => (string) fake()->unique()->numerify('################'),
            'full_name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'phone_number' => fake()->numerify('08##########'),
            'address' => fake()->address(),
            'status' => fake()->randomElement(['Pending', 'Passed', 'Failed']),
        ];
    }
}
