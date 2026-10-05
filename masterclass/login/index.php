<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Coruja Mentoria</title>
    <link rel="stylesheet" href="../src/css/login.css">
</head>

<body>
    <header class="header">
        <img src="../src/img/white_logo.png" alt="Logo branca - Coruja Mentoria">
        <h1>Masterclass</h1>
    </header>
    <main class="main-login">
        <p class="paragrafo-login">
            Preencha os dados abaixo para acessar a live:
        </p>
        <form id="form-login" method="post">
            <label for="name">Nome:</label>
            <input type="text" id="name" name="name" required>
            <label for="email">E-mail:</label>
            <input type="email" id="email" name="email" required>
            <label>Telefone Celular:</label>
            <div class="telefone">
                <!-- código de país -->
                <div class="country-code-container">
                    <label for="country-code">Código do país</label>
                    <input class="country-code" type="text" id="country-code" name="country-code" placeholder="+55" required onchange="validateCountryCode()">
                </div>
                <!-- código de área -->
                <div class="area-code-container">
                    <label for="area-code">Código de área</label>
                    <input class="area-code" type="text" id="area-code" name="area-code" placeholder="11" required>
                </div>
                <!-- número -->
                <div class="phone-container">
                    <label for="phone">Número do Celular</label>
                    <input class="phone" type="tel" id="phone" name="phone" placeholder="99999-9999" required>
                </div>
            </div>
            <input type="submit" value="Entrar" />
        </form>
    </main>

    <script src="../src/js/login.js"></script>
</body>

</html>