<?php
// Connect to database (replace with your own database credentials)
$conn = new mysqli('localhost', 'username', 'password', 'chat');

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get POST data from JavaScript
$sender = $_POST['sender'];
$content = $_POST['content'];

// Insert message into database
$sql = "INSERT INTO messages (sender, content) VALUES (?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss",
