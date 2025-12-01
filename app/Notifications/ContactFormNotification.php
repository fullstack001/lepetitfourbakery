<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Mail;

class ContactFormNotification extends Notification
{
    use Queueable;

    protected $name;
    protected $email;
    protected $phone;
    protected $subject;
    protected $message;

    /**
     * Create a new notification instance.
     */
    public function __construct($name, $email, $phone, $subject, $message)
    {
        $this->name = $name;
        $this->email = $email;
        $this->phone = $phone;
        $this->subject = $subject;
        $this->message = $message;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $mailMessage = new MailMessage();

        $mailMessage->greeting('Message from the contact form');

        $mailMessage->line('**Name:** ' . $this->name);

        $mailMessage->line('**Email:** ' . $this->email);

        $mailMessage->line('**Phone:** ' . $this->phone);

        $mailMessage->line('**Subject:** ' . $this->subject);

        $mailMessage->line('**Message**');
        $message = explode("\n", $this->message);
        foreach ($message as $line) {
            $mailMessage->line($line);
        }

        return $mailMessage;
    }


    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
