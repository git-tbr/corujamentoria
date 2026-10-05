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
    <link rel="stylesheet" href="./src/css/style.css">
</head>

<body>
    <header class="header-masterclass">
        <h1>Masterclass - Coruja Mentoria</h1>
    </header>
    <main class="main-masterclass">

    </main>
</body>

</html>