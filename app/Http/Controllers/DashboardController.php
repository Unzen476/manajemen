<?php

namespace App\Http\Controllers;

use App\Models\CertificationScheme;
use App\Models\Participant;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the dashboard with summary metrics.
     */
    public function index(): Response
    {
        $totalParticipants = Participant::count();
        $passed = Participant::where('status', 'Passed')->count();
        $failed = Participant::where('status', 'Failed')->count();
        $pending = Participant::where('status', 'Pending')->count();

        $passRate = $totalParticipants > 0
            ? round($passed / $totalParticipants * 100, 1)
            : 0.0;

        return Inertia::render('dashboard', [
            'stats' => [
                'totalParticipants' => $totalParticipants,
                'totalSchemes' => CertificationScheme::count(),
                'passed' => $passed,
                'failed' => $failed,
                'pending' => $pending,
                'passRate' => $passRate,
            ],
        ]);
    }
}
