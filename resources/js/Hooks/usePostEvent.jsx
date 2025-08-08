import { useEchoPublic } from "@laravel/echo-react";

function usePostEvents(setPostListing) {
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
}

export default usePostEvents;
