import UserLayout from "../Layout/UserLayout";
import { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import FlashMessage from "../Components/FlashMessage";

function Create() {
    const { flash, error } = usePage().props;

    const [postFields, setPostFields] = useState({
        title: "",
        content: "",
    });

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;

        setPostFields((postFieldValues) => ({
            ...postFieldValues,
            [key]: value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        router.post("/posts", postFields);

        setPostFields({
            title: "",
            content: "",
        });
    }

    return (
        <UserLayout>
            <header className="mb-6">
                <h1 className="text-2xl font-bold">Create New Post</h1>
            </header>

            <section className="m-auto w-lg">
                <form onSubmit={handleSubmit} className="grid gap-6">
                    <div className="field">
                        <label htmlFor="" className="font-bold text-gray-600">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={postFields.title}
                            className="input"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="" className="font-bold text-gray-600">
                            Content
                        </label>
                        <textarea
                            id="content"
                            rows="8"
                            value={postFields.content}
                            className="resize-none input"
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="submit">
                        Submit Post
                    </button>
                </form>
            </section>

            {flash.success && <FlashMessage message={flash.success} />}
        </UserLayout>
    );
}

export default Create;
