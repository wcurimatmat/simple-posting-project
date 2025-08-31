import { createAvatar } from "@dicebear/core";
import { adventurerNeutral } from "@dicebear/collection";
import { useMemo } from "react";
import { usePage } from "@inertiajs/react";

function Avatar() {
    const { auth } = usePage().props;

    const avatar = useMemo(() => {
        return createAvatar(adventurerNeutral, {
            seed: auth.user.data.name,
            textColor: ["FFFFFF"],
            size: 40,
            radius: 50,
        }).toDataUri();
    });

    return <>{auth.user && <img src={avatar} alt={auth.user.data.name} />}</>;
}

export default Avatar;
