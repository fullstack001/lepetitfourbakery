<?php

namespace App\Http\Middleware;

use Exception;
use App\Models\Permission;
use Closure;
use Illuminate\Contracts\Auth\Guard;

class Team
{

    public function __construct(Guard $auth)
    {
        $this->auth = $auth;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if(!$this->auth->check() || (!$this->auth->user()->can(Permission::ADMIN) && !$this->auth->user()->can(Permission::FRONT) && !$this->auth->user()->can(Permission::BAKER))) {
            abort(404);
        }
        return $next($request);
    }
}
