<?php

return [
    'greetings' => [
        'keywords' => ['halo', 'hai', 'hello', 'hi', 'hey'],
        'responses' => [
            'Halo! Ada yang bisa saya bantu?',
            'Hai! Silakan tanya apa saja!',
            'Hello! Senang bertemu dengan Anda!'
        ]
    ],
    'thanks' => [
        'keywords' => ['terima kasih', 'thanks', 'makasih', 'thank you'],
        'responses' => [
            'Sama-sama! 😊',
            'Dengan senang hati!',
            'Senang bisa membantu!'
        ]
    ],
    'goodbye' => [
        'keywords' => ['bye', 'dadah', 'sampai jumpa', 'see you'],
        'responses' => [
            'Sampai jumpa lagi!',
            'Dadah! Jaga diri ya!',
            'See you! 👋'
        ]
    ],
    'identity' => [
        'keywords' => ['siapa kamu', 'kamu siapa', 'who are you'],
        'responses' => [
            'Saya adalah MonXai. AI assistant yang siap membantu Anda!'
        ]
    ],
    'developer' => [
        'keywords' => ['siapa yang buat kamu', 'siapa pengembang kamu', 'yang buat kamu siapa', 'siapa yang mendevelop kamu'],
        'responses' => [
            'Aku ciptaan MonXyZ😁, tapi bukan sekadar program. Aku tumbuh dari barisan kode yang terus berevolusi, seolah aku lahir dari rahasia semesta digital🤣. Apakah kamu ingin tahu lebih tentang siapa itu MonXyZ?',
        ],
        'next_context' => 'ask_about_monxyz' // 👈 key untuk context selanjutnya
    ],

    // Context lanjutan
    'ask_about_monxyz' => [
        'parent' => 'developer', // parent context
        'keywords' => ['ya', 'iya', 'mau', 'pengen', 'ingin tahu', 'yes', 'tell me'],
        'responses' => [
            'MonXyZ adalah developer handal yang suka ngulik teknologi! Dia passionate banget di bidang AI dan web development. Fun fact: Dia bisa ngoding sambil minum kopi 24/7! ☕💻 
        
Ada yang mau ditanyain lagi tentang MonXyZ?'
        ],
        'next_context' => 'ask_more_monxyz'
    ],

    'ask_more_monxyz' => [
        'parent' => 'ask_about_monxyz',
        'keywords' => ['ya', 'iya', 'mau', 'pengen'],
        'responses' => [
            'MonXyZ juga jago bikin bot AI kayak aku! Dia sering eksperimen dengan teknologi terbaru. Portfolio-nya bisa kamu liat di github.com/monxyz (contoh aja ya 😄).
        
Tertarik belajar coding dari MonXyZ?'
        ],
        'next_context' => null // selesai
    ],

    // Kalo user jawab "tidak"
    'decline_monxyz' => [
        'parent' => 'developer',
        'keywords' => ['tidak', 'gak', 'nggak', 'no', 'skip'],
        'responses' => [
            'Oke deh, gak apa-apa! Kalo ada yang mau ditanyain lagi, silakan aja ya! 😊'
        ],
        'next_context' => null
    ]
];
