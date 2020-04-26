import React, { FC } from "react";
import { serialize } from "serialize-javascript";

type ScriptProps = {
    name: string;
    data: any;
};

const WindowStateScript: FC<ScriptProps> = ({ name, data }) => (
    <script dangerouslySetInnerHTML={{
        __html: `windows.${name}=${serialize(data, {
            JSON: true
        })}`
    }}></script>
)

export { WindowStateScript }