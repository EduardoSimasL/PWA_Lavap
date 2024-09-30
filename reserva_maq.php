<?php
// Define o caminho para o banco de dados SQLite
$dbPath = __DIR__ . '/lavapp.db'; // __DIR__ refere-se ao diretório atual do script

try {
    // Cria a conexão com o banco de dados SQLite
    $pdo = new PDO("sqlite:$dbPath");

    // Define o modo de erro do PDO para exceções
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Código para criar a tabela reservations se não existir
    $pdo->exec("CREATE TABLE IF NOT EXISTS reservations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        machine_id INTEGER NOT NULL,
        reserved_date TEXT NOT NULL,
        reserved_time TEXT NOT NULL,
        user_id INTEGER
    )");

} catch (PDOException $e) {
    // Captura e exibe erros de conexão
    echo "Erro de conexão com o banco de dados: " . $e->getMessage();
    exit; // Encerra o script se a conexão falhar
}

function reserveMachine($machine_id, $date, $time, $user_id = null) {
    global $pdo;

    // Verifica se a máquina já está reservada para o horário
    $stmt = $pdo->prepare("SELECT * FROM reservations WHERE machine_id = ? AND reserved_date = ? AND reserved_time = ?");
    $stmt->execute([$machine_id, $date, $time]);
    
    if ($stmt->fetch()) {
        return ['status' => 'error', 'message' => 'Máquina já está reservada para este horário'];
    }

    // Insere a nova reserva no banco de dados
    $stmt = $pdo->prepare("INSERT INTO reservations (machine_id, reserved_date, reserved_time, user_id) VALUES (?, ?, ?, ?)");
    if ($stmt->execute([$machine_id, $date, $time, $user_id])) {
        return ['status' => 'success', 'message' => 'Máquina reservada com sucesso'];
    } else {
        return ['status' => 'error', 'message' => 'Falha ao reservar a máquina'];
    }
}

// Lida com a requisição POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $machine_id = $data['machine_id'];
    $date = $data['date'];
    $time = $data['time'];
    $user_id = $data['user_id'] ?? null;

    $response = reserveMachine($machine_id, $date, $time, $user_id);
    echo json_encode($response);
}
?>
