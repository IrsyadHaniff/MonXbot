<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded" />
    <link rel="stylesheet" href="{{ asset('css/index.css') }}">
</head>

<body>
    <div class="container">
        {{-- header --}}
        <header class="app-header">
            <h1 class="heading">Hallo someone</h1>
            <h2 class="sub-heading">Ada yang bisa dibantu?</h2>
        </header>
        {{-- suggestions-item --}}
        <ul class="suggestions">
            <li class="suggestions-item">
                <p class="text">
                    how many design for $300 collect for me?
                </p>
                <span class="material-symbols-rounded">
                    draw
                </span>
            </li>
            <li class="suggestions-item">
                <p class="text">
                    how many design for $300 collect for me?
                </p>
                <span class="material-symbols-rounded">
                    draw
                </span>
            </li>
            <li class="suggestions-item">
                <p class="text">
                    how many design for $300 collect for me?
                </p>
                <span class="material-symbols-rounded">
                    draw
                </span>
            </li>
            <li class="suggestions-item">
                <p class="text">
                    how many design for $300 collect for me?
                </p>
                <span class="material-symbols-rounded">
                    draw
                </span>
            </li>
        </ul>

        {{-- chat area --}}
        <div class="chat-container">
        </div>

        {{-- prompt --}}
        <div class="prompt-container">
            <div class="prompt-wrapper">
                <form action="#" class="prompt-form">
                    <input type="text" name="" id="" placeholder="bertanya disini"
                        class="prompt-input" required>
                    <div class="prompt-action">
                        {{-- file upload wrapper --}}
                        <div class="file-upload-wrapper">
                            <img src="#" alt="" class="file-preview">
                            <input type="file" accept="image/*, .pdf, .txt, .csv" id="file-input" hidden>
                            <button type="button" class="file-icon material-symbols-rounded">description</button>
                            <button type="button" id="add-file-btn" class="material-symbols-rounded">attach_file</button>
                            <button type="button" id="cancel-file-btn" class="material-symbols-rounded">close</button>
                        </div>
                        <button type="button" id="stop-response-btn" class="material-symbols-rounded">stop_circle</button>
                        <button id="send-file-btn" class="material-symbols-rounded">arrow_upward</button>
                    </div>
                </form>

                <button id="theme-file-btn" class="material-symbols-rounded">light_mode</button>
                <button id="delete-file-btn" class="material-symbols-rounded">delete</button>
            </div>
            <p class="disclaimer">bot ini bisa salah, harap check kembali</p>
        </div>
    </div>

    <script>
        const botImage = "{{ asset('img/imagebotv1.png') }}";
    </script>
    <script src="{{ asset('js/index.js') }}"></script>
</body>

</html>