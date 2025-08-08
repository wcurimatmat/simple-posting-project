import { useForm, Link } from "@inertiajs/react";

function Login() {
    const { data, setData, post, processing } = useForm({
        email: "",
        password: "",
    });

    function handleSubmit(e) {
        e.preventDefault();

        post("/login");
    }

    return (
        <>
            <header className="flex justify-between p-14">
                <p className="font-bold">LaReact Postings</p>

                <nav>
                    <Link href={route("register.create")}>Register</Link>
                </nav>
            </header>

            <section className="px-14">
                <header className="mb-6">
                    <h1 className="text-2xl font-bold">Login</h1>
                </header>

                <form
                    onSubmit={handleSubmit}
                    className="m-auto grid w-lg gap-6"
                >
                    <div className="field">
                        <label htmlFor="email" className="font-bold text-gray-600">
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
                        <label htmlFor="password" className="font-bold text-gray-600">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
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
                        Login
                    </button>
                </form>
            </section>
        </>
    );
}

export default Login;
