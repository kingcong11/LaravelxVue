<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $guarded = ['id', 'create_at', 'updated_at'];
    protected $fillable = ['project_name', 'description'];
}
