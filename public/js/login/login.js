document.addEventListener("DOMContentLoaded", () => {
    const signInTab = document.getElementById("signInTab");
    const signUpTab = document.getElementById("signUpTab");
    const formContainer = document.getElementById("formContainer");

    // Ganti ke Sign In
    signInTab.addEventListener("click", () => {
        signInTab.classList.add("active");
        signUpTab.classList.remove("active");

        formContainer.innerHTML = `
            <h1 class="form-title">Sign In</h1>
            <p class="form-desc">Masukkan akun sesuai dengan yang telah dibuat</p>

            <form action="#" method="POST" class="login-form">
                <input type="hidden" name="_token" value="{{ csrf_token() }}">
                <label for="email">Email</label>
                <input type="email" id="email" placeholder="Masukkan email kamu" required>

                <label for="password">Password</label>
                <input type="password" id="password" placeholder="Masukkan password kamu" required>

                <div class="btn-container">
                    <button type="submit" class="login-btn">Login</button>
                </div>
            </form>
        `;
    });

    // Ganti ke Sign Up
    signUpTab.addEventListener("click", () => {
        signUpTab.classList.add("active");
        signInTab.classList.remove("active");

        formContainer.innerHTML = `
            <h1 class="form-title">Sign Up</h1>
            <p class="form-desc">Buat akun baru untuk mulai menggunakan MonXbot</p>

            <form action="#" method="POST" class="register-form">
                <input type="hidden" name="_token" value="{{ csrf_token() }}">
                <label for="name">Nama Lengkap</label>
                <input type="text" id="name" placeholder="Masukkan nama kamu" required>

                <label for="email">Email</label>
                <input type="email" id="email" placeholder="Masukkan email kamu" required>

                <label for="password">Password Baru</label>
                <input type="password" id="password" placeholder="Buat password baru" required>

                <label for="password_confirmation">Ulangi Password</label>
                <input type="password" id="password_confirmation" placeholder="Ulangi password" required>

                <div class="btn-container">
                    <button type="submit" class="login-btn">Daftar</button>
                </div>
            </form>
        `;
    });
});
