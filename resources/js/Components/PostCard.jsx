import { Link } from "@inertiajs/react";

function PostCard({ related }) {
    return (
        <ul className="flex items-center gap-2">
            {related.map(function (post, index) {
                return (
                    <li key={index}>
                        <article className="rounded-sm border border-gray-400 p-4 pr-8">
                            <div className="grid gap-4">
                                <Link href={route("posts.show", post.id)}>
                                    <h3 className="font-bold">{post.title}</h3>
                                </Link>
                                <p>{post.content}</p>
                            </div>
                        </article>
                    </li>
                );
            })}
        </ul>
    );
}

export default PostCard;
