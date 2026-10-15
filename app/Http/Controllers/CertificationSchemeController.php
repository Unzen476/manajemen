<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCertificationSchemeRequest;
use App\Http\Requests\UpdateCertificationSchemeRequest;
use App\Models\CertificationScheme;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class CertificationSchemeController extends Controller
{
    /**
     * Display a paginated listing of the certification schemes.
     */
    public function index(): Response
    {
        $schemes = CertificationScheme::query()
            ->withCount('participants')
            ->latest()
            ->paginate(10);

        return Inertia::render('schemes/index', [
            'schemes' => $schemes,
        ]);
    }

    /**
     * Show the form for creating a new certification scheme.
     */
    public function create(): Response
    {
        return Inertia::render('schemes/create');
    }

    /**
     * Store a newly created certification scheme.
     */
    public function store(StoreCertificationSchemeRequest $request): RedirectResponse
    {
        CertificationScheme::create($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Certification scheme created.')]);

        return to_route('schemes.index');
    }

    /**
     * Show the form for editing the specified certification scheme.
     */
    public function edit(CertificationScheme $scheme): Response
    {
        return Inertia::render('schemes/edit', [
            'scheme' => $scheme,
        ]);
    }

    /**
     * Update the specified certification scheme.
     */
    public function update(UpdateCertificationSchemeRequest $request, CertificationScheme $scheme): RedirectResponse
    {
        $scheme->update($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Certification scheme updated.')]);

        return to_route('schemes.index');
    }

    /**
     * Remove the specified certification scheme.
     */
    public function destroy(CertificationScheme $scheme): RedirectResponse
    {
        $scheme->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Certification scheme deleted.')]);

        return to_route('schemes.index');
    }
}
