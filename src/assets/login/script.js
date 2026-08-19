document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value.trim().toLowerCase();
    const password = document.getElementById('password').value.trim();

    try {
        const response = await fetch('./login/authenticate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username,
                password
            })
        });

        const { success, status, message } = await response.json();
        if (!success) {
            const passwordError = document.getElementById('passwordError');
            passwordError.textContent = '⚠️ Wrong Credentials.';
            throw new Error(`Login failed with status ${status}: ${message}`);
        }

        window.location.href = './panel';
    } catch (error) {
        console.error('Login error:', error.message || error);
    }
});

document.getElementById('togglePassword').addEventListener('click', function () {
    const passwordInput = document.getElementById('password');
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    this.textContent = isPassword ? 'visibility_off' : 'visibility';
});

const loginI18n = {
    en: {
        brandSubtitle: 'Powered by BPB',
        loginTitle: 'User Login',
        emailLabel: 'Cloudflare Email',
        passwordLabel: 'Password',
        loginBtn: 'Login'
    },
    fa: {
        brandSubtitle: 'ساخته‌شده بر پایه‌ی BPB',
        loginTitle: 'ورود کاربر',
        emailLabel: 'ایمیل کلودفلر',
        passwordLabel: 'رمز عبور',
        loginBtn: 'ورود'
    }
};

function applyLoginLanguage() {
    const lang = localStorage.getItem('matixLang') || 'en';
    const dict = loginI18n[lang];

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) el.textContent = dict[key];
    });

    document.documentElement.setAttribute('lang', lang === 'fa' ? 'fa' : 'en');
    document.documentElement.setAttribute('dir', lang === 'fa' ? 'rtl' : 'ltr');
    document.body.classList.toggle('rtl', lang === 'fa');
}

function toggleLoginLanguage() {
    const current = localStorage.getItem('matixLang') || 'en';
    localStorage.setItem('matixLang', current === 'en' ? 'fa' : 'en');
    applyLoginLanguage();
}

applyLoginLanguage();