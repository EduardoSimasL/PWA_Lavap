<?php
// Define o caminho para o banco de dados SQLite
$dbPath = __DIR__ . '/lavapp.db'; // __DIR__ refere-se ao diretório atual do script

try {
    // Cria a conexão com o banco de dados SQLite
    $pdo = new PDO("sqlite:$dbPath");

    // Define o modo de erro do PDO para exceções
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Você pode adicionar mais configurações aqui, se necessário

} catch (PDOException $e) {
    // Captura e exibe erros de conexão
    echo "Erro de conexão com o banco de dados: " . $e->getMessage();
    exit; // Encerra o script se a conexão falhar
}
?>
