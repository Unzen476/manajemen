<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateParticipantRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $participant = $this->route('participant');

        return [
            'certification_scheme_id' => ['required', 'integer', Rule::exists('certification_schemes', 'id')],
            'nim_nik' => [
                'required',
                'string',
                'max:255',
                Rule::unique('participants', 'nim_nik')->ignore($participant),
            ],
            'full_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255'],
            'phone_number' => ['required', 'string', 'max:255'],
            'address' => ['nullable', 'string'],
            'status' => ['required', Rule::in(['Pending', 'Passed', 'Failed'])],
        ];
    }
}
