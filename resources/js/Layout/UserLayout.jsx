import { Link, usePage } from "@inertiajs/react";

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
            </ul>
        </nav>
    );
}

function UserLayout({ children }) {
    const { auth } = usePage().props;

    return (
        <div className="font-display">
            <header className="flex justify-between p-14">
                <p className="font-bold">LaReact Postings</p>

                {auth.user ? (
                    <Nav />
                ) : (
                    <Link href={route("login.index")}>Login</Link>
                )}
            </header>

            <main>
                <div className="px-14">{children}</div>
            </main>
        </div>
    );
}

export default UserLayout;
