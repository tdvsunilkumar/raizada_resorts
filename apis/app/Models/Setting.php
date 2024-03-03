<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Panoscape\History\HasHistories;
use DB;
class Setting extends Model
{
    use HasFactory, HasHistories;

    public $table = 'settings';

    protected $fillable = [
    ];

    public function getModelLabel()
    {
        return $this->display_name;
    }
}
