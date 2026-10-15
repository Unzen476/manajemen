<?php

namespace Database\Seeders;

use App\Models\CertificationScheme;
use App\Models\Participant;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Administrator',
            'email' => 'admin@example.com',
        ]);

        $schemes = collect([
            ['code' => 'JWD-2026', 'name' => 'Junior Web Developer', 'description' => 'Skema sertifikasi untuk pengembang web pemula sesuai standar SKKNI.'],
            ['code' => 'JMD-2026', 'name' => 'Junior Mobile Developer', 'description' => 'Skema sertifikasi untuk pengembang aplikasi mobile pemula.'],
            ['code' => 'JND-2026', 'name' => 'Junior Network Administrator', 'description' => 'Skema sertifikasi untuk administrasi jaringan tingkat dasar.'],
            ['code' => 'JDD-2026', 'name' => 'Junior Data Analyst', 'description' => 'Skema sertifikasi untuk analis data tingkat dasar.'],
            ['code' => 'CCS-2026', 'name' => 'Cloud Computing Specialist', 'description' => 'Skema sertifikasi untuk spesialis komputasi awan.'],
        ])->map(fn (array $scheme) => CertificationScheme::create($scheme));

        Participant::factory()
            ->count(30)
            ->recycle($schemes)
            ->create();
    }
}
