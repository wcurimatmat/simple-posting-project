<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{

    protected $table = "posts";
    protected $fillable = ["title", "content"];

    public function related($limit = 4)
    {
        $related = Post::where('id', '!=', $this->id)
            ->inRandomOrder()
            ->take($limit)
            ->get();

        return $related;
    }
}
