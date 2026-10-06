<?php
include_once "session.php";
include_once "sql.php";

try {
    $search = sql([
        "statement" => "SELECT * FROM tbread.cliente WHERE id = ?",
        "types" => "i",
        "parameters" => [TBREAD_ID],
        "only_first_row" => "1"
    ]);

    http_response_code(200);
    echo json_encode([
        "status" => "success",
        "data" => $search
    ]);
} catch (\Exception $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Erro ao buscar dados da live"
    ]);
}
