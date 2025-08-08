import UserLayout from "../Layout/UserLayout";
import { useState, useEffect } from "react";
import { useEchoPublic } from "@laravel/echo-react";
import { Trash2, Pencil } from "lucide-react";
import { Link, router, usePage } from "@inertiajs/react";
import FlashMessage from "../Components/FlashMessage";

function Index({ posts }) {
    const [postListing, setPostListing] = useState([]);
    const { flash, error } = usePage().props;

    useEffect(() => {
        setPostListing(posts);
    }, []);

    useEchoPublic("posts", "PostCreated", function (e) {
        setPostListing(function (previousPostListings) {
            return [e.post, ...previousPostListings];
        });
    });

    useEchoPublic("posts", "PostUpdated", function (e) {
        setPostListing(function (previousPostListings) {
            return previousPostListings.map(function (post) {
                if (post.id === e.post.id) {
                    return e.post;
                }

                return post;
            });
        });
    });

    useEchoPublic("posts", "PostDeleted", function (e) {
        setPostListing(function (previousPostListings) {
            return previousPostListings.filter(function (post) {
                return post.id !== e.post_id;
            });
        });
    });

    function handleDelete(id) {
        if (confirm("Are you sure you want to delete this post?")) {
            // router.visit(`/posts/${id}`, {
            //     method: "delete",
            //     preserveScroll: true,
            // });

            router.delete(`/posts/${id}`, {
                onSuccess: function () {
                    setPostListing(function (previousPostListings) {
                        return previousPostListings.filter(function (post) {
                            return post.id !== id;
                        });
                    });
                },
            });
        }
    }

    return (
        <UserLayout>
            <header className="mb-6">
                <h1 className="text-2xl font-bold">All Posts</h1>
            </header>

            <section>
                <ul className="flex flex-col gap-6">
                    {postListing.map((post) => (
                        <li
                            key={post.id}
                            className="flex w-lg shrink grow basis-4 justify-between border border-gray-400 p-8"
                        >
                            <div className="grid gap-3">
                                <h2 className="text-2xl font-bold">
                                    {post.title}
                                </h2>
                                <p>{post.content}</p>
                                <p className="text-sm text-gray-400">
                                    {new Date(post.updated_at).toLocaleString()}
                                </p>
                            </div>

                            <div className="">
                                <ul className="align-center flex gap-4">
                                    <li>
                                        <form
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                handleDelete(post.id);
                                            }}
                                        >
                                            <button type="submit">
                                                <Trash2 size={20} />
                                            </button>
                                        </form>
                                    </li>
                                    <li>
                                        <Link
                                            href={route("posts.edit", {
                                                post: post.id,
                                            })}
                                        >
                                            <Pencil size={20} />
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>

            {flash.success && <FlashMessage message={flash.success} />}
        </UserLayout>
    );
}

export default Index;
