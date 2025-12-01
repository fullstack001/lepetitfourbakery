<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ToastCroissantSale extends Model
{
    use HasFactory;

    protected $fillable = [
        'business_date',
        'menu_item_name',
        'croissant_type',
        'quantity_sold',
    ];

    protected $casts = [
        'business_date' => 'date',
        'quantity_sold' => 'decimal:2',
    ];

    public const TOTAL_UNTIL_YESTERDAY_NAME = 'TOTAL_UNTIL_YESTERDAY';

    /**
     * Get total croissants for a date range
     */
    public static function getTotalForDateRange($startDate, $endDate): float
    {
        return static::whereBetween('business_date', [$startDate, $endDate])
            ->sum('quantity_sold');
    }

    /**
     * Get total croissants for a specific date
     */
    public static function getTotalForDate($date): float
    {
        return static::where('business_date', $date)
            ->sum('quantity_sold');
    }

    /**
     * Check if data exists for a date
     */
    public static function hasDataForDate($date): bool
    {
        return static::where('business_date', $date)->exists();
    }

    /**
     * Save croissant sales data from API response
     */
    public static function saveFromApiRows(array $rows, string $businessDate, callable $isCroissantRow, callable $categorizeCroissant): int
    {
        // Keep legacy signature but no-op: we no longer store per-day rows here
        return 0;
    }

    /**
     * Store a single grand total (sum of all croissant quantities up to and including $asOfDate)
     */
    public static function setGrandTotalUntil(string $asOfDate, float $quantity): void
    {
        static::updateOrCreate(
            [
                'business_date' => $asOfDate,
                'menu_item_name' => self::TOTAL_UNTIL_YESTERDAY_NAME,
            ],
            [
                'croissant_type' => 'TOTAL',
                'quantity_sold' => $quantity,
            ]
        );
    }

    /**
     * Retrieve the grand total as of a specific date; returns 0.0 if missing
     */
    public static function getGrandTotalUntil(string $asOfDate): float
    {
        return (float) static::where('business_date', $asOfDate)
            ->where('menu_item_name', self::TOTAL_UNTIL_YESTERDAY_NAME)
            ->value('quantity_sold') ?? 0.0;
    }
}