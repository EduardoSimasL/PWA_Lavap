<?php
// Configuração da conexão SQLite
$pdo = new PDO('sqlite:lavapp.db');

// Função para cadastrar um novo usuário
function registerUser($username, $password) {
    global $pdo;
    
    // Verifica se o usuário já existe
    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->execute([$username]);
    
    if ($stmt->fetch()) {
        return ['status' => 'error', 'message' => 'Usuário já existe'];
    }

    // Criptografa a senha
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    
    // Insere o novo usuário no banco
    $stmt = $pdo->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
    if ($stmt->execute([$username, $hashedPassword])) {
        return ['status' => 'success', 'message' => 'Usuário cadastrado com sucesso'];
    } else {
        return ['status' => 'error', 'message' => 'Falha ao cadastrar usuário'];
    }
}

// Processa a solicitação de cadastro
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Pega os dados do formulário via POST
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Chama a função de cadastro
    $response = registerUser($username, $password);

    // Exibe a mensagem de retorno
    if ($response['status'] == 'success') {
        echo "<script>alert('Usuário cadastrado com sucesso!');</script>";
    } else {
        echo "<script>alert('Erro: " . $response['message'] . "');</script>";
    }
}
?>
