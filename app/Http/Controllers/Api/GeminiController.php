<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;

class GeminiController extends Controller
{
    public function generate(Request $request)
    {
        return response()->json([
            'candidates' => [[
                'content' => [
                    'parts' => [[
                        'text' => '⚙️ test test, kiw'
                    ]]
                ]
            ]]
        ]);
        // {
        //     try {
        //         $apiKey = env('GEMINI_API_KEY');
        //         $apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
        //         $contents = $request->input('contents');

        //         $response = Http::post("{$apiUrl}?key={$apiKey}", [
        //             'contents' => $contents
        //         ]);

        //         if ($response->failed()) {
        //             return response()->json([
        //                 'error' => [
        //                     'message' => $response->json()['error']['message'] ?? 'Failed to connect to Gemini API.'
        //                 ]
        //             ], $response->status());
        //         }

        //         return response()->json($response->json(), 200);
        //     } catch (\Exception $e) {
        //         return response()->json([
        //             'error' => [
        //                 'message' => $e->getMessage()
        //             ]
        //         ], 500);
        //     }
        // }
    }
}
