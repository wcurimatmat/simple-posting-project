import { createAvatar } from "@dicebear/core";
import { initials } from "@dicebear/collection";
import { useMemo } from "react";
import { usePage } from "@inertiajs/react";

function Avatar() {
    const { auth } = usePage().props;

    const avatar = useMemo(() => {
        return createAvatar(initials, {
            seed: auth.user.data.name,
            backgroundColor: ["53BDE9", "FBABD1"],
            textColor: ["FFFFFF"],
            size: 58,
            radius: 8,
        }).toDataUri();
    });

    console.log(avatar);

    return <>{auth.user && <img src={avatar} alt={auth.user.data.name} />}</>;
}

export default Avatar;
