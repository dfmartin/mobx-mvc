import * as React from "react";

import {observer} from "mobx-react";

export const ObserverField = observer((props: {children: React.ReactNode}) => {
    return (
        <>
            {props.children}
        </>
    );
});
