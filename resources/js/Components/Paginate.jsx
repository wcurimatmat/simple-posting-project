import { Link } from "@inertiajs/react";

function Paginate({ meta }) {
    console.log(meta);

    return (
        <section className="mt-10">
            <div className="flex items-center justify-center gap-2">
                {meta.links.map((link) => {
                    return link.url === null ? (
                        <div
                            key={link.label}
                            className="mr-1 mb-1 rounded border px-4 py-3 text-sm leading-4 text-gray-400"
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        ></div>
                    ) : (
                        <Link
                            href={link.url}
                            className={`rounded border border-solid border-gray-300 ${link.active ? "bg-white" : "bg-gray-200"} px-4 py-3 text-sm`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        ></Link>
                    );
                })}
            </div>
        </section>
    );
}

export default Paginate;
