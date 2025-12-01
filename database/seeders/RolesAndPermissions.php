<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RolesAndPermissions extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin_permission = Permission::firstOrCreate(
            ['name' => Permission::ADMIN, 'guard_name' => 'web']
        );

        $role = Role::firstOrCreate(['name' => Permission::ADMIN]);

        if (!$role->hasPermissionTo($admin_permission)) {
            $role->givePermissionTo($admin_permission);
        }

        $admins = ['dev@lepetitfourbakery.com','romain@lepetitfourbakery.com', 'valerie@lepetitfourbakery.com'];

        $users = User::whereIn('email', $admins)->get();

        foreach ($users as $user) {
            if (!$user->hasRole(Permission::ADMIN)) {
                $user->assignRole(Permission::ADMIN);
            }
        }
    }

}
