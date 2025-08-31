import UserLayout from "../../Layout/UserLayout";
import { useState, useEffect } from "react";
import usePostEvents from "../../Hooks/usePostEvent";
import { Trash2, Pencil } from "lucide-react";
import { Link, router, usePage } from "@inertiajs/react";
import FlashMessage from "../../Components/FlashMessage";
import Paginate from "../../Components/Paginate";

function Index({ posts }) {
    const { flash, error } = usePage().props;

    return (
        <UserLayout>
            <header className="mb-6">
                <h1 className="text-2xl font-bold">All Posts</h1>
            </header>

            <section>
                <PostListings posts={posts} />
            </section>

            {flash.success && <FlashMessage message={flash.success} />}
        </UserLayout>
    );
}

function EmptyPostListings() {
    return (
        <div className="space-y-4">
            <p>Empty!</p>

            <Link
                href={route("posts.create")}
                className="font-bold text-blue-400 underline"
            >
                Try creating a new post
            </Link>
        </div>
    );
}

function PostListings({ posts }) {
    const [listOfPosts, setListOfPosts] = useState([]);

    useEffect(() => {
        setListOfPosts(posts.data);
    }, [posts.data]);

    usePostEvents(setListOfPosts);

    function handleDelete(id) {
        if (!confirm("Are you sure you want to delete this post?")) return;

        // router.visit(`/posts/${id}`, {
        //     method: "delete",
        //     preserveScroll: true,
        // });

        router.delete(`/posts/${id}`, {
            onSuccess: function () {
                setListOfPosts(function (previousPostListings) {
                    return previousPostListings.filter(function (post) {
                        return post.id !== id;
                    });
                });
            },
        });
    }

    if (!listOfPosts || listOfPosts.length === 0) {
        return <EmptyPostListings />;
    }

    return (
        <>
            <ul className="grid grid-cols-2 gap-6">
                {listOfPosts.map((post) => (
                    <li
                        key={post.id}
                        className="flex w-full justify-between border border-gray-400 p-8"
                    >
                        <div className="grid gap-3">
                            <Link href={route("posts.show", post.id)}>
                                <h2 className="text-2xl font-bold">
                                    {post.title}
                                </h2>
                            </Link>
                            <p>{post.content}</p>
                            <p className="text-sm text-gray-400">
                                {new Date(post.updated_at).toLocaleString()}
                            </p>
                        </div>

                        <div className="">
                            <ul className="align-center flex gap-4">
                                <li>
                                    <button
                                        className="cursor-pointer"
                                        onClick={() => {
                                            handleDelete(post.id);
                                        }}
                                    >
                                        <Trash2 size={20} />
                                    </button>
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

            <Paginate meta={posts.meta} />
        </>
    );
}

export default Index;
