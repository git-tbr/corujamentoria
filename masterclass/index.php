<?php
// verificar se a sessão está preenchida
// se estiver, permanece na página para a participação na live
// se não, redireciona para o formulário de identificação (login - com nome, email e celular)
// verificar também no javascript na session storage para manutenção e reconstituição da sessão do php para evitar que o usuário seja desconectado caso a sessão expire

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
    <link rel="stylesheet" href="./src/css/live.css">
</head>

<body>
    <header class="header">
        <img src="./src/img/white_logo.png" alt="Logo branca - Coruja Mentoria">
        <h1>Masterclass</h1>
    </header>
    <main class="main-masterclass">
        <!-- player e chat - adicionados via iframe -->
        <section class="container" id="live">
            <div class="player">
                <iframe id="player-iframe" src="" frameborder="0" allow="autoplay; fullscreen"></iframe>
                <iframe id="player-map-iframe" style="display: none;" src=""></iframe>
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
            <p <?= (date('Y-m-d H:i:s') > '2026-10-09 13:00:00') ? '' : 'class="d-none"' ?>>
                Acesse o <a href="https://corujamentoria.com.br/promocional" target="_blank" rel="noopener noreferrer" title="Acesse o conteúdo promocional da masterclass">Conteúdo promocional</a> para mais informações.
            </p>
            <p>
                Entre em contato via <a href="https://wa.me/message/26SC3NEOMJ43E1" target="_blank" rel="noopener noreferrer" title="Entre em contato via WhatsApp">WhatsApp</a> para informações e dúvidas sobre a plataforma.
            </p>
        </section>
    </main>

    <script src="./src/js/live.js"></script>
</body>

</html>