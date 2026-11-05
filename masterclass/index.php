<?php
include_once "./src/api/session_aula.php";
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
    <title>Aula Magna - Coruja Mentoria</title>
    <link rel="stylesheet" href="./src/css/live.css?v=<?= time() ?>">
</head>

<body>
    <header class="header">
        <img src="./src/img/white_logo.png" alt="Logo branca - Coruja Mentoria">
        <h1>Aula Magna</h1>
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
            <p <?= (date('Y-m-d') <= '2026-11-06') ? '' : 'class="d-none"' ?>>
                A aula magna ainda não começou!
                <br>
                A aula será transmitida ao vivo no dia 06 de novembro:
            </p>
            <p <?= (date('Y-m-d') > '2026-11-06') ? '' : 'class="d-none"' ?>>
                A aula já aconteceu!<br>
                Fique atento nos grupos para os próximos eventos!
            </p>

        </section>
        <section class="container-messages">
            <p class="<?= (date('Y-m-d H:i:s') > '2026-10-09 09:00:00') ? '' : '' ?>" style="color: white; text-align: center;">
                Acesse o Conteúdo promocional para mais informações.
            </p>
            <a href="https://corujamentoria.com.br/promocional" class="btn btn-red <?= (date('Y-m-d H:i:s') > '2026-10-09 13:00:00') ? '' : '' ?>" target="_blank" rel="noopener noreferrer" title="Acesse o conteúdo promocional da masterclass">
                Conteúdo promocional &#x21e8;
            </a>
            <br>
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