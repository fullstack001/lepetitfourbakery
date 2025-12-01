<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class Reminder extends Notification implements ShouldQueue
{
    use Queueable;

    protected string $subject;
    protected string $greeting;
    protected array $message;
    protected string $actionText;
    protected string $actionUrl;
    protected string $thanksMessage;

    public function __construct(
        string $subject,
        string $greeting,
        array $message,
        string $actionText,
        string $actionUrl,
        string $thanksMessage
    ) {
        $this->subject = $subject;
        $this->greeting = $greeting;
        $this->message = $message;
        $this->actionText = $actionText;
        $this->actionUrl = $actionUrl;
        $this->thanksMessage = $thanksMessage;
    }

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $mail = (new MailMessage)
            ->subject($this->subject)
            ->greeting($this->greeting);

        foreach ($this->message as $line) {
            $mail->line($line);
        }

        return $mail->action($this->actionText, $this->actionUrl)
            ->line($this->thanksMessage);
    }

    public function toArray(object $notifiable): array
    {
        return [
        ];
    }
}
