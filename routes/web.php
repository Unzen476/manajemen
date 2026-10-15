<?php

use App\Http\Controllers\CertificationSchemeController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ParticipantController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::resource('schemes', CertificationSchemeController::class)->except('show');
    Route::resource('participants', ParticipantController::class);
});

require __DIR__.'/settings.php';
