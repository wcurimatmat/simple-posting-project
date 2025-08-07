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
                                    ? "text-purple-400 font-bold"
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
    return (
        <>
            <header className="flex justify-between p-14">
                <p className="font-bold">LaReact Postings</p>

                <Nav />
            </header>

            <main>
                <div className="px-14">{children}</div>
            </main>
        </>
    );
}

export default UserLayout;
