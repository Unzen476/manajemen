<?php

namespace Database\Factories;

use App\Models\CertificationScheme;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<CertificationScheme>
 */
class CertificationSchemeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $code = strtoupper(Str::random(3)).'-'.fake()->year();

        return [
            'code' => $code,
            'name' => fake()->unique()->jobTitle(),
            'description' => fake()->sentence(12),
        ];
    }
}
