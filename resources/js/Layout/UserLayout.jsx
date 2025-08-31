import { Link, usePage, router } from "@inertiajs/react";
import Avatar from "../Components/Avatar";

function UserLayout({ children }) {
    const { auth } = usePage().props;

    return (
        <div className="p-14 font-display">
            <header className="flex justify-between">
                <p className="font-bold">LaReact Postings</p>

                <Avatar />

                {auth.user ? (
                    <Nav />
                ) : (
                    <Link
                        href={route("login.create")}
                        className="bg-blue-400 p-2 px-4 text-white"
                    >
                        Login
                    </Link>
                )}
            </header>

            <main className="mt-8">
                <div className="px-14">{children}</div>
            </main>
        </div>
    );
}

function Nav() {
    const { component } = usePage();

    const navItems = [
        {
            id: 1,
            name: "Index",
            url: route("posts.index"),
            component: "Index",
        },
        {
            id: 2,
            name: "Create",
            url: route("posts.create"),
            component: "Create",
        },
    ];

    function handleLogout(e) {
        e.preventDefault();

        router.post(route("logout"));
    }

    return (
        <nav>
            <ul className="flex gap-5">
                {navItems.map((navItem) => (
                    <li key={navItem.id}>
                        <Link
                            href={navItem.url}
                            className={
                                component.startsWith(navItem.component)
                                    ? "font-bold text-purple-400"
                                    : ""
                            }
                        >
                            {navItem.name}
                        </Link>
                    </li>
                ))}
                <li>
                    <form onSubmit={handleLogout}>
                        <button type="submit">Logout</button>
                    </form>
                </li>
            </ul>
        </nav>
    );
}

export default UserLayout;
