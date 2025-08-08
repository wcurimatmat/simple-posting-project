import { Link, useForm } from "@inertiajs/react";

function Register() {
    const { data, setData, post, processing } = useForm({
        name: "",
        email: "",
        password: "",
    });

    function handleSubmit(e) {
        e.preventDefault();

        post('/register');
    }

    return (
        <>
            <header className="flex justify-between p-14">
                <p className="font-bold">LaReact Postings</p>

                <nav>
                    <Link href={route("login.index")}>Login</Link>
                </nav>
            </header>

            <section className="px-14">
                <header className="mb-6">
                    <h1 className="text-2xl font-bold">Register</h1>
                </header>

                <form
                    onSubmit={handleSubmit}
                    className="m-auto grid w-lg gap-6"
                >
                    <div className="field">
                        <label
                            htmlFor="name"
                            className="font-bold text-gray-600"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={data.name}
                            className="input"
                            onChange={(e) => setData("name", e.target.value)}
                        />
                    </div>
                    <div className="field">
                        <label
                            htmlFor="email"
                            className="font-bold text-gray-600"
                        >
                            Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            value={data.email}
                            className="input"
                            onChange={(e) => setData("email", e.target.value)}
                        />
                    </div>
                    <div className="field">
                        <label
                            htmlFor="email"
                            className="font-bold text-gray-600"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="email"
                            value={data.password}
                            className="input"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />
                    </div>
                    <button
                        type="submit"
                        className="submit"
                        disabled={processing}
                    >
                        Register
                    </button>
                </form>
            </section>
        </>
    );
}

export default Register;
