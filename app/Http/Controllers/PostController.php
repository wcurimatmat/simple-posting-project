<?php

namespace App\Http\Controllers;

use App\Events\PostCreated;
use App\Events\PostUpdated;
use App\Models\Post;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class PostController extends Controller
{
    public function index()
    {
        return Inertia::render('Index/Index', [
            'posts' => Post::latest()->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required'],
            'content' => ['required'],
        ]);

        $created_post = Post::create($validated);

        PostCreated::dispatch($created_post);

        return Redirect::back()->with('success', 'Post added.');
    }

    public function edit(Post $post)
    {
        return Inertia::render('Edit', [
            'post' => $post
        ]);
    }

    public function update(Request $request, Post $post)
    {
        $validated = $request->validate([
            'title' => ['required'],
            'content' => ['required'],
        ]);

        $post->update($validated);

        PostUpdated::dispatch($post);

        return Redirect::back()->with('success', 'Post updated.');
    }

    public function show(Post $post)
    {
        return Inertia::render('Show', [
            "post" => $post,
            'related' => $post->related()
        ]);
    }

    public function destroy(Post $post)
    {
        $post->delete();

        return Redirect::route('posts.index')->with('success', 'Post deleted.');
    }
}
