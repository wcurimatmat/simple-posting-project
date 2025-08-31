import { Link } from "@inertiajs/react";

function PostCard({ related }) {
    return (
        <ul className="flex items-center gap-2">
            {related.map(function (post, index) {
                return (
                    <li
                        key={index}
                        className="flex-1 rounded-sm border border-gray-400 p-4 pr-8"
                    >
                        <article>
                            <div className="grid gap-4">
                                <Link href={route("posts.show", post.id)}>
                                    <h3 className="max-w-60 truncate font-bold">
                                        {post.title}
                                    </h3>
                                </Link>
                                <p className="truncate">{post.content}</p>
                            </div>
                        </article>
                    </li>
                );
            })}
        </ul>
    );
}

export default PostCard;
