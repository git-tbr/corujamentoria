(() => {
    const session = sessionStorage.getItem('user');

    if (session) {
        let session_parsed = JSON.parse(session);
        let name = session_parsed.name;
        let email = session_parsed.email;
        let phone = session_parsed.phone;

        fetch('../src/api/verify.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                phone
            })
        }).then(async (response) => {
            if (response.ok) {
                let response_json = await response.json();
                if (response_json.status === 'success') {
                    sessionStorage.setItem('user', JSON.stringify(response_json.user));
                    window.location.href = '../';
                }
            }
        });
    }
})();

// login via formulário

let form = document.querySelector('#form-login');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let name_input = document.querySelector('#name');
    let email_input = document.querySelector('#email');
    let country_code_input = document.querySelector('#country-code');
    let area_code_input = document.querySelector('#area-code');
    let phone_input = document.querySelector('#phone');

    //criar um objeto com os dados do formulário
    let user = {
        name: name_input.value,
        email: email_input.value,
        phone: ''
    };

    //verificar o código do país - o código deve ter o + junto do número
    if (country_code_input.value.startsWith('+')) {
        user.phone = country_code_input.value;
    } else {
        user.phone = '+' + country_code_input.value;
    }

    user.phone += area_code_input.value;
    user.phone += phone_input.value;

    fetch('../src/api/login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(async (response) => {
        if (response.ok) {
            let response_json = await response.json();
            if (response_json.status === 'success') {
                sessionStorage.setItem('user', JSON.stringify(response_json.user));
                window.location.href = '../';
            }
        }
    });
});

const validateCountryCode = () => {
    let country_code_input = document.querySelector('#country-code');
    if (!country_code_input.value.startsWith('+')) {
        country_code_input.value = '+' + country_code_input.value;
    }
}