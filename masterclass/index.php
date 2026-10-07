<?php
include_once "./src/api/session.php";
include_once "./src/api/sql.php";

if (!isset($_SESSION[SESSION_NAME]['user']) || empty($_SESSION[SESSION_NAME]['user'])) {
    header("Location: ./login/", true, 302);
    exit();
}

?>
<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Masterclass - Coruja Mentoria</title>
    <link rel="stylesheet" href="./src/css/live.css?v=<?= time() ?>">
</head>

<body>
    <header class="header">
        <img src="./src/img/white_logo.png" alt="Logo branca - Coruja Mentoria">
        <h1>Masterclass</h1>
    </header>
    <main class="main-masterclass">
        <!-- player e chat - adicionados via iframe -->
        <section class="container" id="live" style="background-color: aliceblue;">
            <div class="player">
                <iframe id="player-map-iframe" style="display: none;" src=""></iframe>
                <iframe id="player-iframe" src="" frameborder="0" allow="autoplay; fullscreen"></iframe>
            </div>
            <div class="chat">
                <iframe id="chat-iframe" src="" frameborder="0"></iframe>
            </div>
        </section>
        <section class="container" id="no-live">
            <p <?= (date('Y-m-d') <= '2026-10-10') ? '' : 'class="d-none"' ?>>
                A masterclass ainda não começou!
                <br>
                As aulas serão transmitidas ao vivo nos dias 08, 09 e 10 de outubro:
            </p>
            <p <?= (date('Y-m-d') > '2026-10-10') ? '' : 'class="d-none"' ?>>
                As aulas já aconteceram!<br>
                Fique atento nos grupos para os próximos eventos!
            </p>
            <ul>
                <li <?= (date('d') < '08') ? '' : 'class="d-none"' ?>>08/10 - 08h (Horário de Brasília) | 12h (Horário de Lisboa)</li>
                <li <?= (date('d') < '09') ? '' : 'class="d-none"' ?>>09/10 - 08h (Horário de Brasília) | 12h (Horário de Lisboa)</li>
                <li <?= (date('d') < '10') ? '' : 'class="d-none"' ?>>10/10 - 12h (Horário de Brasília) | 16h (Horário de Lisboa)</li>
            </ul>

        </section>
        <section class="container-messages">
            <p class="<?= (date('Y-m-d H:i:s') > '2026-10-09 13:00:00') ? '' : 'd-none' ?>" style="color: white; text-align: center;">
                Acesse o Conteúdo promocional para mais informações.
            </p>
            <a href="https://corujamentoria.com.br/promocional" class="btn btn-red <?= (date('Y-m-d H:i:s') > '2026-10-09 13:00:00') ? '' : 'd-none' ?>" target="_blank" rel="noopener noreferrer" title="Acesse o conteúdo promocional da masterclass">
                Conteúdo promocional &#x21e8;
            </a>
            <p style="color: white; text-align: center;">
                Entre em contato via Whatsapp para informações e dúvidas sobre a Mentoria primeira fase 2027.
            </p>
            <a href="https://wa.me/message/26SC3NEOMJ43E1" class="btn btn-green" target="_blank" rel="noopener noreferrer" title="Entre em contato via WhatsApp">
                Contato via WhatsApp <img src="./src/img/whatsapp.png" alt="Ícone do WhatsApp" style="width: 1.2rem; height: 1.2rem;">
            </a>
        </section>
    </main>

    <script src="./src/js/live.js?v=<?= time() ?>"></script>
</body>

</html>