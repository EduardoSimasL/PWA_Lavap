<?php
function reserveMachine($machine_id, $date, $time, $user_id = null) {
    global $pdo;

   
    $stmt = $pdo->prepare("SELECT * FROM reservations WHERE machine_id = ? AND reserved_date = ? AND reserved_time = ?");
    $stmt->execute([$machine_id, $date, $time]);
    
    if ($stmt->fetch()) {
        return ['status' => 'error', 'message' => 'Máquina já está reservada para este horário'];
    }


    $stmt = $pdo->prepare("INSERT INTO reservations (machine_id, reserved_date, reserved_time, user_id) VALUES (?, ?, ?, ?)");
    if ($stmt->execute([$machine_id, $date, $time, $user_id])) {
        return ['status' => 'success', 'message' => 'Máquina reservada com sucesso'];
    } else {
        return ['status' => 'error', 'message' => 'Falha ao reservar a máquina'];
    }
}


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $machine_id = $data['machine_id'];
    $date = $data['date'];
    $time = $data['time'];
    $user_id = $data['user_id'] ?? null;

    $response = reserveMachine($machine_id, $date, $time, $user_id);
    echo json_encode($response);
}
