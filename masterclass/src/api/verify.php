<?php
//definir horário para são paulo - brasil
//setlocale(LC_TIME, 'pt_BR', 'pt_BR.utf-8', 'pt_BR.ISO-8859-1', 'pt_BR.utf8-8');
date_default_timezone_set('America/Sao_Paulo');

include "session.php";
include "sql.php";

$raw = file_get_contents("php://input");
$data = json_decode($raw, true);

$name = isset($data['name']) ? filter_var($data['name'], FILTER_SANITIZE_FULL_SPECIAL_CHARS) : null;
$email = isset($data['email']) ? filter_var($data['email'], FILTER_SANITIZE_EMAIL) : null;
$phone = isset($data['phone']) ? filter_var($data['phone'], FILTER_SANITIZE_FULL_SPECIAL_CHARS) : null;

try {
    // consultar o usuário pelo email na mesma data
    $verify = sql([
        "statement" => "SELECT * FROM ecommerce_ead.masterclass WHERE m_company = ? AND m_email = ? AND DATE_FORMAT(m_date, '%Y-%m-%d') = ?",
        "types" => "iss",
        "parameters" => [COMPANY_ID, $email, date("Y-m-d")],
        "only_first_row" => "1"
    ]);

    if (count($verify) > 0) {
        //preencher a sessão com os dados do usuário
        $_SESSION[SESSION_NAME]['user'] = [
            "name" => $verify['m_name'],
            "email" => $verify['m_email'],
            "phone" => $verify['m_cellphone']
        ];

        http_response_code(200);
        echo json_encode([
            "status" => "success",
            "user" => $_SESSION[SESSION_NAME]['user']
        ]);
    } else {
        http_response_code(200);
        echo json_encode([
            "status" => "not_found"
        ]);
    }
} catch (\Exception $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Erro ao verificar usuário."
    ]);
}
