<?php

$pdo = new PDO('sqlite:lavapp.db');

function checkAvailability($date, $time) {
    global $pdo;
    $machines = [
        ['machine_id' => 1, 'status' => 'available'],
        ['machine_id' => 2, 'status' => 'available'],
        ['machine_id' => 3, 'status' => 'available']
    ];


    $stmt = $pdo->prepare("SELECT machine_id FROM reservations WHERE reserved_date = ? AND reserved_time = ?");
    $stmt->execute([$date, $time]);

    $reservedMachines = $stmt->fetchAll(PDO::FETCH_ASSOC);

  
    foreach ($reservedMachines as $reservation) {
        foreach ($machines as &$machine) {
            if ($machine['machine_id'] == $reservation['machine_id']) {
                $machine['status'] = 'not available';
            }
        }
    }

    return $machines;
}


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $date = $_GET['date'];
    $time = $_GET['time'];
    $machine = $GET['machine_id'];

    $response = checkAvailability($date, $time);
    echo json_encode($response);
}
