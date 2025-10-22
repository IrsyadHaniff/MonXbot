<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MonXbot | Login</title>
    <link rel="stylesheet" href="{{ asset('css/login/login.css') }}" />
</head>

<body>
    <div class="auth-container">
        <div class="tab-menu">
            <button class="tab active" id="signInTab">Sign In</button>
            <button class="tab" id="signUpTab">Sign Up</button>
        </div>

        <div class="form-container" id="formContainer">
            <!-- Sign In -->
            <h1 class="form-title">Sign In</h1>
            <p class="form-desc">Masukkan akun sesuai dengan yang telah dibuat</p>

            <form action="#" method="POST" class="login-form">
                @csrf
                <label for="email">Email</label>
                <input type="email" id="email" placeholder="Masukkan email kamu" required>

                <label for="password">Password</label>
                <input type="password" id="password" placeholder="Masukkan password kamu" required>

                <div class="btn-container">
                    <button type="submit" class="login-btn">Login</button>
                </div>
            </form>
        </div>
    </div>

    <script src="{{ asset('js/login/login.js') }}"></script>
</body>

</html>
