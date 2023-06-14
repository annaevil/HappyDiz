<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'vendor/autoload.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $message = $_POST['message'];
    $selectedTags = isset($_POST['selectedTags']) ? $_POST['selectedTags'] : '';

    if (empty($name) || empty($email) || empty($phone)) {
        $response = array(
            'status' => 'error',
            'message' => 'Пожалуйста, заполните все обязательные поля.'
        );
        header('Content-Type: application/json');
        echo json_encode($response);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response = array(
            'status' => 'error',
            'message' => 'Пожалуйста, введите корректный email.'
        );
        header('Content-Type: application/json');
        echo json_encode($response);
        exit;
    }

    $mail = new PHPMailer(true);
    try {
        $mail->SMTPDebug = SMTP::DEBUG_SERVER;
        $mail->isSMTP();
        $mail->Host       = 'ssl://smtp.mail.ru';
        $mail->SMTPAuth   = true;
        $mail->Username   = '******@mail.ru';
        $mail->Password   = '**************';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = 465;

        $mail->setFrom('******@mail.ru', 'Заявка с сайта');
        $mail->addAddress('*****@mail.ru', 'Happy diz');

        $mail->isHTML(true);
        $mail->Subject = 'Пользователь хочет с вами связаться!';
        $mail->Body    = '<p><strong>Имя: </strong>'.$name.'</p>'
                        .'<p><strong>Email: </strong>'.$email.'</p>'
                        .'<p><strong>Телефон: </strong>'.$phone.'</p>'
                        .'<p><strong>Вопрос: </strong>'.$selectedTags.'</p>'
                        .'<p><strong>Сообщение: </strong>'.$message.'</p>';

        $mail->send();

        $response = array(
            'status' => 'success',
            'message' => 'Ваша заявка успешно отправлена!'
        );
        header('Content-Type: application/json');
        echo json_encode($response);
    } catch (Exception $e) {
        $response = array(
            'status' => 'error',
            'message' => 'Ошибка: письмо не может быть отправлено. Пожалуйста, попробуйте еще раз.'
        );
        header('Content-Type: application/json');
        echo json_encode($response);
    }
} else {
    // Обработка случая, когда обращение к скрипту осуществляется напрямую, а не через метод POST
    $response = array(
        'status' => 'error',
        'message' => 'Ошибка: недопустимый запрос.'
    );
    header('Content-Type: application/json');
    echo json_encode($response);
}
?>
