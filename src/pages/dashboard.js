// dashboard component
import React from "react";
import { getSession } from "next-auth/react";
import MainNav from "@/components/MainNav";
import { useSession } from "next-auth/react";

export async function getServerSideProps(context) {
    return {
        props: {
            session: await getSession(context),
        },
    };
}