document.addEventListener('DOMContentLoaded', function() {
    const accountInput = document.getElementById('account');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    const button = document.getElementById('button');
    const loader = document.getElementById('loader');

    // 首次访问处理
    if (!localStorage.getItem('visited')) {
        localStorage.setItem('visited', 'true');
    } else {
        button.style.animation = 'none';
        button.style.opacity = '1';
    }

    // 页面卸载处理
    window.addEventListener('beforeunload', function() {
        if (!localStorage.getItem('buttonClicked')) {
            localStorage.removeItem('visited');
        }
        localStorage.removeItem('buttonClicked');
    });

    // 密码显示切换处理
    passwordInput.addEventListener('input', () => {
        togglePassword.style.display = passwordInput.value.length > 0 ? 'inline' : 'none';
    });

    togglePassword.addEventListener('click', () => {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        togglePassword.classList.toggle('fa-eye', !isPassword);
        togglePassword.classList.toggle('fa-eye-slash', isPassword);
    });

    // 登录凭证验证
    async function fetchCredentials() {
        try {
            const response = await fetch('user_account.txt');
            return await response.text();
        } catch (error) {
            console.error('Error fetching credentials:', error);
            alert('无法连接认证服务器');
            return '';
        }
    }

    async function validateCredentials(fileContent) {
        const account = accountInput.value.trim();
        const password = passwordInput.value.trim();

        if (!account) return alert("请输入账号");
        if (!password) return alert("请输入密码");

        loader.classList.add("visible");
        button.hidden = true;

        setTimeout(async () => {
            try {
                const valid = fileContent.split('\n').some(line => {
                    const [storedAccount, storedPassword] = line.trim().split(' ');
                    return account === storedAccount && password === storedPassword;
                });

                if (valid) {
                    alert('已成功登录!');
                    window.location.href = 'user.html';
                } else {
                    throw new Error('验证失败');
                }
            } catch (error) {
                alert('账号或密码错误，请重新输入');
                passwordInput.value = '';
                passwordInput.dispatchEvent(new Event('input'));
                loader.classList.remove("visible");
                button.hidden = false;
                button.style.opacity = '1';
                button.style.animation = 'none';
            }
        }, 1500);
    }

    // 登录函数
    window.login = async function() {
        const credentials = await fetchCredentials();
        if (credentials) validateCredentials(credentials);
    };

    // 波纹动画效果
    document.addEventListener('click', function(event) {
        const svg = document.querySelector('.svg-ripple').cloneNode(true);
        svg.style.left = `${event.pageX - 50}px`;
        svg.style.top = `${event.pageY - 50}px`;
        document.body.appendChild(svg);
        
        svg.firstElementChild.addEventListener('animationend', () => {
            svg.remove();
        });
    });
});

