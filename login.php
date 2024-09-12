<?php
// Função para login do usuário
function loginUser($username, $password) {
    global $pdo;

    // Busca o usuário pelo nome de usuário
    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password'])) {
        // Usuário autenticado com sucesso, pode gerar um token ou iniciar uma sessão
        return ['status' => 'success', 'message' => 'Login bem-sucedido', 'userId' => $user['id']];
    } else {
        return ['status' => 'error', 'message' => 'Credenciais inválidas'];
    }
}

// Processa a solicitação de login
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $username = $data['username'];
    $password = $data['password'];

    $response = loginUser($username, $password);
    echo json_encode($response);
}