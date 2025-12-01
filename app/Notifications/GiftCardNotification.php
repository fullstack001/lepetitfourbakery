<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class GiftCardNotification extends Notification
{
    use Queueable;

    protected $giftCardCode;

    /**
     * Create a new notification instance.
     */
    public function __construct($giftCardCode)
    {
        $this->giftCardCode = $giftCardCode;
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
        return (new MailMessage)
            ->subject('Your Gift Card Code')
            ->greeting('Hello!')
            ->line('Here is your gift card code:')
            ->line($this->giftCardCode)
            ->line('See you soon!')
            ->salutation('Le Petit Four');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'gift_card_code' => $this->giftCardCode,
        ];
    }
}
