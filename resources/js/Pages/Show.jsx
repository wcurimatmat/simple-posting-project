import UserLayout from "../Layout/UserLayout";
import PostCard from "../Components/PostCard";

function Show({ post, related }) {
    return (
        <UserLayout>
            <div className="space-y-20">
                <div className="space-y-9">
                    <header>
                        <h1 className="text-2xl font-bold">{post.title}</h1>
                    </header>
                    <div className="">{post.content}</div>
                </div>
                <div className="space-y-6">
                    <div className="">
                        <h2 className="font-bold">Related Posts</h2>
                    </div>

                    <PostCard related={related} />
                </div>
            </div>
        </UserLayout>
    );
}

export default Show;
