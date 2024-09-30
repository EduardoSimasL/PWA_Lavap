<?php
$dbPath = __DIR__ . '/lavapp.db';

try {
    $pdo = new PDO("sqlite:$dbPath");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->query("SELECT * FROM reservations"); // Ou a consulta que você precisa
    $status = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($status);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Erro ao buscar status: ' . $e->getMessage()]);
}
?>
