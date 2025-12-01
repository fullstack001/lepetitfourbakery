<?php

namespace Database\Seeders;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $is_prod = app()->environment('production');
        $now = Carbon::now();
        if(!User::where('email','dev@lepetitfourbakery.com')->exists()) {
            $password = $is_prod ? Str::random(32) : 'something';
            User::create([
                'name' => 'lepetitfourbakery',
                'email' => 'dev@lepetitfourbakery.com',
                'password' => Hash::make($password),
                'can_subscribe' => true,
                'email_verified_at' => $now,
            ]);
        }
        if(!User::where('email','romain@lepetitfourbakery.com')->exists()) {
            $password = $is_prod ? Str::random(32) : 'something';
            User::create([
                'name' => 'romain',
                'email' => 'romain@lepetitfourbakery.com',
                'password' => Hash::make($password),
                'can_subscribe' => true,
                'email_verified_at' => $now,
            ]);
        }
        if(!User::where('email','test@lepetitfourbakery.com')->exists()) {
            $password = $is_prod ? Str::random(32) : 'something';
            User::create([
                'name' => 'test',
                'email' => 'test@lepetitfourbakery.com',
                'password' => Hash::make($password),
                'email_verified_at' => $now,
            ]);
        }
    }
}
