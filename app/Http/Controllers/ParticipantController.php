<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreParticipantRequest;
use App\Http\Requests\UpdateParticipantRequest;
use App\Models\CertificationScheme;
use App\Models\Participant;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ParticipantController extends Controller
{
    /**
     * Display a paginated, searchable listing of participants.
     */
    public function index(Request $request): Response
    {
        $search = trim((string) $request->query('search', ''));
        $scheme = $request->query('scheme');

        $participants = Participant::query()
            ->with('certificationScheme:id,code,name')
            ->when($search !== '', function ($query) use ($search) {
                $query->where(function ($query) use ($search) {
                    $query->where('full_name', 'like', "%{$search}%")
                        ->orWhere('nim_nik', 'like', "%{$search}%");
                });
            })
            ->when($scheme, fn ($query) => $query->where('certification_scheme_id', $scheme))
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('participants/index', [
            'participants' => $participants,
            'schemes' => CertificationScheme::orderBy('name')->get(['id', 'code', 'name']),
            'filters' => [
                'search' => $search,
                'scheme' => $scheme,
            ],
        ]);
    }

    /**
     * Show the form for registering a new participant.
     */
    public function create(): Response
    {
        return Inertia::render('participants/create', [
            'schemes' => CertificationScheme::orderBy('name')->get(['id', 'code', 'name']),
        ]);
    }

    /**
     * Store a newly registered participant.
     */
    public function store(StoreParticipantRequest $request): RedirectResponse
    {
        Participant::create($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Participant registered.')]);

        return to_route('participants.index');
    }

    /**
     * Display the complete profile of the specified participant.
     */
    public function show(Participant $participant): Response
    {
        $participant->load('certificationScheme:id,code,name,description');

        return Inertia::render('participants/show', [
            'participant' => $participant,
        ]);
    }

    /**
     * Show the form for editing the specified participant.
     */
    public function edit(Participant $participant): Response
    {
        return Inertia::render('participants/edit', [
            'participant' => $participant,
            'schemes' => CertificationScheme::orderBy('name')->get(['id', 'code', 'name']),
        ]);
    }

    /**
     * Update the specified participant.
     */
    public function update(UpdateParticipantRequest $request, Participant $participant): RedirectResponse
    {
        $participant->update($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Participant updated.')]);

        return to_route('participants.index');
    }

    /**
     * Remove the specified participant.
     */
    public function destroy(Participant $participant): RedirectResponse
    {
        $participant->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Participant deleted.')]);

        return to_route('participants.index');
    }
}
